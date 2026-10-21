"use client";

import { m, type Variants } from "framer-motion";
import { easeOut } from "@/components/motion/easing";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

// O gatilho de viewport fica no <h2>: as palavras começam recortadas pelo overflow
// e por isso nunca seriam "vistas" pelo IntersectionObserver.
const heading: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const word: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: easeOut } },
};

/** Cabeçalho de seção com título revelado palavra por palavra. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const words = title.split(" ");
  const centered = align === "center";

  return (
    <div className={cn("mb-14 md:mb-20", centered ? "text-center" : "text-left", className)}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <m.h2
        id={id}
        variants={heading}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        className={cn(
          "mt-4 font-display text-[2.15rem] leading-[1.05] font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-5xl lg:text-6xl",
          centered && "mx-auto max-w-4xl",
        )}
      >
        <span className="sr-only">{title}</span>
        <span aria-hidden="true">
          {words.map((text, index) => (
            <span
              key={`${text}-${index}`}
              className={cn(
                "mb-[-0.12em] inline-block overflow-hidden pb-[0.12em] align-baseline",
                index < words.length - 1 && "mr-[0.25em]",
              )}
            >
              <m.span data-reveal="" className="inline-block" variants={word}>
                {text}
              </m.span>
            </span>
          ))}
        </span>
      </m.h2>
      {subtitle ? (
        <Reveal delay={0.1}>
          <p className={cn("mt-5 max-w-2xl text-base text-muted md:text-lg", centered && "mx-auto")}>
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
