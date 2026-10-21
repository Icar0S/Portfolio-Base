"use client";

import { m, useScroll, useSpring } from "framer-motion";

/** Linha dourada de 2px no topo, proporcional à rolagem da página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-60 h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
