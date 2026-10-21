import Link from "next/link";
import type { ReactNode } from "react";
import { GithubIcon, LattesIcon, LinkedinIcon } from "@/components/ui/icons";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import type { Locale } from "@/lib/i18n";
import type { NavItem } from "./Navbar";

type FooterProps = {
  locale: Locale;
  variant: "home" | "page";
  items: NavItem[];
  topHref: string;
};

function FooterLink({
  variant,
  href,
  children,
}: {
  variant: FooterProps["variant"];
  href: string;
  children: ReactNode;
}) {
  const className = "text-sm text-muted transition-colors hover:text-accent";
  return variant === "home" ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Footer({ locale, variant, items, topHref }: FooterProps) {
  const copy = ui[locale];
  const year = new Date().getFullYear();
  const social = [
    { label: "LinkedIn", href: profile.social.linkedin.href, icon: <LinkedinIcon className="h-4.5 w-4.5" /> },
    { label: "GitHub", href: profile.social.github.href, icon: <GithubIcon className="h-4.5 w-4.5" /> },
    { label: "Lattes", href: profile.social.lattes.href, icon: <LattesIcon className="h-4.5 w-4.5" /> },
  ];

  return (
    <footer className="relative border-t border-surface-border py-14">
      <div className="section-container">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            {/* Âncora da própria página: o SmoothScroll cuida da rolagem. */}
            <a href={topHref} className="transition-colors hover:text-accent">
              <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                IS<span className="text-accent">.</span>
              </span>
              <span className="sr-only"> — {copy.footer.backToTop}</span>
            </a>
            <p className="mt-2 max-w-xs text-sm text-muted">{copy.footer.tagline}</p>
          </div>

          <nav aria-label={copy.footer.navLabel}>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {items.map((item) => (
                <li key={item.id}>
                  <FooterLink variant={variant} href={item.href}>
                    {item.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-3" aria-label={copy.footer.social}>
            {social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-muted-strong glass transition-colors hover:text-accent"
                >
                  {item.icon}
                  <span className="sr-only">
                    {item.label} {copy.a11y.newTab}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-surface-border pt-8 text-center md:flex-row md:text-left">
          <p className="text-sm text-muted">
            © {year} {profile.displayName}. {copy.footer.rights}
          </p>
          <p className="font-mono text-xs text-muted">{copy.footer.made}</p>
        </div>
      </div>
    </footer>
  );
}
