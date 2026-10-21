"use client";

import { AnimatePresence, m } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import { easeOut } from "@/components/motion/easing";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { IconName } from "@/data/types";
import { cn } from "@/lib/cn";

export type SkillsProps = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  tablistLabel: string;
  countTemplate: string;
  categories: { id: string; icon: IconName; name: string; items: string[] }[];
  marquee: string[];
};

function Star({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("ml-8 inline-block h-4 w-4 align-middle", className)}
      aria-hidden="true"
    >
      <path
        d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MarqueeRow({ items, reverse, duration }: { items: string[]; reverse?: boolean; duration: number }) {
  const list = (copy: number) => (
    <div className="flex shrink-0 items-center" key={copy}>
      {items.map((item) => (
        <span
          key={`${copy}-${item}`}
          className={cn(
            "mx-4 font-display text-2xl font-semibold whitespace-nowrap transition-colors md:text-3xl",
            reverse ? "text-marquee-soft" : "text-marquee-strong hover:text-accent",
          )}
        >
          {item}
          <Star className={reverse ? "text-signal/50" : "text-accent/50"} />
        </span>
      ))}
    </div>
  );

  return (
    <div className="group flex w-full overflow-hidden">
      <div
        className={cn(
          "flex shrink-0 animate-marquee group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {list(0)}
        {list(1)}
      </div>
    </div>
  );
}

export function Skills({
  id,
  eyebrow,
  title,
  subtitle,
  tablistLabel,
  countTemplate,
  categories,
  marquee,
}: SkillsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = categories[activeIndex]!;

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    let next: number | null = null;
    if (event.key in keys) next = (activeIndex + keys[event.key]! + categories.length) % categories.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = categories.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    tabs.current[next]?.focus();
    tabs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
      className="relative py-28 outline-none md:py-36"
    >
      <div className="section-container">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div
            role="tablist"
            aria-label={tablistLabel}
            className="-mx-4 flex snap-x scrollbar-none gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category, index) => {
              const selected = index === activeIndex;
              return (
                <Reveal
                  key={category.id}
                  role="presentation"
                  x={34}
                  y={0}
                  delay={index * 0.05}
                  className="shrink-0 snap-start lg:shrink"
                >
                  <button
                    ref={(node) => {
                      tabs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`skill-tab-${category.id}`}
                    aria-selected={selected}
                    aria-controls="skill-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={onKeyDown}
                    className={cn(
                      "group relative isolate flex w-60 items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 sm:w-64 lg:w-full lg:p-5",
                      selected
                        ? "border-surface-border-strong glass-strong"
                        : "border-surface-border bg-transparent hover:border-surface-border-strong",
                    )}
                  >
                    {selected ? <span className="absolute inset-0 -z-10 rounded-2xl bg-accent/6" /> : null}
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                        selected
                          ? "bg-accent/15 text-accent-strong"
                          : "bg-surface text-muted group-hover:text-foreground",
                      )}
                    >
                      <Icon name={category.icon} className="h-5 w-5" />
                    </span>
                    <span>
                      <span
                        className={cn(
                          "block font-display font-semibold transition-colors",
                          selected ? "text-foreground" : "text-muted-strong",
                        )}
                      >
                        {category.name}
                      </span>
                      <span className="font-mono text-xs text-muted">
                        {countTemplate.replace("{n}", String(category.items.length))}
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <Reveal blur>
            <div
              id="skill-panel"
              role="tabpanel"
              aria-labelledby={`skill-tab-${active.id}`}
              tabIndex={0}
              className="relative min-h-72 rounded-3xl border border-surface-border p-6 glass md:p-8"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl bg-grid opacity-40"
                aria-hidden="true"
              />
              <AnimatePresence mode="wait" initial={false}>
                <m.ul
                  key={active.id}
                  className="relative flex flex-wrap content-start gap-3"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.035 } },
                    exit: { opacity: 0, transition: { duration: 0.15 } },
                  }}
                >
                  {active.items.map((item) => (
                    <m.li
                      key={item}
                      variants={{
                        hidden: { opacity: 0, y: 16, scale: 0.9 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: { duration: 0.45, ease: easeOut },
                        },
                      }}
                      className="group inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-surface-border-strong hover:text-accent-strong"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
                      />
                      {item}
                    </m.li>
                  ))}
                </m.ul>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-4 mask-fade-edges" aria-hidden="true">
        <MarqueeRow items={marquee} duration={38} />
        <MarqueeRow items={marquee} duration={44} reverse />
      </div>
    </section>
  );
}
