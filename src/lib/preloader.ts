import { useSyncExternalStore } from "react";
import { PRELOADER_STORAGE_KEY as STORAGE_KEY } from "./preloader-script";

/**
 * Estado do pré-carregamento compartilhado entre o Preloader e as animações do hero.
 * O script inline no <head> adiciona `no-preloader` ao <html> quando ele não deve aparecer
 * (visita repetida na sessão ou movimento reduzido).
 */
const EVENT = "preloader:done";

declare global {
  interface Window {
    __preloaderDone?: boolean;
  }
}

function isDone() {
  return window.__preloaderDone === true || document.documentElement.classList.contains("no-preloader");
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  return () => window.removeEventListener(EVENT, callback);
}

export function markPreloaderDone() {
  window.__preloaderDone = true;
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Sem sessionStorage o preloader apenas volta a aparecer na próxima visita.
  }
  window.dispatchEvent(new Event(EVENT));
}

/** `true` quando o preloader terminou (ou não vai aparecer). */
export function usePreloaderDone() {
  return useSyncExternalStore(subscribe, isDone, () => false);
}
