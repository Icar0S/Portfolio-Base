import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { profile } from "@/data/profile";
import { skillCategories } from "@/data/skills";
import { sectionIds, ui } from "@/data/ui";
import { htmlLang, type Locale } from "@/lib/i18n";

/** Quantidade de ferramentas (itens com nome único) arredondada para baixo em múltiplos de 5. */
function countTechnologies() {
  const names = new Set(
    skillCategories.flatMap((category) => category.items.filter((item) => typeof item === "string")),
  );
  return Math.floor(names.size / 5) * 5;
}

export function About({ locale }: { locale: Locale }) {
  const copy = ui[locale];
  const { about } = profile;
  const stats = [
    ...profile.stats,
    {
      value: countTechnologies(),
      suffix: "+",
      label: { pt: copy.about.technologies, en: copy.about.technologies },
    },
  ];

  return (
    <section
      id={sectionIds.about}
      aria-labelledby="sobre-title"
      tabIndex={-1}
      className="relative py-28 outline-none md:py-36"
    >
      <div className="section-container">
        <SectionHeading
          id="sobre-title"
          eyebrow={copy.about.eyebrow}
          title={about.title[locale]}
          align="left"
          className="mb-8! md:mb-10!"
        />

        <div className="max-w-3xl space-y-5">
          {about.paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={0.05 * index}>
              <p className="text-base leading-[1.75] text-muted md:text-[17px]">
                <RichText text={paragraph[locale]} />
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <ul className="mt-8 flex flex-wrap gap-3">
            {about.facts.map((fact) => (
              <li
                key={fact.label.pt}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-strong glass"
              >
                <Icon name={fact.icon} className="h-4 w-4 text-accent" />
                {fact.label[locale]}
              </li>
            ))}
            <li className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-strong glass">
              <Icon name="globe" className="h-4 w-4 text-signal" />
              {profile.languages
                .map((language) => `${language.name[locale]} (${language.level[locale]})`)
                .join(" · ")}
            </li>
          </ul>
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {about.pillars.map((pillar, index) => (
            <Reveal as="li" key={pillar.title.pt} delay={index * 0.08} blur>
              <SpotlightCard className="h-full rounded-3xl p-7 glass transition-colors duration-300 hover:border-surface-border-strong">
                <span className="relative font-mono text-sm text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="relative mt-4 font-display text-xl font-bold text-foreground">
                  {pillar.title[locale]}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-muted">{pillar.text[locale]}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-surface-border p-8 glass-strong md:p-12">
            <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
            <h3 className="sr-only">{copy.about.statsLabel}</h3>
            <dl className="relative grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {stats.map((stat) => (
                <div key={stat.label.pt} className="flex flex-col-reverse">
                  <dt className="mt-2 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                    {stat.label[locale]}
                  </dt>
                  <dd className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-[3.25rem]">
                    <Counter value={stat.value} locale={htmlLang[locale]} />
                    {stat.suffix ? <span className="gradient-text">{stat.suffix}</span> : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
