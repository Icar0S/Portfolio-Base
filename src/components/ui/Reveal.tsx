"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { easeOut } from "@/components/motion/easing";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Deslocamento vertical inicial em px. */
  y?: number;
  /** Deslocamento horizontal inicial em px (entradas laterais). */
  x?: number;
  blur?: boolean;
  as?: "div" | "li" | "article" | "section";
  role?: "presentation";
};

/** Fade + deslocamento (+ desfoque opcional) ao entrar na viewport, uma única vez. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 34,
  x = 0,
  blur = false,
  as = "div",
  role,
}: RevealProps) {
  const Component = m[as];
  return (
    <Component
      data-reveal=""
      role={role}
      className={className}
      initial={{ opacity: 0, y, x, ...(blur ? { filter: "blur(10px)" } : {}) }}
      whileInView={{ opacity: 1, y: 0, x: 0, ...(blur ? { filter: "blur(0px)" } : {}) }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.8, delay, ease: easeOut }}
    >
      {children}
    </Component>
  );
}
