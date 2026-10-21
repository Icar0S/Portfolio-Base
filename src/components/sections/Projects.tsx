"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { easeOut } from "@/components/motion/easing";
import { ProjectCover } from "@/components/project/ProjectCover";
import { ProjectLinkIcon } from "@/components/project/ProjectLinkIcon";
import { Chip, TechList } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { ProjectLink, ResolvedCover } from "@/data/types";
import { cn } from "@/lib/cn";

export type ProjectCardData = {
  slug: string;
  href: string;
  title: string;
  badge: string;
  year: string;
  context: string;
  summary: string;
  chips: string[];
  tech: string[];
  categories: string[];
  links: (ProjectLink & { label: string })[];
  cover: ResolvedCover;
};

export type ProjectsProps = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  filterLabel: string;
  showingOne: string;
  showingMany: string;
  exploreLabel: string;
  detailsLabel: string;
  newTabLabel: string;
  filters: { id: string; label: string }[];
  projects: ProjectCardData[];
};

function ProjectCard({
  project,
  featured,
  exploreLabel,
  detailsLabel,
  newTabLabel,
}: {
  project: ProjectCardData;
  featured: boolean;
  exploreLabel: string;
  detailsLabel: string;
  newTabLabel: string;
}) {
  return (
    <m.li
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, ease: easeOut }}
      className={cn("card-border group h-full rounded-[1.75rem]", featured && "md:col-span-2")}
      data-categories={project.categories.join(" ")}
    >
      <SpotlightCard tilt size={340} alpha={0.16} className="h-full rounded-[1.75rem]">
        <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-surface-border glass-strong">
          <div className={cn("grid flex-1", featured ? "md:grid-cols-2" : "grid-cols-1")}>
            <div
              className={cn(
                "relative overflow-hidden bg-background-elevated",
                featured ? "aspect-16/10 md:aspect-auto md:min-h-96" : "aspect-16/10",
              )}
            >
              {/* Atalho visual para a página do projeto (o título já é o link acessível). */}
              <Link href={project.href} tabIndex={-1} aria-hidden="true" className="absolute inset-0 block">
                <div className="absolute inset-0 transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]">
                  <ProjectCover
                    cover={project.cover}
                    uid={`card-${project.slug}`}
                    sizes={featured ? "(min-width: 768px) 560px, 100vw" : "(min-width: 768px) 540px, 100vw"}
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background/70 to-transparent" />
                <div className="absolute inset-0 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-background">
                    {exploreLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
              <div className="pointer-events-none absolute top-4 right-4 left-4 z-10 flex items-start justify-between gap-3">
                <span className="rounded-full border border-surface-border bg-background/75 px-3 py-1 font-mono text-[11px] tracking-wider text-accent-strong uppercase backdrop-blur-md">
                  {project.badge}
                </span>
                <span className="shrink-0 rounded-full border border-surface-border bg-background/75 px-2.5 py-1 font-mono text-[11px] text-muted-strong backdrop-blur-md">
                  {project.year}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-7">
              <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">{project.context}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                <Link href={project.href} className="transition-colors hover:text-accent-strong">
                  {project.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.chips.map((chip) => (
                  <li key={chip}>
                    <Chip>{chip}</Chip>
                  </li>
                ))}
              </ul>
              <TechList items={project.tech} className="mt-5 border-t border-surface-border pt-5" />
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.map((link, index) => (
                  <a
                    key={link.href + link.kind}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs transition-colors",
                      index === 0
                        ? "bg-accent font-semibold text-background hover:bg-accent-strong"
                        : "font-medium text-foreground glass hover:border-surface-border-strong",
                    )}
                  >
                    <ProjectLinkIcon kind={link.kind} />
                    {link.label}
                    <span className="sr-only"> {newTabLabel}</span>
                  </a>
                ))}
                <Link
                  href={project.href}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-foreground glass transition-colors hover:border-surface-border-strong"
                >
                  {detailsLabel}
                  <span className="sr-only">: {project.title}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </SpotlightCard>
    </m.li>
  );
}

export function Projects({
  id,
  eyebrow,
  title,
  subtitle,
  filterLabel,
  showingOne,
  showingMany,
  exploreLabel,
  detailsLabel,
  newTabLabel,
  filters,
  projects,
}: ProjectsProps) {
  const [filter, setFilter] = useState("all");
  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => project.categories.includes(filter))),
    [filter, projects],
  );
  const status = visible.length === 1 ? showingOne : showingMany.replace("{n}", String(visible.length));

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
      className="relative py-28 outline-none md:py-36"
    >
      <div className="section-container">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <Reveal className="mb-14">
          <div
            role="group"
            aria-label={filterLabel}
            className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-1 rounded-3xl p-1.5 glass sm:rounded-full"
          >
            {filters.map((item) => {
              const selected = item.id === filter;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(item.id)}
                  className={cn(
                    "relative isolate rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    selected ? "text-background" : "text-muted hover:text-foreground",
                  )}
                >
                  {selected ? (
                    <m.span
                      layoutId="project-filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  {item.label}
                </button>
              );
            })}
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {status}
          </p>
        </Reveal>

        <m.ul layout className="grid gap-7 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                // O primeiro é o destaque; o último também ocupa a linha inteira quando sobraria sozinho.
                featured={index === 0 || (index === visible.length - 1 && (visible.length - 1) % 2 === 1)}
                exploreLabel={exploreLabel}
                detailsLabel={detailsLabel}
                newTabLabel={newTabLabel}
              />
            ))}
          </AnimatePresence>
        </m.ul>
      </div>
    </section>
  );
}
