import { ArrowUpRight, FileText, Users } from "lucide-react";
import Link from "next/link";
import { Chip } from "@/components/ui/Chip";
import { GithubIcon, Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProject } from "@/data/projects";
import {
  academicActivity,
  artifacts,
  authorName,
  doiUrl,
  publicationGroups,
  publications,
  researchAreas,
} from "@/data/research";
import { sectionIds, ui } from "@/data/ui";
import { routes, t, type Locale } from "@/lib/i18n";

function Authors({ authors }: { authors: string }) {
  const [before, after] = authors.split(authorName);
  if (after === undefined) return <>{authors}</>;
  return (
    <>
      {before}
      <strong className="font-semibold text-foreground">{authorName}</strong>
      {after}
    </>
  );
}

export function Research({ locale }: { locale: Locale }) {
  const copy = ui[locale];
  const id = sectionIds.research;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
      className="relative py-28 outline-none md:py-36"
    >
      <div className="section-container">
        <SectionHeading
          id={`${id}-title`}
          eyebrow={copy.research.eyebrow}
          title={copy.research.title}
          subtitle={copy.research.subtitle}
        />

        <div className="grid gap-12 lg:grid-cols-[1.45fr_0.75fr] lg:gap-10">
          <div className="space-y-12">
            {publicationGroups.map((group) => {
              const items = publications.filter((publication) => publication.type === group.id);
              if (items.length === 0) return null;
              return (
                <div key={group.id}>
                  <Reveal>
                    <h3 className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-accent uppercase">
                      {group.label[locale]}
                      <span className="h-px flex-1 bg-surface-border" aria-hidden="true" />
                      <span className="text-muted">{String(items.length).padStart(2, "0")}</span>
                    </h3>
                  </Reveal>
                  <ol className="space-y-4">
                    {items.map((publication, index) => {
                      const project = publication.project ? getProject(publication.project) : undefined;
                      const note = publication.note?.[locale];
                      return (
                        <Reveal as="li" key={publication.id} delay={index * 0.05}>
                          <article className="rounded-2xl p-6 glass transition-colors duration-300 hover:border-surface-border-strong md:p-7">
                            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] tracking-wider uppercase">
                              <span className="text-accent-strong">{publication.year}</span>
                              <span className="text-muted" aria-hidden="true">
                                ·
                              </span>
                              <span className="text-signal-soft">{publication.status[locale]}</span>
                            </p>
                            <h4 className="mt-3 font-display text-lg leading-snug font-semibold text-foreground md:text-xl">
                              {publication.title[locale]}
                            </h4>
                            <p className="mt-3 text-sm leading-relaxed text-muted">
                              <Authors authors={publication.authors} />
                            </p>
                            <p className="mt-1.5 text-sm leading-relaxed text-muted-strong italic">
                              {publication.venue[locale]}
                            </p>
                            {note ? <p className="mt-1.5 text-sm text-muted">{note}</p> : null}
                            {publication.doi || project ? (
                              <div className="mt-5 flex flex-wrap gap-2">
                                {publication.doi ? (
                                  <a
                                    href={doiUrl(publication.doi)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/7 px-3 py-1.5 font-mono text-[11px] text-accent-strong transition-colors hover:border-accent/40"
                                  >
                                    DOI {publication.doi}
                                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    <span className="sr-only"> {copy.a11y.newTab}</span>
                                  </a>
                                ) : null}
                                {project ? (
                                  <Link
                                    href={routes.project(locale, project.slug)}
                                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-foreground glass transition-colors hover:border-surface-border-strong"
                                  >
                                    {copy.research.seeProject}: {t(project.title, locale)}
                                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                  </Link>
                                ) : null}
                              </div>
                            ) : null}
                          </article>
                        </Reveal>
                      );
                    })}
                  </ol>
                </div>
              );
            })}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start" aria-label={copy.research.areas}>
            <Reveal blur>
              <div className="rounded-3xl border border-surface-border p-7 glass-strong">
                <h3 className="font-display text-lg font-bold text-foreground">{copy.research.areas}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {researchAreas.map((area) => (
                    <li key={area.pt}>
                      <Chip className="text-xs">{area[locale]}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal blur delay={0.05}>
              <div className="rounded-3xl border border-surface-border p-7 glass-strong">
                <h3 className="font-display text-lg font-bold text-foreground">{copy.research.artifacts}</h3>
                <ul className="mt-5 space-y-5">
                  {artifacts.map((artifact) => (
                    <li key={artifact.id} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-strong">
                        <Icon name={artifact.icon} className="h-4.5 w-4.5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{artifact.title[locale]}</p>
                        <p className="mt-1 text-sm text-muted">{artifact.description[locale]}</p>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                          <a
                            href={doiUrl(artifact.doi)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-[11px] text-accent-strong hover:underline"
                          >
                            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                            DOI {artifact.doi}
                            <span className="sr-only"> {copy.a11y.newTab}</span>
                          </a>
                          {artifact.repo ? (
                            <a
                              href={artifact.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-[11px] text-accent-strong hover:underline"
                            >
                              <GithubIcon className="h-3.5 w-3.5" />
                              {copy.research.code}
                              <span className="sr-only"> {copy.a11y.newTab}</span>
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal blur delay={0.1}>
              <div className="rounded-3xl border border-surface-border p-7 glass-strong">
                <h3 className="font-display text-lg font-bold text-foreground">{copy.research.activities}</h3>
                <div className="mt-5 flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-signal/10 text-signal-soft">
                    <Users className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{academicActivity.title[locale]}</p>
                    <p className="mt-1 font-mono text-[11px] tracking-wider text-accent uppercase">
                      {academicActivity.org} · {academicActivity.period[locale]}
                    </p>
                    <p className="mt-2 text-sm text-muted">{academicActivity.description[locale]}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
