import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Chip, TechList } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { ui } from "@/data/ui";
import { cn } from "@/lib/cn";
import { routes, t, type Locale } from "@/lib/i18n";
import { FigureView } from "./FigureView";
import { ProjectCover, resolveCover } from "./ProjectCover";
import { ProjectLinkIcon } from "./ProjectLinkIcon";

export function ProjectDetail({ project, locale }: { project: Project; locale: Locale }) {
  const copy = ui[locale];
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length]!;
  const next = projects[(index + 1) % projects.length]!;
  const title = t(project.title, locale);

  return (
    <>
      <section
        id="inicio"
        aria-labelledby="project-title"
        className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(224,169,94,0.2),transparent)]"
        />
        <div className="section-container relative">
          <Reveal y={24}>
            <Link
              href={routes.section(locale, "projetos")}
              className="mb-8 inline-flex items-center gap-2 py-3 text-sm text-muted transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {copy.project.back}
            </Link>
          </Reveal>

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal y={24} delay={0.05}>
              <p className="mb-4 font-mono text-xs tracking-[0.25em] text-accent uppercase">
                {project.badge[locale]} · {project.year}
              </p>
              <h1
                id="project-title"
                className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
              >
                {title}
              </h1>
              <p className="mt-3 font-mono text-xs tracking-[0.2em] text-muted uppercase">
                {project.context[locale]}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                {project.summary[locale]}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.chips.map((chip) => (
                  <li key={chip.pt}>
                    <Chip className="text-xs">{chip[locale]}</Chip>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <span className="sr-only">{copy.project.techLabel}: </span>
                <TechList items={project.tech} />
              </div>
              {project.links.length > 0 ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.links.map((link, linkIndex) => (
                    <a
                      key={link.href + link.kind}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm transition-all duration-300 hover:-translate-y-0.5",
                        linkIndex === 0
                          ? "bg-accent font-semibold text-background hover:bg-accent-strong hover:shadow-[0_0_36px_-6px_var(--glow)]"
                          : "font-medium text-foreground glass hover:border-surface-border-strong",
                      )}
                    >
                      <ProjectLinkIcon kind={link.kind} className="h-4 w-4" />
                      {link.kind === "site" ? copy.project.visit : copy.projects.links[link.kind]}
                      <span className="sr-only"> {copy.a11y.newTab}</span>
                    </a>
                  ))}
                </div>
              ) : null}
            </Reveal>
            {/* Sem animação de opacidade: a capa costuma ser o maior elemento (LCP). */}
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-surface-border">
              <ProjectCover
                cover={resolveCover(project.cover, locale)}
                sizes="(min-width: 1024px) 45vw, 100vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {project.sections.map((section, sectionIndex) => {
        const headingId = `${section.key}-title`;
        const label = `${String(sectionIndex + 1).padStart(2, "0")} — ${copy.project.sections[section.key]}`;
        return (
          <section key={section.key} id={section.key} aria-labelledby={headingId} className="py-16 md:py-24">
            <div className="section-container">
              <div
                className={cn(
                  "grid items-start gap-10 lg:gap-16",
                  section.figure ? "lg:grid-cols-2" : "max-w-3xl",
                  section.figure && sectionIndex % 2 === 1 && "lg:[&>*:first-child]:order-2",
                )}
              >
                <Reveal y={24}>
                  <p className="mb-3 font-mono text-xs tracking-[0.25em] text-accent uppercase">{label}</p>
                  <h2
                    id={headingId}
                    className="font-display text-3xl font-bold tracking-tight text-balance text-foreground md:text-4xl"
                  >
                    {section.title[locale]}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
                    {section.body[locale]}
                  </p>
                  {section.bullets.length > 0 ? (
                    <ul className="mt-6 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet.pt}
                          className="flex gap-3 text-sm leading-relaxed text-muted md:text-base"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          />
                          {bullet[locale]}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Reveal>
                {section.figure ? (
                  <Reveal y={24} delay={0.1}>
                    <FigureView figure={section.figure} locale={locale} />
                  </Reveal>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}

      {project.credit ? (
        <section aria-label={copy.project.credit} className="pb-8">
          <div className="section-container">
            <Reveal>
              <div className="max-w-3xl rounded-2xl p-6 glass">
                <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                  {copy.project.credit}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{project.credit[locale]}</p>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <nav aria-label={copy.project.pager} className="section-container py-16 md:py-24">
        <div className="grid gap-4 border-t border-surface-border pt-12 sm:grid-cols-2">
          <Link
            href={routes.project(locale, previous.slug)}
            className="group flex flex-col gap-2 rounded-2xl p-6 glass transition-colors hover:border-surface-border-strong"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
              <ArrowLeft
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              {copy.project.previous}
            </span>
            <span className="font-display text-xl font-bold text-foreground">
              {t(previous.title, locale)}
            </span>
          </Link>
          <Link
            href={routes.project(locale, next.slug)}
            className="group flex flex-col items-end gap-2 rounded-2xl p-6 text-right glass transition-colors hover:border-surface-border-strong"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
              {copy.project.next}
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
            <span className="font-display text-xl font-bold text-foreground">{t(next.title, locale)}</span>
          </Link>
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href={routes.section(locale, "projetos")}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            {copy.project.back}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </>
  );
}
