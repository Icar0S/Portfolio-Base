import { ArrowUpRight, GraduationCap, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { GithubIcon, LattesIcon, LinkedinIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { sectionIds, ui } from "@/data/ui";
import type { Locale } from "@/lib/i18n";
import { CopyEmailButton } from "./CopyEmailButton";

function ContactCard({
  href,
  label,
  value,
  icon,
  external,
  newTab,
}: {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  external?: boolean;
  newTab: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex min-w-0 items-center gap-3 rounded-2xl px-5 py-4 glass transition-colors hover:border-surface-border-strong"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-strong transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <span className="min-w-0 text-left">
        <span className="block font-mono text-[11px] tracking-wider text-muted uppercase">{label}</span>
        <span className="block truncate text-sm text-foreground">{value}</span>
        {external ? <span className="sr-only">{newTab}</span> : null}
      </span>
    </a>
  );
}

export function Contact({ locale }: { locale: Locale }) {
  const copy = ui[locale];
  const id = sectionIds.contact;
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(copy.contact.subject)}`;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
      className="relative py-28 outline-none md:py-36"
    >
      <div className="section-container">
        <div className="relative overflow-hidden rounded-4xl border border-surface-border p-6 glass-strong sm:p-8 md:rounded-[2.5rem] md:p-16">
          <div
            className="pointer-events-none absolute inset-0 bg-grid mask-fade-y opacity-40"
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(224,169,94,0.18),transparent_65%)] blur-2xl"
          />
          <div className="relative">
            <SectionHeading
              id={`${id}-title`}
              eyebrow={copy.contact.eyebrow}
              title={copy.contact.title}
              subtitle={copy.contact.text}
              align="left"
              className="mb-10! md:mb-14!"
            />

            <div className="flex flex-col gap-10 xl:flex-row xl:items-center xl:justify-between">
              <Reveal>
                <a
                  href={mailto}
                  className="group inline-flex items-center gap-4 rounded-full bg-accent py-3 pr-3 pl-7 font-display text-lg font-semibold text-background transition-colors hover:bg-accent-strong"
                >
                  {copy.contact.cta}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-accent-strong transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                </a>
              </Reveal>

              <Reveal delay={0.1} className="grid gap-4 sm:grid-cols-2 xl:max-w-xl">
                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <ContactCard
                      href={`mailto:${profile.email}`}
                      label={copy.contact.email}
                      value={profile.email}
                      icon={<Mail className="h-4.5 w-4.5" aria-hidden="true" />}
                      newTab={copy.a11y.newTab}
                    />
                  </div>
                  <CopyEmailButton
                    email={profile.email}
                    label={copy.contact.copy}
                    copiedLabel={copy.contact.copied}
                  />
                </div>
                <ContactCard
                  href={profile.social.linkedin.href}
                  label={copy.contact.linkedin}
                  value={profile.social.linkedin.label}
                  icon={<LinkedinIcon className="h-4.5 w-4.5" />}
                  external
                  newTab={copy.a11y.newTab}
                />
                <ContactCard
                  href={profile.social.github.href}
                  label={copy.contact.github}
                  value={profile.social.github.label}
                  icon={<GithubIcon className="h-4.5 w-4.5" />}
                  external
                  newTab={copy.a11y.newTab}
                />
                <ContactCard
                  href={profile.social.lattes.href}
                  label={copy.contact.lattes}
                  value={profile.social.lattes.label}
                  icon={<LattesIcon className="h-4.5 w-4.5" />}
                  external
                  newTab={copy.a11y.newTab}
                />
                <ContactCard
                  href={`mailto:${profile.academicEmail}`}
                  label={copy.contact.academicEmail}
                  value={profile.academicEmail}
                  icon={<GraduationCap className="h-4.5 w-4.5" aria-hidden="true" />}
                  newTab={copy.a11y.newTab}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
