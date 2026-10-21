import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Rótulo de seção: linha dourada fina + texto mono em maiúsculas. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-accent uppercase",
        className,
      )}
    >
      <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
      {children}
    </span>
  );
}
