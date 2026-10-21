import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Mantém o foco do teclado dentro de `container` enquanto `active` for verdadeiro,
 * fecha com Esc e devolve o foco ao elemento que abriu o painel.
 */
export function useFocusTrap(
  container: RefObject<HTMLElement | null>,
  active: boolean,
  { onEscape, returnFocus }: { onEscape?: () => void; returnFocus?: RefObject<HTMLElement | null> } = {},
) {
  useEffect(() => {
    if (!active) return;
    const node = container.current;
    if (!node) return;
    const returnTarget = returnFocus?.current ?? (document.activeElement as HTMLElement | null);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onEscape?.();
        return;
      }
      if (event.key !== "Tab") return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null || element === document.activeElement,
      );
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (event.shiftKey && (document.activeElement === first || !node.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last || !node.contains(document.activeElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // Só devolve o foco se ele não foi levado para outro lugar (ex.: link de seção).
      const current = document.activeElement;
      if (!current || current === document.body || node.contains(current)) {
        returnTarget?.focus?.({ preventScroll: true });
      }
    };
  }, [active, container, onEscape, returnFocus]);
}
