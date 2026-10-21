"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Inclinação 3D leve seguindo o ponteiro. */
  tilt?: boolean;
  size?: number;
  alpha?: number;
};

/**
 * Card com brilho radial dourado que acompanha o ponteiro.
 * Atualiza apenas variáveis CSS (sem re-render do React).
 */
export function SpotlightCard({
  children,
  className,
  tilt = false,
  size = 600,
  alpha = 0.07,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;
    const { clientX, clientY } = event;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      node.style.setProperty("--x", `${x}px`);
      node.style.setProperty("--y", `${y}px`);
      if (tilt) {
        const rx = (y / rect.height - 0.5) * -4;
        const ry = (x / rect.width - 0.5) * 4;
        node.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
        node.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      }
    });
  };

  const onPointerLeave = () => {
    const node = ref.current;
    if (!node || !tilt) return;
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "spotlight relative",
        tilt &&
          "[transform:perspective(1000px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] transition-transform duration-300 ease-out motion-reduce:[transform:none]",
        className,
      )}
      style={{ ["--spotlight-size" as string]: `${size}px`, ["--spotlight-alpha" as string]: alpha }}
    >
      <div className="spotlight-layer" aria-hidden="true" />
      {children}
    </div>
  );
}
