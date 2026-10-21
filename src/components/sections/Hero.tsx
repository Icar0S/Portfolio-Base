"use client";

import {
  AnimatePresence,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, Download, Sparkles } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useState, type PointerEvent } from "react";
import { easeOut } from "@/components/motion/easing";
import { RichText } from "@/components/ui/RichText";
import { cn } from "@/lib/cn";
import { usePreloaderDone } from "@/lib/preloader";

export type HeroProps = {
  firstName: string;
  lastName: string;
  badge: string;
  iAm: string;
  roles: string[];
  intro: string;
  photo: StaticImageData;
  photoAlt: string;
  chips: string[];
  projectsCta: { label: string; href: string };
  talkCta: { label: string; href: string };
  cvCta: { label: string; href: string };
  scroll: { label: string; ariaLabel: string; href: string };
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: easeOut } }),
};

/** Posição dos chips ao redor da foto (mobile → desktop) e profundidade do parallax. */
const chipLayout = [
  { className: "left-[10%] top-[8%] lg:left-[-12%]", depth: 18, duration: 5.2 },
  { className: "left-[88%] top-[22%] lg:left-[92%]", depth: -14, duration: 6.1 },
  { className: "left-[12%] top-[74%] lg:left-[-8%]", depth: -20, duration: 5.6 },
  { className: "left-[86%] top-[84%] lg:left-[94%]", depth: 12, duration: 6.6 },
];

function AnimatedWord({ word, ready, delay }: { word: string; ready: boolean; delay: number }) {
  return (
    <span className="mb-[-0.12em] inline-block overflow-hidden pb-[0.12em] align-baseline" aria-hidden="true">
      {Array.from(word).map((letter, index) => (
        <m.span
          key={`${letter}-${index}`}
          data-reveal=""
          className="inline-block"
          initial={{ y: "115%" }}
          animate={ready ? { y: "0%" } : { y: "115%" }}
          transition={{ duration: 0.9, delay: delay + index * 0.035, ease: easeOut }}
        >
          {letter}
        </m.span>
      ))}
    </span>
  );
}

function FloatingChip({
  label,
  className,
  depth,
  duration,
  pointerX,
  pointerY,
  ready,
  delay,
}: {
  label: string;
  className: string;
  depth: number;
  duration: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  ready: boolean;
  delay: number;
}) {
  const x = useTransform(pointerX, (value) => value * depth);
  const y = useTransform(pointerY, (value) => value * depth);
  return (
    <div className={cn("absolute z-20 -translate-x-1/2 -translate-y-1/2", className)}>
      <m.div style={{ x, y }}>
        <m.div
          data-reveal=""
          initial={{ opacity: 0, scale: 0.8 }}
          animate={ready ? { opacity: 1, scale: 1, y: [0, -8, 0] } : { opacity: 0, scale: 0.8 }}
          transition={{
            opacity: { duration: 0.6, delay },
            scale: { duration: 0.6, delay, ease: easeOut },
            y: { duration, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 },
          }}
          className="rounded-full px-3 py-1.5 font-mono text-[11px] font-medium whitespace-nowrap text-accent-strong shadow-lg glass-strong sm:px-3.5 sm:py-2 sm:text-xs"
        >
          {label}
        </m.div>
      </m.div>
    </div>
  );
}

export function Hero({
  firstName,
  lastName,
  badge,
  iAm,
  roles,
  intro,
  photo,
  photoAlt,
  chips,
  projectsCta,
  talkCta,
  cvCta,
  scroll,
}: HeroProps) {
  const ready = usePreloaderDone();
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const longestRole = roles.reduce((longest, role) => (role.length > longest.length ? role : longest), "");

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 60, damping: 18 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 18 });
  const photoX = useTransform(springX, (value) => value * -10);
  const photoY = useTransform(springY, (value) => value * -10);

  useEffect(() => {
    if (!ready || reduceMotion) return;
    const timer = window.setInterval(() => setRoleIndex((index) => (index + 1) % roles.length), 2500);
    return () => window.clearInterval(timer);
  }, [ready, reduceMotion, roles.length]);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const state = ready ? "visible" : "hidden";

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24 lg:pb-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgba(224,169,94,0.14),transparent_60%)] blur-2xl"
      />

      <div className="section-container relative z-10 w-full">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div className="text-center lg:text-left">
            <m.div
              data-reveal=""
              variants={fadeUp}
              initial="hidden"
              animate={state}
              custom={0.05}
              className="mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-muted-strong glass"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.06em] uppercase sm:text-xs sm:tracking-wider">
                {badge}
              </span>
            </m.div>

            <h1
              id="hero-title"
              className="font-display text-5xl leading-[0.95] font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
            >
              <span className="sr-only">
                {firstName} {lastName}
              </span>
              <AnimatedWord word={firstName} ready={ready} delay={0.1} />
              <br />
              <AnimatedWord word={lastName} ready={ready} delay={0.3} />
            </h1>

            <m.p
              data-reveal=""
              variants={fadeUp}
              initial="hidden"
              animate={state}
              custom={0.55}
              className="mt-6 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 font-display text-[clamp(1.1rem,5.6vw,1.5rem)] font-semibold sm:text-3xl md:text-4xl lg:justify-start lg:text-[2rem] xl:text-4xl"
            >
              <span className="text-muted-strong">{iAm}</span>
              <span className="sr-only">{roles.join(", ")}</span>
              <span className="relative inline-block max-w-full align-bottom font-bold" aria-hidden="true">
                <span className="invisible block whitespace-nowrap">{longestRole}</span>
                <AnimatePresence mode="popLayout" initial={false}>
                  <m.span
                    key={roleIndex}
                    className="absolute inset-0 block gradient-text whitespace-nowrap lg:text-left"
                    initial={{ opacity: 0, filter: "blur(8px)", y: "60%" }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: "0%" }}
                    exit={{ opacity: 0, filter: "blur(8px)", y: "-60%" }}
                    transition={{ duration: 0.55, ease: easeOut }}
                  >
                    {roles[roleIndex]}
                  </m.span>
                </AnimatePresence>
              </span>
            </m.p>

            <m.p
              data-reveal=""
              variants={fadeUp}
              initial="hidden"
              animate={state}
              custom={0.7}
              className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg lg:mx-0"
            >
              <RichText text={intro} />
            </m.p>

            <m.div
              data-reveal=""
              variants={fadeUp}
              initial="hidden"
              animate={state}
              custom={0.85}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap lg:justify-start"
            >
              <a
                href={projectsCta.href}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-[0_0_36px_-6px_var(--glow)]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative z-10 inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  {projectsCta.label}
                </span>
              </a>
              <a
                href={talkCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground glass transition-all duration-300 hover:-translate-y-0.5 hover:border-surface-border-strong hover:bg-accent/5"
              >
                {talkCta.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={cvCta.href}
                download=""
                className="inline-flex items-center gap-2 rounded-full px-3 py-3 text-sm font-medium text-muted-strong transition-colors hover:text-accent"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {cvCta.label}
                <span className="font-mono text-[10px] tracking-wider text-muted">PDF</span>
              </a>
            </m.div>
          </div>

          <div className="relative mx-auto w-full max-w-68 sm:max-w-xs lg:max-w-sm">
            <m.div style={{ x: photoX, y: photoY }}>
              <m.div
                data-reveal=""
                initial={{ scale: 0.92 }}
                animate={ready ? { scale: 1 } : { scale: 0.92 }}
                transition={{ duration: 1.1, ease: easeOut }}
                className="relative"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 scale-95 rounded-4xl bg-[radial-gradient(circle_at_50%_30%,rgba(224,169,94,0.35),transparent_65%)] blur-2xl"
                />
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-[28px] border border-surface-border glass">
                  <Image
                    src={photo}
                    alt={photoAlt}
                    fill
                    preload
                    loading="eager"
                    fetchPriority="high"
                    sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 272px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(224,169,94,0.12),transparent_40%)] mix-blend-overlay" />
                </div>
              </m.div>
            </m.div>

            {chips.map((chip, index) => {
              const layout = chipLayout[index % chipLayout.length]!;
              return (
                <FloatingChip
                  key={chip}
                  label={chip}
                  className={layout.className}
                  depth={layout.depth}
                  duration={layout.duration}
                  pointerX={springX}
                  pointerY={springY}
                  ready={ready}
                  delay={0.9 + index * 0.12}
                />
              );
            })}
          </div>
        </div>
      </div>

      <m.a
        data-reveal=""
        href={scroll.href}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-accent md:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">{scroll.label}</span>
        <span className="sr-only">{scroll.ariaLabel}</span>
        <span
          className="flex h-9 w-5 justify-center rounded-full border border-surface-border p-1"
          aria-hidden="true"
        >
          <span className="h-1.5 w-1 animate-scroll-dot rounded-full bg-accent" />
        </span>
      </m.a>
    </section>
  );
}
