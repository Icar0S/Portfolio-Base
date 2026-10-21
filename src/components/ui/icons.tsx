import {
  Award,
  BookOpen,
  Brain,
  Bug,
  ChartColumn,
  CodeXml,
  Database,
  Droplets,
  FlaskConical,
  Gauge,
  GitBranch,
  Globe,
  GraduationCap,
  HeartHandshake,
  LayoutTemplate,
  Microscope,
  PenTool,
  ScanSearch,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  WandSparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { SVGProps } from "react";
import type { IconName } from "@/data/types";

const icons: Record<IconName, LucideIcon> = {
  award: Award,
  "book-open": BookOpen,
  brain: Brain,
  bug: Bug,
  chart: ChartColumn,
  code: CodeXml,
  database: Database,
  droplets: Droplets,
  flask: FlaskConical,
  gauge: Gauge,
  "git-branch": GitBranch,
  globe: Globe,
  "graduation-cap": GraduationCap,
  "heart-handshake": HeartHandshake,
  layout: LayoutTemplate,
  microscope: Microscope,
  "pen-tool": PenTool,
  "scan-search": ScanSearch,
  server: Server,
  "shield-check": ShieldCheck,
  smartphone: Smartphone,
  sparkles: Sparkles,
  users: Users,
  wand: WandSparkles,
  workflow: Workflow,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = icons[name];
  return <Component className={className} aria-hidden="true" />;
}

/* Ícones de marca (o lucide-react 1.x não inclui logotipos). */

type BrandProps = SVGProps<SVGSVGElement>;

export function GithubIcon(props: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon(props: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/** Lattes não tem logotipo oficial em SVG; usamos um monograma "L". */
export function LattesIcon(props: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M9 7.5v9h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
