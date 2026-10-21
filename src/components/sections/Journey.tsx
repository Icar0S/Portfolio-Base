"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { easeOut } from "@/components/motion/easing";
import { TechList } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { IconName } from "@/data/types";

export type JourneyEntry = {
  id: string;
  icon: IconName;
  title: string;
  org: string;
  period: string;
  location?: string;
  highlights: string[];
  tags: string[];
  media: { image: StaticImageData; alt: string; caption: string }[];
  projects: { href: string; title: string }[];
};

export type JourneyProps = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  relatedLabel: string;
  groups: { id: string; label: string; entries: JourneyEntry[] }[];
};

function Entry({ entry, relatedLabel }: { entry: JourneyEntry; relatedLabel: string }) {
  return (
    <li className="relative pb-12 pl-16 last:pb-0 md:pl-28">
      <m.div
        data-reveal=""
        className="absolute top-0 left-0"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        transition={{ duration: 0.6, ease: easeOut }}
      >
        <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-surface-border text-accent-strong glass-strong md:h-[52px] md:w-[52px]">
          <Icon name={entry.icon} className="h-4 w-4 md:h-5 md:w-5" />
        </span>
      </m.div>

      <Reveal x={34} y={0} blur>
        <article className="group relative overflow-hidden rounded-3xl p-6 glass transition-colors duration-300 hover:border-surface-border-strong md:p-8">
          <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
            {entry.period}
            {entry.location ? <span className="text-muted"> · {entry.location}</span> : null}
          </p>
          <h4 className="mt-3 font-display text-xl font-bold text-foreground md:text-2xl">{entry.title}</h4>
          <p className="mt-1.5 text-sm font-medium text-accent-strong md:text-[15px]">{entry.org}</p>

          {entry.highlights.length > 0 ? (
            <ul className="mt-5 space-y-3">
              {entry.highlights.map((highlight, index) => (
                <li key={index} className="flex gap-3 text-sm leading-relaxed text-muted md:text-[15px]">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    <RichText text={highlight} />
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {entry.media.length > 0 ? (
            <div className={entry.media.length > 1 ? "mt-6 grid gap-4 sm:grid-cols-2" : "mt-6 max-w-md"}>
              {entry.media.map((media) => (
                <figure
                  key={media.caption}
                  className="overflow-hidden rounded-2xl border border-surface-border bg-background-elevated"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={media.image}
                      alt={media.alt}
                      fill
                      sizes="(min-width: 768px) 360px, 90vw"
                      className="object-cover object-top transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent" />
                  </div>
                  <figcaption className="border-t border-surface-border px-4 py-2.5 font-mono text-[11px] tracking-wide text-muted-strong">
                    {media.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : null}

          {entry.tags.length > 0 ? (
            <TechList items={entry.tags} className="mt-6 border-t border-surface-border pt-5" />
          ) : null}

          {entry.projects.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {entry.projects.map((project) => (
                <li key={project.href}>
                  <Link
                    href={project.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/7 px-3 py-1.5 text-xs font-medium text-accent-strong transition-colors hover:border-accent/40 hover:bg-accent/10"
                  >
                    <span className="sr-only">{relatedLabel}: </span>
                    {project.title}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      </Reveal>
    </li>
  );
}

export function Journey({ id, eyebrow, title, subtitle, relatedLabel, groups }: JourneyProps) {
  const timeline = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timeline, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
      className="relative py-28 outline-none md:py-36"
    >
      <div className="section-container">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <div ref={timeline} className="relative mx-auto max-w-4xl">
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[19px] w-px bg-surface-border md:left-[25px]"
          />
          <m.div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-linear-to-b from-accent-strong via-accent to-accent/10 md:left-[25px]"
            style={{ scaleY }}
          />

          {groups.map((group) => (
            <div key={group.id} className="relative pb-14 last:pb-0">
              <div className="relative mb-10 pl-16 md:pl-28">
                <span
                  aria-hidden="true"
                  className="absolute top-1 left-[14px] h-[11px] w-[11px] rotate-45 border border-accent bg-background md:left-[20px]"
                />
                <h3 className="font-mono text-xs tracking-[0.25em] text-accent uppercase">{group.label}</h3>
              </div>
              <ol>
                {group.entries.map((entry) => (
                  <Entry key={entry.id} entry={entry} relatedLabel={relatedLabel} />
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
