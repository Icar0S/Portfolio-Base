"use client";

import { useEffect, useRef } from "react";
import { markPreloaderDone } from "@/lib/preloader";

const DURATION = 800;

/**
 * Tela de carregamento da primeira visita da sessão: monograma, subtítulo e contador.
 * O HTML vem renderizado do servidor; o script do <head> esconde tudo quando não deve aparecer.
 */
export function Preloader({ loading, subtitle }: { loading: string; subtitle: string }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("no-preloader")) {
      markPreloaderDone();
      return;
    }

    let frame = 0;
    let hideTimer = 0;
    const start = performance.now();

    const finish = () => {
      root.current?.classList.add("preloader-exit");
      html.classList.remove("is-loading");
      markPreloaderDone();
      hideTimer = window.setTimeout(() => {
        if (root.current) root.current.style.display = "none";
      }, 700);
    };

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (counter.current) counter.current.textContent = `${Math.round(eased * 100)}%`;
      if (bar.current) bar.current.style.transform = `scaleX(${eased})`;
      if (progress < 1) frame = requestAnimationFrame(tick);
      else finish();
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      id="preloader"
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-10000 flex flex-col items-center justify-center bg-background"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="relative flex flex-col items-center">
        <div className="overflow-hidden pb-2">
          <div className="animate-[preloader-rise_0.9s_cubic-bezier(0.22,1,0.36,1)_both] font-display text-6xl font-bold tracking-tight md:text-8xl">
            <span className="gradient-text">IS</span>
            <span className="text-accent">.</span>
          </div>
        </div>
        <p className="mt-4 animate-[preloader-fade_0.8s_0.3s_ease-out_both] font-mono text-[11px] tracking-[0.35em] text-muted uppercase">
          {subtitle}
        </p>
      </div>
      <div className="absolute bottom-16 left-1/2 w-64 -translate-x-1/2">
        <div className="mb-3 flex items-end justify-between font-mono text-xs text-muted">
          <span>{loading}</span>
          <span ref={counter} className="text-accent-strong tabular-nums">
            0%
          </span>
        </div>
        <div className="h-px w-full overflow-hidden bg-surface-border">
          <div
            ref={bar}
            className="h-full origin-left bg-linear-to-r from-accent-deep via-accent to-accent-strong"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
