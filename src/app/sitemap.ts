import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { routes } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = [
    { pt: routes.home("pt"), en: routes.home("en"), priority: 1 },
    ...projects.map((project) => ({
      pt: routes.project("pt", project.slug),
      en: routes.project("en", project.slug),
      priority: 0.7,
    })),
  ];

  return pages.flatMap(({ pt, en, priority }) =>
    [pt, en].map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === en ? Math.max(0.5, priority - 0.1) : priority,
      alternates: { languages: { "pt-BR": absoluteUrl(pt), en: absoluteUrl(en) } },
    })),
  );
}
