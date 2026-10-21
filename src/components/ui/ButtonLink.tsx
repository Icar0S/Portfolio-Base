import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Abre em nova aba (links externos). */
  external?: boolean;
  /** Texto extra só para leitores de tela (ex.: "abre em nova aba"). */
  srHint?: string;
  download?: boolean;
  /** Usa <a> simples mesmo para caminhos internos (âncoras e arquivos). */
  plain?: boolean;
  ariaLabel?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium whitespace-nowrap transition-all duration-300 will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent font-semibold text-background hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-[0_0_36px_-6px_var(--glow)]",
  secondary:
    "glass text-foreground hover:-translate-y-0.5 hover:border-surface-border-strong hover:bg-accent/5",
  ghost: "px-0 text-muted hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external = false,
  srHint,
  download = false,
  plain = false,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], variant !== "ghost" && sizes[size], className);
  const content = (
    <>
      {variant === "primary" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {srHint ? <span className="sr-only"> {srHint}</span> : null}
      </span>
    </>
  );

  const isExternal = external || /^(https?:|mailto:)/.test(href);

  if (isExternal || plain || download) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
