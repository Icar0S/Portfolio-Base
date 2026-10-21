"use client";

import { useEffect, useRef } from "react";

/** Partículas douradas: posição (%), duração e atraso da flutuação. */
const particles = [
  [12, 22, 5, 0],
  [28, 68, 6.4, 0.4],
  [44, 14, 5.6, 0.8],
  [61, 74, 7, 1.2],
  [76, 30, 6, 1.6],
  [88, 60, 5.2, 2],
  [20, 88, 6.8, 2.4],
  [68, 46, 5.9, 2.8],
  [8, 52, 7.4, 3.2],
  [52, 38, 6.2, 3.6],
  [92, 12, 5.4, 4],
  [36, 52, 7.2, 4.4],
] as const;

/**
 * Camadas fixas atrás do conteúdo: grade com máscara, "auroras" desfocadas,
 * partículas e um holofote que acompanha o mouse.
 */
export function Background() {
  const spotlight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = spotlight.current;
    if (!node || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.setProperty("--x", `${event.clientX}px`);
        node.style.setProperty("--y", `${event.clientY}px`);
        node.style.opacity = "1";
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-1 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-grid mask-fade-y opacity-[0.55]" />
      <div className="absolute -top-40 left-[8%] h-[42rem] w-[42rem] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(224,169,94,0.16),transparent_65%)] blur-2xl will-change-transform" />
      <div
        className="absolute top-1/3 right-[-10%] h-[38rem] w-[38rem] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(127,199,196,0.10),transparent_65%)] blur-2xl will-change-transform"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-[-15%] left-1/3 h-[34rem] w-[34rem] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(224,169,94,0.10),transparent_65%)] blur-2xl will-change-transform"
        style={{ animationDelay: "-11s" }}
      />
      <div
        ref={spotlight}
        className="absolute inset-0 opacity-0 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(224,169,94,0.07), transparent 55%)",
        }}
      />
      {particles.map(([left, top, duration, delay]) => (
        <span
          key={`${left}-${top}`}
          className="absolute h-1 w-1 animate-float rounded-full bg-accent/40"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  );
}
