export type Locale = "pt" | "en";

export const locales: readonly Locale[] = ["pt", "en"];

/** Texto com versão em português e inglês. */
export type Localized<T = string> = { pt: T; en: T };

/** Campo que pode ser igual nos dois idiomas (ex.: nomes de tecnologias). */
export type MaybeLocalized = string | Localized;

export function t<T>(value: Localized<T>, locale: Locale): T;
export function t(value: MaybeLocalized, locale: Locale): string;
export function t<T>(value: Localized<T> | string, locale: Locale): T | string {
  return typeof value === "string" ? value : value[locale];
}

export const htmlLang: Record<Locale, string> = { pt: "pt-BR", en: "en" };
export const ogLocale: Record<Locale, string> = { pt: "pt_BR", en: "en_US" };

/** Caminhos internos (sem basePath; o next/link adiciona o prefixo). */
export const routes = {
  home: (locale: Locale) => (locale === "pt" ? "/" : "/en/"),
  section: (locale: Locale, id: string) => `${locale === "pt" ? "/" : "/en/"}#${id}`,
  project: (locale: Locale, slug: string) =>
    locale === "pt" ? `/projetos/${slug}/` : `/en/projects/${slug}/`,
};

export const otherLocale = (locale: Locale): Locale => (locale === "pt" ? "en" : "pt");
