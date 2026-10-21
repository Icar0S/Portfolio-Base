"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { easeOut } from "@/components/motion/easing";
import { cn } from "@/lib/cn";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useSmoothScroll } from "./SmoothScroll";

export type NavItem = { id: string; label: string; href: string };

export type NavbarProps = {
  variant: "home" | "page";
  items: NavItem[];
  homeHref: string;
  ctaHref: string;
  alternateHref: string;
  alternateLang: string;
  labels: {
    navLabel: string;
    home: string;
    cta: string;
    openMenu: string;
    closeMenu: string;
    menuTitle: string;
    switchLanguage: string;
    languageShort: string;
  };
};

/** Link interno: <a> simples na home (âncoras tratadas pelo SmoothScroll) e next/link nas demais páginas. */
function NavAnchor({
  variant,
  href,
  className,
  children,
  onClick,
  ariaCurrent,
  ariaLabel,
}: {
  variant: NavbarProps["variant"];
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  ariaCurrent?: "location";
  ariaLabel?: string;
}) {
  if (variant === "home") {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        aria-current={ariaCurrent}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={className}
      onClick={onClick}
      aria-current={ariaCurrent}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}

export function Navbar({
  variant,
  items,
  homeHref,
  ctaHref,
  alternateHref,
  alternateLang,
  labels,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { lock } = useSmoothScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Destaca a seção visível no meio da tela.
  useEffect(() => {
    if (variant !== "home") return;
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    const hero = document.getElementById("inicio");
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setActive(null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    if (hero) heroObserver.observe(hero);
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, [items, variant]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    lock(open);
    return () => lock(false);
  }, [open, lock]);

  useFocusTrap(menuRef, open, { onEscape: close, returnFocus: toggleRef });

  useEffect(() => {
    if (open) menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
        <nav
          aria-label={labels.navLabel}
          className={cn(
            "flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border px-3 py-2 pl-5 transition-all duration-500",
            scrolled
              ? "border-surface-border shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] glass-strong"
              : "border-transparent bg-transparent",
          )}
        >
          <NavAnchor
            variant={variant}
            href={homeHref}
            className="font-display text-lg font-bold tracking-tight text-foreground transition-colors hover:text-accent"
          >
            IS<span className="text-accent">.</span>
            <span className="sr-only"> {labels.home}</span>
          </NavAnchor>

          <ul className="hidden items-center gap-1 lg:flex">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <NavAnchor
                    variant={variant}
                    href={item.href}
                    ariaCurrent={isActive ? "location" : undefined}
                    className={cn(
                      "relative isolate rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                      isActive ? "text-accent-strong" : "text-muted hover:text-foreground",
                    )}
                  >
                    {isActive ? (
                      <m.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-accent/10 ring-1 ring-accent/25 ring-inset"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {item.label}
                  </NavAnchor>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href={alternateHref}
              hrefLang={alternateLang}
              lang={alternateLang}
              className="rounded-full px-3 py-2 font-mono text-xs font-medium tracking-wider text-muted-strong transition-colors hover:text-accent"
            >
              {labels.languageShort}
              <span className="sr-only"> — {labels.switchLanguage}</span>
            </Link>
            <NavAnchor
              variant={variant}
              href={ctaHref}
              className="group relative hidden items-center overflow-hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-shadow hover:shadow-[0_0_30px_-4px_var(--glow)] sm:inline-flex"
            >
              <span className="relative z-10">{labels.cta}</span>
              <span
                aria-hidden="true"
                className="absolute inset-0 z-0 translate-y-full bg-accent-strong transition-transform duration-300 group-hover:translate-y-0"
              />
            </NavAnchor>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls={open ? "mobile-menu" : undefined}
              aria-label={labels.openMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:text-accent lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <m.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={labels.menuTitle}
            className="fixed inset-0 z-80 flex flex-col bg-background/95 px-5 pt-4 pb-10 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-grid mask-fade-y opacity-40"
              aria-hidden="true"
            />
            <div className="relative flex items-center justify-between pl-2">
              <span className="font-display text-lg font-bold tracking-tight" aria-hidden="true">
                IS<span className="text-accent">.</span>
              </span>
              <button
                type="button"
                onClick={close}
                aria-label={labels.closeMenu}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground glass transition-colors hover:text-accent"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <ul className="relative mt-12 flex flex-col gap-2">
              {items.map((item, index) => (
                <m.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 + index * 0.05, ease: easeOut }}
                >
                  <NavAnchor
                    variant={variant}
                    href={item.href}
                    onClick={close}
                    className="group flex items-baseline gap-4 py-2 font-display text-4xl font-bold tracking-tight text-foreground transition-colors hover:text-accent"
                  >
                    <span className="font-mono text-xs font-medium text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </NavAnchor>
                </m.li>
              ))}
            </ul>

            <m.div
              className="relative mt-auto flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
            >
              <NavAnchor
                variant={variant}
                href={ctaHref}
                onClick={close}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background"
              >
                {labels.cta}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </NavAnchor>
              <Link
                href={alternateHref}
                hrefLang={alternateLang}
                lang={alternateLang}
                className="inline-flex items-center rounded-full px-5 py-3 text-sm text-foreground glass"
              >
                {labels.switchLanguage}
              </Link>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
