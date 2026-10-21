import type { StaticImageData } from "next/image";
import type { Localized, MaybeLocalized } from "@/lib/i18n";

/** Ícones disponíveis (mapeados para lucide-react em `components/ui/icons.tsx`). */
export type IconName =
  | "award"
  | "book-open"
  | "brain"
  | "bug"
  | "code"
  | "database"
  | "droplets"
  | "flask"
  | "gauge"
  | "git-branch"
  | "globe"
  | "graduation-cap"
  | "heart-handshake"
  | "layout"
  | "microscope"
  | "pen-tool"
  | "scan-search"
  | "server"
  | "shield-check"
  | "smartphone"
  | "sparkles"
  | "users"
  | "wand"
  | "workflow"
  | "chart";

export type ImageAsset = {
  image: StaticImageData;
  alt: Localized;
};

/* ----------------------------- Perfil ----------------------------- */

export type Stat = {
  value: number;
  suffix?: string;
  label: Localized;
};

export type Language = {
  name: Localized;
  level: Localized;
  /** Nível de 1 a 5, como no currículo. */
  score: number;
};

/* ---------------------------- Habilidades ---------------------------- */

export type SkillCategory = {
  id: string;
  icon: IconName;
  name: Localized;
  items: MaybeLocalized[];
};

/* ---------------------------- Trajetória ---------------------------- */

export type TimelineGroup = "work" | "education" | "extra";

export type TimelineItem = {
  id: string;
  group: TimelineGroup;
  icon: IconName;
  title: Localized;
  org: Localized;
  period: Localized;
  location?: Localized;
  /** Aceita **negrito** no texto. */
  highlights: Localized[];
  tags?: string[];
  media?: (ImageAsset & { caption: Localized })[];
  /** Slugs de projetos relacionados (viram links para as páginas de detalhe). */
  projects?: string[];
};

/* ----------------------------- Projetos ----------------------------- */

export type ProjectCategory = "qa" | "ia" | "fullstack" | "uiux";

export type ArtMotif = "graph" | "tree" | "bars" | "pipeline" | "oracle" | "browser";

export type ProjectCover =
  | (ImageAsset & { kind: "image"; fit?: "cover" | "contain" })
  | { kind: "art"; motif: ArtMotif; icon: IconName };

/** Capa com o texto alternativo já no idioma da página (pode ir para componentes client). */
export type ResolvedCover =
  | { kind: "image"; image: StaticImageData; alt: string; fit?: "cover" | "contain" }
  | { kind: "art"; motif: ArtMotif; icon: IconName };

export type ProjectLink = {
  kind: "site" | "github" | "paper" | "artifact";
  href: string;
};

/** Ilustração de uma seção da página de detalhe. */
export type Figure =
  | (ImageAsset & { kind: "image"; caption?: Localized; fit?: "cover" | "contain" })
  | { kind: "flow"; steps: MaybeLocalized[]; caption?: Localized }
  | { kind: "checks"; items: MaybeLocalized[]; caption?: Localized }
  | { kind: "metrics"; items: { value: string; label: Localized }[]; caption?: Localized };

export type ProjectSectionKey = "problem" | "solution" | "stack" | "quality" | "results";

export type ProjectSection = {
  key: ProjectSectionKey;
  title: Localized;
  body: Localized;
  bullets: Localized[];
  figure?: Figure;
};

export type Project = {
  slug: string;
  title: MaybeLocalized;
  /** Rótulo mono exibido sobre a imagem (ex.: "Plataforma de testes com IA"). */
  badge: Localized;
  year: string;
  categories: ProjectCategory[];
  /** Contexto curto: empresa, grupo ou natureza do projeto. */
  context: Localized;
  summary: Localized;
  chips: Localized[];
  tech: string[];
  links: ProjectLink[];
  cover: ProjectCover;
  /** Créditos/coautoria exibidos na página de detalhe. */
  credit?: Localized;
  sections: ProjectSection[];
};

/* ----------------------------- Pesquisa ----------------------------- */

export type PublicationType = "journal" | "chapter" | "conference";

export type Publication = {
  id: string;
  type: PublicationType;
  title: Localized;
  authors: string;
  venue: Localized;
  year: string;
  status: Localized;
  note?: Localized;
  doi?: string;
  /** Projeto relacionado no portfólio. */
  project?: string;
};

export type Artifact = {
  id: string;
  icon: IconName;
  title: Localized;
  description: Localized;
  doi: string;
  repo?: string;
};
