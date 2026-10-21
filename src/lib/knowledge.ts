import { plainText } from "@/components/ui/RichText";
import { timeline, timelineGroups } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { academicActivity, artifacts, publications, researchAreas } from "@/data/research";
import { skillCategories } from "@/data/skills";
import { sectionIds, ui } from "@/data/ui";
import { routes, t, type Locale } from "./i18n";

/** Trecho da base de conhecimento do assistente (gerada no build a partir de `src/data`). */
export type KnowledgeChunk = {
  id: string;
  title: string;
  text: string;
  /** Rótulo da origem exibido na citação (ex.: "Projetos › SmartDataTest"). */
  source: string;
  /** Caminho interno (sem basePath) com âncora. */
  href: string;
  /** Palavras-chave extras para a busca (não exibidas). */
  keywords?: string;
  /** Multiplicador de relevância (visões gerais valem mais que detalhes). */
  weight?: number;
};

export function buildKnowledge(locale: Locale): KnowledgeChunk[] {
  const copy = ui[locale];
  const section = (key: keyof typeof sectionIds) => routes.section(locale, sectionIds[key]);
  const chunks: KnowledgeChunk[] = [];
  const isPt = locale === "pt";

  chunks.push({
    id: "profile",
    title: profile.name,
    text: `${plainText(profile.intro[locale])} ${profile.about.paragraphs.map((p) => plainText(p[locale])).join(" ")}`,
    source: copy.about.eyebrow,
    href: section("about"),
    keywords: `${profile.roles.map((role) => role[locale]).join(" ")} ${profile.headline[locale]} quem who sobre about icaro perfil profile`,
  });

  chunks.push({
    id: "stats",
    title: isPt ? "Números da carreira" : "Career in numbers",
    text: profile.stats
      .map((stat) => `${stat.value}${stat.suffix ?? ""} ${stat.label[locale].toLowerCase()}`)
      .join(" · "),
    source: copy.about.eyebrow,
    href: section("about"),
    keywords: "anos experiencia years quantos how many numeros numbers",
  });

  chunks.push({
    id: "languages",
    title: isPt ? "Idiomas e certificação" : "Languages and certification",
    text: `${profile.languages.map((language) => `${language.name[locale]} (${language.level[locale]})`).join(", ")}. ${
      isPt ? "Certificado ISTQB® CTFL (BSTQB, mar. 2025)." : "ISTQB® CTFL certified (BSTQB, Mar. 2025)."
    } ${profile.location[locale]}.`,
    source: copy.about.eyebrow,
    href: section("about"),
    keywords:
      "idiomas languages ingles english espanhol spanish istqb certificacao certification fortaleza onde where mora",
  });

  for (const category of skillCategories) {
    const items = category.items.map((item) => t(item, locale));
    chunks.push({
      id: `skills-${category.id}`,
      title: category.name[locale],
      text: isPt
        ? `Ferramentas e tecnologias de ${category.name[locale]} que o Ícaro usa: ${items.join(", ")}.`
        : `${category.name[locale]} tools and technologies Ícaro uses: ${items.join(", ")}.`,
      source: `${copy.nav.skills} › ${category.name[locale]}`,
      href: section("skills"),
      keywords: "ferramentas tools stack tecnologias technologies habilidades skills usa uses",
    });
  }

  for (const item of timeline) {
    const group = timelineGroups.find((entry) => entry.id === item.group);
    const details = item.highlights.map((highlight) => plainText(highlight[locale])).join(" ");
    chunks.push({
      id: `timeline-${item.id}`,
      title: `${item.title[locale]} — ${item.org[locale]}`,
      text: `${item.period[locale]}${item.location ? ` · ${item.location[locale]}` : ""}. ${details}`.trim(),
      source: `${copy.nav.journey} › ${group?.label[locale] ?? ""}`,
      href: section("journey"),
      keywords: `${item.tags?.join(" ") ?? ""} ${group?.label[locale] ?? ""} carreira career trabalho work`,
    });
  }

  for (const project of projects) {
    const title = t(project.title, locale);
    const href = routes.project(locale, project.slug);
    chunks.push({
      id: `project-${project.slug}`,
      title,
      text: `${project.summary[locale]} ${isPt ? "Tecnologias" : "Technologies"}: ${project.tech.join(", ")}.`,
      source: `${copy.nav.projects} › ${title}`,
      href,
      weight: 1.6,
      // O título repetido faz a visão geral vencer as seções do mesmo projeto.
      keywords: `${title} ${title} ${project.badge[locale]} ${project.context[locale]} ${project.chips.map((chip) => chip[locale]).join(" ")} projeto project`,
    });
    for (const projectSection of project.sections) {
      chunks.push({
        id: `project-${project.slug}-${projectSection.key}`,
        title: `${title} · ${projectSection.title[locale]}`,
        text: `${projectSection.body[locale]} ${projectSection.bullets.map((bullet) => bullet[locale]).join("; ")}.`,
        source: `${copy.nav.projects} › ${title}`,
        href: `${href}#${projectSection.key}`,
        keywords: `${title} ${copy.project.sections[projectSection.key]}`,
      });
    }
  }

  for (const publication of publications) {
    chunks.push({
      id: `publication-${publication.id}`,
      title: publication.title[locale],
      text: `${publication.venue[locale]} (${publication.year}) — ${publication.status[locale]}. ${publication.authors}.${
        publication.note?.[locale] ? ` ${publication.note[locale]}` : ""
      }${publication.doi ? ` DOI ${publication.doi}.` : ""}`,
      source: `${copy.nav.research} › ${copy.research.publications}`,
      href: section("research"),
      keywords: "publicacao publication artigo paper pesquisa research",
    });
  }

  chunks.push({
    id: "research-areas",
    title: copy.research.areas,
    text: `${researchAreas.map((area) => area[locale]).join(", ")}. ${
      isPt
        ? "Doutorado na UECE (2026–2029) com tese sobre teste e garantia de qualidade de sistemas baseados em LLM com RAG."
        : "PhD at UECE (2026–2029) with a thesis on testing and quality assurance of LLM-based systems with RAG."
    }`,
    source: `${copy.nav.research} › ${copy.research.areas}`,
    href: section("research"),
    keywords: "pesquisa research doutorado phd tese thesis linhas interests",
  });

  for (const artifact of artifacts) {
    chunks.push({
      id: `artifact-${artifact.id}`,
      title: artifact.title[locale],
      text: `${artifact.description[locale]} DOI ${artifact.doi}.`,
      source: `${copy.nav.research} › ${copy.research.artifacts}`,
      href: section("research"),
      keywords: "artefato artefact artifact replicacao replication zenodo doi",
    });
  }

  chunks.push({
    id: "academic-activity",
    title: academicActivity.title[locale],
    text: `${academicActivity.org} · ${academicActivity.period[locale]}. ${academicActivity.description[locale]}`,
    source: `${copy.nav.research} › ${copy.research.activities}`,
    href: section("research"),
    keywords: "orientacao supervision pibic iniciacao cientifica",
  });

  chunks.push({
    id: "contact",
    title: copy.contact.eyebrow,
    text: `${copy.contact.text} ${copy.contact.email}: ${profile.email} · ${copy.contact.academicEmail}: ${profile.academicEmail} · LinkedIn: ${profile.social.linkedin.label} · GitHub: ${profile.social.github.label}.`,
    source: copy.contact.eyebrow,
    href: section("contact"),
    keywords: "contato contact email e-mail linkedin github falar talk contratar hire vaga job",
  });

  return chunks;
}
