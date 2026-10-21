"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";

type ScrollApi = {
  /** Rola até o elemento com o id informado e move o foco para ele. */
  scrollToId: (id: string, options?: { updateHash?: boolean }) => void;
  /** Pausa/retoma a rolagem (menus e diálogos abertos). */
  lock: (locked: boolean) => void;
};

const ScrollContext = createContext<ScrollApi>({
  scrollToId: () => undefined,
  lock: () => undefined,
});

export const useSmoothScroll = () => useContext(ScrollContext);

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Smooth scroll com Lenis (desativado com movimento reduzido) e tratamento global de
 * links âncora da mesma página: rolagem suave, atualização da URL e foco acessível.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToId = useCallback((id: string, { updateHash = true } = {}) => {
    const target = document.getElementById(id);
    if (!target) return;
    const lenis = lenisRef.current;
    // Um link clicado dentro de um menu/diálogo fecha o painel: libera a rolagem antes.
    document.documentElement.style.overflow = "";
    if (lenis) {
      lenis.start();
      lenis.scrollTo(target, { duration: 1.2, force: true });
    } else {
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    }
    if (updateHash && window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`);
    }
    // Leva o foco junto (navegação por teclado e leitores de tela).
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }, []);

  const lock = useCallback((locked: boolean) => {
    const lenis = lenisRef.current;
    if (locked) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash)
        return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!document.getElementById(id)) return;
      event.preventDefault();
      scrollToId(id);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollToId]);

  const api = useMemo(() => ({ scrollToId, lock }), [scrollToId, lock]);

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
}
