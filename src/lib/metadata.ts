import type { Metadata, Viewport } from "next";
import { profile } from "@/data/profile";
import type { Project } from "@/data/types";
import { ui } from "@/data/ui";
import { ogLocale, otherLocale, routes, t, type Locale } from "./i18n";
import { markdownPath } from "./markdown";
import { absoluteUrl, siteUrl } from "./site";

const ogImage = (alt: string) => ({ url: absoluteUrl("/og-image.png"), width: 1200, height: 630, alt });

export const viewport: Viewport = {
  themeColor: "#08070a",
  colorScheme: "dark",
};

function base(locale: Locale, path: string, alternates: Record<Locale, string>): Metadata {
  const copy = ui[locale];
  return {
    metadataBase: new URL(`${siteUrl}/`),
    applicationName: profile.displayName,
    authors: [{ name: profile.name, url: siteUrl }],
    creator: profile.name,
    keywords: [
      "Ícaro Santos",
      "QA Engineer",
      locale === "pt" ? "Desenvolvedor Fullstack" : "Full Stack Developer",
      "UI/UX",
      "Playwright",
      "LLM",
      "RAG",
      "Big Data",
      locale === "pt" ? "Teste de software" : "Software testing",
      "UECE",
    ],
    robots: { index: true, follow: true },
    alternates: {
      canonical: absoluteUrl(path),
      // Versão em Markdown para agentes e LLMs (o GitHub Pages não negocia por `Accept`).
      types: { "text/markdown": absoluteUrl(markdownPath(path)) },
      languages: {
        "pt-BR": absoluteUrl(alternates.pt),
        en: absoluteUrl(alternates.en),
        "x-default": absoluteUrl(alternates.pt),
      },
    },
    openGraph: {
      type: "website",
      siteName: profile.displayName,
      locale: ogLocale[locale],
      alternateLocale: ogLocale[otherLocale(locale)],
      url: absoluteUrl(path),
      images: [ogImage(copy.meta.ogAlt)],
    },
    twitter: {
      card: "summary_large_image",
      images: [absoluteUrl("/og-image.png")],
    },
  };
}

export function homeMetadata(locale: Locale): Metadata {
  const copy = ui[locale];
  const metadata = base(locale, routes.home(locale), { pt: routes.home("pt"), en: routes.home("en") });
  return {
    ...metadata,
    title: copy.meta.title,
    description: copy.meta.description,
    openGraph: { ...metadata.openGraph, title: copy.meta.title, description: copy.meta.description },
    twitter: { ...metadata.twitter, title: copy.meta.title, description: copy.meta.description },
  };
}

export function projectMetadata(project: Project, locale: Locale): Metadata {
  const title = `${t(project.title, locale)} — ${profile.displayName}`;
  const description = project.summary[locale];
  const metadata = base(locale, routes.project(locale, project.slug), {
    pt: routes.project("pt", project.slug),
    en: routes.project("en", project.slug),
  });
  return {
    ...metadata,
    title,
    description,
    openGraph: { ...metadata.openGraph, type: "article", title, description },
    twitter: { ...metadata.twitter, title, description },
  };
}
