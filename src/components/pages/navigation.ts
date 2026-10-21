import type { NavbarProps, NavItem } from "@/components/layout/Navbar";
import { navOrder, sectionIds, ui } from "@/data/ui";
import { otherLocale, routes, htmlLang, type Locale } from "@/lib/i18n";

/** Links da navegação: âncoras na home, rotas com âncora nas demais páginas. */
export function navItems(locale: Locale, variant: "home" | "page"): NavItem[] {
  const copy = ui[locale];
  return navOrder.map((key) => ({
    id: sectionIds[key],
    label: copy.nav[key],
    href: variant === "home" ? `#${sectionIds[key]}` : routes.section(locale, sectionIds[key]),
  }));
}

export function navbarProps(locale: Locale, variant: "home" | "page", alternateHref: string): NavbarProps {
  const copy = ui[locale];
  return {
    variant,
    items: navItems(locale, variant),
    homeHref: variant === "home" ? "#inicio" : routes.home(locale),
    ctaHref: variant === "home" ? `#${sectionIds.contact}` : routes.section(locale, sectionIds.contact),
    alternateHref,
    alternateLang: htmlLang[otherLocale(locale)],
    labels: {
      navLabel: copy.nav.label,
      home: copy.nav.home,
      cta: copy.nav.cta,
      openMenu: copy.nav.openMenu,
      closeMenu: copy.nav.closeMenu,
      menuTitle: copy.nav.menuTitle,
      switchLanguage: copy.nav.switchLanguage,
      languageShort: copy.nav.languageShort,
    },
  };
}
