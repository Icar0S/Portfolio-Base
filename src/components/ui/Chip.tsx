import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Pílula dourada translúcida para funcionalidades e destaques. */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-accent/20 bg-accent/7 px-3 py-1 text-[11px] font-medium text-accent-strong",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Lista de tecnologias em fonte mono, separadas por espaço. */
export function TechList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-3 gap-y-1.5", className)}>
      {items.map((item) => (
        <li key={item} className="font-mono text-[11px] text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}
