import { timeline, timelineGroups } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import {
  academicActivity,
  artifacts,
  doiUrl,
  publicationGroups,
  publications,
  researchAreas,
} from "@/data/research";
import { skillCategories } from "@/data/skills";
import type { Project } from "@/data/types";
import { ui } from "@/data/ui";
import { routes, t, type Locale } from "./i18n";
import { absoluteUrl } from "./site";

/**
 * Versões em Markdown do portfólio para agentes e LLMs (geradas no build a partir de `src/data`).
 * O GitHub Pages não faz negociação por `Accept: text/markdown`, então cada página tem um
 * `index.md` ao lado, anunciado por <link rel="alternate" type="text/markdown"> e pelo /llms.txt.
 */

/** Caminho do Markdown equivalente a uma rota HTML (ex.: "/en/" → "/en/index.md"). */
export const markdownPath = (htmlPath: string) =>
  `${htmlPath.endsWith("/") ? htmlPath : `${htmlPath}/`}index.md`;

const projectMarkdownUrl = (locale: Locale, slug: string) =>
  absoluteUrl(markdownPath(routes.project(locale, slug)));

const labels = {
  pt: {
    profile: "Perfil",
    roles: "Atuação",
    contact: "Contato",
    location: "Localização",
    languages: "Idiomas",
    highlights: "Números",
    skills: "Habilidades",
    journey: "Trajetória",
    projects: "Projetos",
    research: "Pesquisa",
    publications: "Publicações",
    artifacts: "Artefatos de pesquisa",
    activities: "Atividades acadêmicas",
    areas: "Linhas de pesquisa",
    links: "Links",
    tech: "Tecnologias",
    details: "Detalhes",
    html: "Versão HTML",
    english: "English version",
    otherLang: "en",
    cv: "Currículo (PDF)",
    authors: "Autores",
    status: "Situação",
    project: "Projeto relacionado",
    context: "Contexto",
    credit: "Créditos",
    period: "Período",
    generated: "Gerado automaticamente a partir dos dados do site.",
  },
  en: {
    profile: "Profile",
    roles: "Roles",
    contact: "Contact",
    location: "Location",
    languages: "Languages",
    highlights: "Highlights",
    skills: "Skills",
    journey: "Journey",
    projects: "Projects",
    research: "Research",
    publications: "Publications",
    artifacts: "Research artefacts",
    activities: "Academic activities",
    areas: "Research interests",
    links: "Links",
    tech: "Technologies",
    details: "Details",
    html: "HTML version",
    english: "Versão em português",
    otherLang: "pt",
    cv: "CV (PDF)",
    authors: "Authors",
    status: "Status",
    project: "Related project",
    context: "Context",
    credit: "Credits",
    period: "Period",
    generated: "Generated automatically from the site's data.",
  },
} as const;

const linkLabel = (locale: Locale, kind: Project["links"][number]["kind"]) => ui[locale].projects.links[kind];

function contactLines(locale: Locale) {
  const l = labels[locale];
  return [
    `- ${ui[locale].contact.email}: ${profile.email}`,
    `- ${ui[locale].contact.academicEmail}: ${profile.academicEmail}`,
    `- LinkedIn: ${profile.social.linkedin.href}`,
    `- GitHub: ${profile.social.github.href}`,
    `- Lattes: ${profile.social.lattes.href}`,
    `- ${l.cv}: ${absoluteUrl(profile.cv[locale])}`,
  ];
}

function projectSummary(project: Project, locale: Locale) {
  const l = labels[locale];
  const links = project.links.map((link) => `[${linkLabel(locale, link.kind)}](${link.href})`);
  return [
    `### ${t(project.title, locale)}`,
    "",
    `${project.badge[locale]} · ${project.year} · ${project.context[locale]}`,
    "",
    project.summary[locale],
    "",
    `- ${l.tech}: ${project.tech.join(", ")}`,
    `- ${l.details}: ${projectMarkdownUrl(locale, project.slug)}`,
    ...(links.length ? [`- ${l.links}: ${links.join(" · ")}`] : []),
  ].join("\n");
}

/** Página inicial completa em Markdown. */
export function homeMarkdown(locale: Locale) {
  const l = labels[locale];
  const copy = ui[locale];
  const other: Locale = locale === "pt" ? "en" : "pt";
  const lines: string[] = [];

  lines.push(`# ${profile.name}`, "");
  lines.push(`> ${profile.headline[locale]}. ${profile.intro[locale].replace(/\*\*/g, "")}`, "");
  lines.push(
    `- ${l.location}: ${profile.location[locale]}`,
    `- ${l.html}: ${absoluteUrl(routes.home(locale))}`,
    `- ${l.english}: ${absoluteUrl(markdownPath(routes.home(other)))}`,
    "",
  );

  lines.push(`## ${l.profile}`, "");
  for (const paragraph of profile.about.paragraphs) lines.push(paragraph[locale], "");
  lines.push(`**${l.roles}:** ${profile.roles.map((role) => role[locale]).join(" · ")}`, "");
  lines.push(
    `**${l.languages}:** ${profile.languages.map((language) => `${language.name[locale]} (${language.level[locale]})`).join(", ")}`,
    "",
  );
  lines.push(`### ${l.highlights}`, "");
  for (const stat of profile.stats) lines.push(`- ${stat.value}${stat.suffix ?? ""} — ${stat.label[locale]}`);
  lines.push("");

  lines.push(`## ${l.skills}`, "");
  for (const category of skillCategories) {
    lines.push(`- **${category.name[locale]}:** ${category.items.map((item) => t(item, locale)).join(", ")}`);
  }
  lines.push("");

  lines.push(`## ${l.journey}`, "");
  for (const group of timelineGroups) {
    lines.push(`### ${group.label[locale]}`, "");
    for (const item of timeline.filter((entry) => entry.group === group.id)) {
      const where = item.location ? ` · ${item.location[locale]}` : "";
      lines.push(
        `#### ${item.title[locale]} — ${item.org[locale]}`,
        "",
        `*${item.period[locale]}${where}*`,
        "",
      );
      for (const highlight of item.highlights) lines.push(`- ${highlight[locale]}`);
      if (item.tags?.length) lines.push(`- ${l.tech}: ${item.tags.join(", ")}`);
      if (item.highlights.length || item.tags?.length) lines.push("");
    }
  }

  lines.push(`## ${l.projects}`, "");
  for (const project of projects) lines.push(projectSummary(project, locale), "");

  lines.push(`## ${l.research}`, "");
  lines.push(`**${l.areas}:** ${researchAreas.map((area) => area[locale]).join(", ")}`, "");
  lines.push(`### ${l.publications}`, "");
  for (const group of publicationGroups) {
    const items = publications.filter((publication) => publication.type === group.id);
    if (!items.length) continue;
    lines.push(`#### ${group.label[locale]}`, "");
    for (const publication of items) {
      const doi = publication.doi ? ` DOI: [${publication.doi}](${doiUrl(publication.doi)}).` : "";
      const note = publication.note?.[locale] ? ` ${publication.note[locale]}` : "";
      lines.push(
        `- **${publication.title[locale]}** — ${publication.authors}. *${publication.venue[locale]}*, ${publication.year}. ${l.status}: ${publication.status[locale]}.${note}${doi}`,
      );
    }
    lines.push("");
  }
  lines.push(`### ${l.artifacts}`, "");
  for (const artifact of artifacts) {
    const repo = artifact.repo ? ` · [GitHub](${artifact.repo})` : "";
    lines.push(
      `- **${artifact.title[locale]}** — ${artifact.description[locale]} [DOI ${artifact.doi}](${doiUrl(artifact.doi)})${repo}`,
    );
  }
  lines.push("");
  lines.push(`### ${l.activities}`, "");
  lines.push(
    `- **${academicActivity.title[locale]}** — ${academicActivity.org}, ${academicActivity.period[locale]}. ${academicActivity.description[locale]}`,
    "",
  );

  lines.push(`## ${l.contact}`, "", copy.contact.text, "", ...contactLines(locale), "");
  lines.push("---", "", `*${l.generated}*`, "");
  return lines.join("\n");
}

/** Página de projeto em Markdown. */
export function projectMarkdown(project: Project, locale: Locale) {
  const l = labels[locale];
  const copy = ui[locale];
  const lines: string[] = [];

  lines.push(`# ${t(project.title, locale)}`, "");
  lines.push(`> ${project.summary[locale]}`, "");
  lines.push(
    `- ${project.badge[locale]} · ${project.year}`,
    `- ${l.context}: ${project.context[locale]}`,
    `- ${l.tech}: ${project.tech.join(", ")}`,
    `- ${project.chips.map((chip) => chip[locale]).join(" · ")}`,
    ...project.links.map((link) => `- ${linkLabel(locale, link.kind)}: ${link.href}`),
    `- ${l.html}: ${absoluteUrl(routes.project(locale, project.slug))}`,
    `- ${profile.name}: ${absoluteUrl(markdownPath(routes.home(locale)))}`,
    "",
  );

  project.sections.forEach((section, index) => {
    lines.push(
      `## ${String(index + 1).padStart(2, "0")} — ${copy.project.sections[section.key]}: ${section.title[locale]}`,
      "",
    );
    lines.push(section.body[locale], "");
    for (const bullet of section.bullets) lines.push(`- ${bullet[locale]}`);
    if (section.bullets.length) lines.push("");
    const figure = section.figure;
    if (figure?.kind === "flow") lines.push(figure.steps.map((step) => t(step, locale)).join(" → "), "");
    if (figure?.kind === "metrics") {
      lines.push(figure.items.map((item) => `**${item.value}** ${item.label[locale]}`).join(" · "), "");
    }
    if (figure?.kind === "checks") for (const item of figure.items) lines.push(`- [x] ${t(item, locale)}`);
    if (figure?.kind === "checks") lines.push("");
  });

  if (project.credit) lines.push(`## ${l.credit}`, "", project.credit[locale], "");
  lines.push(`## ${l.contact}`, "", ...contactLines(locale), "");
  return lines.join("\n");
}

/** Índice no formato llms.txt (https://llmstxt.org). */
export function llmsTxt() {
  const pt = labels.pt;
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.headline.pt}. ${profile.headline.en}. ${profile.intro.en.replace(/\*\*/g, "")}`,
    "",
    "Portfólio estático (GitHub Pages). Cada página tem uma versão em Markdown (`index.md`) gerada a partir dos mesmos dados do site. / Static portfolio: every page has a Markdown version generated from the site's data.",
    "",
    "## Portfólio / Portfolio",
    "",
    `- [Perfil completo (PT)](${absoluteUrl(markdownPath(routes.home("pt")))}): ${pt.profile}, ${pt.skills.toLowerCase()}, ${pt.journey.toLowerCase()}, ${pt.projects.toLowerCase()}, ${pt.research.toLowerCase()} e ${pt.contact.toLowerCase()}`,
    `- [Full profile (EN)](${absoluteUrl(markdownPath(routes.home("en")))}): profile, skills, journey, projects, research and contact`,
    `- [Tudo em um arquivo / Everything in one file](${absoluteUrl("/llms-full.txt")})`,
    "",
    "## Projetos / Projects",
    "",
    ...projects.map(
      (project) =>
        `- [${t(project.title, "pt")}](${projectMarkdownUrl("pt", project.slug)}): ${project.summary.pt} ([EN](${projectMarkdownUrl("en", project.slug)}))`,
    ),
    "",
    "## Contato / Contact",
    "",
    ...contactLines("pt"),
    "",
    "## Optional",
    "",
    `- [Currículo em PDF (PT)](${absoluteUrl(profile.cv.pt)})`,
    `- [CV in PDF (EN)](${absoluteUrl(profile.cv.en)})`,
    `- [Sitemap](${absoluteUrl("/sitemap.xml")})`,
    "",
  ];
  return lines.join("\n");
}

/** Conteúdo completo (home + todos os projetos) em um único arquivo, em português. */
export function llmsFullTxt() {
  return [homeMarkdown("pt"), ...projects.map((project) => projectMarkdown(project, "pt"))].join(
    "\n\n---\n\n",
  );
}

export const markdownHeaders = { "Content-Type": "text/markdown; charset=utf-8" };
