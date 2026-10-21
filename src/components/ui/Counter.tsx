"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

type CounterProps = {
  value: number;
  locale: string;
  duration?: number;
};

/** Número que conta de 0 até o valor quando entra na tela. */
export function Counter({ value, locale, duration = 1.8 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduceMotion = useReducedMotion();
  const format = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduceMotion) {
      node.textContent = format.format(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format.format(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, reduceMotion, format]);

  // O valor final já vai no HTML (SEO e sem JS); a animação recomeça do zero ao entrar na tela.
  return (
    <span ref={ref} className="tabular-nums">
      {format.format(value)}
    </span>
  );
}
