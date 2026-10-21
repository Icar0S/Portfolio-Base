import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { resolveCover } from "@/components/project/ProjectCover";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { Skills } from "@/components/sections/Skills";
import { timeline, timelineGroups } from "@/data/experience";
import { profile } from "@/data/profile";
import { getProject, projectFilters, projects } from "@/data/projects";
import { marqueeTechs, skillCategories } from "@/data/skills";
import { sectionIds, ui } from "@/data/ui";
import { otherLocale, routes, t, type Locale } from "@/lib/i18n";
import { asset } from "@/lib/site";
import { navbarProps, navItems } from "./navigation";

export function HomePage({ locale }: { locale: Locale }) {
  const copy = ui[locale];

  return (
    <>
      <Navbar {...navbarProps(locale, "home", routes.home(otherLocale(locale)))} />
      <main id="conteudo" tabIndex={-1} className="overflow-x-clip outline-none">
        <Hero
          firstName={profile.firstName}
          lastName={profile.lastName}
          badge={profile.availability[locale]}
          iAm={copy.hero.iAm}
          roles={profile.roles.map((role) => role[locale])}
          intro={profile.intro[locale]}
          photo={profile.photo.image}
          photoAlt={profile.photo.alt[locale]}
          chips={profile.heroChips}
          projectsCta={{ label: copy.hero.ctaProjects, href: `#${sectionIds.projects}` }}
          talkCta={{ label: copy.hero.ctaTalk, href: `#${sectionIds.contact}` }}
          cvCta={{ label: copy.hero.ctaCv, href: asset(profile.cv[locale]) }}
          scroll={{ label: copy.hero.scroll, ariaLabel: copy.hero.scrollLabel, href: `#${sectionIds.about}` }}
        />

        <About locale={locale} />

        <Skills
          id={sectionIds.skills}
          eyebrow={copy.skills.eyebrow}
          title={copy.skills.title}
          subtitle={copy.skills.subtitle}
          tablistLabel={copy.skills.tablist}
          countTemplate={copy.skills.count}
          categories={skillCategories.map((category) => ({
            id: category.id,
            icon: category.icon,
            name: category.name[locale],
            items: category.items.map((item) => t(item, locale)),
          }))}
          marquee={marqueeTechs}
        />

        <Journey
          id={sectionIds.journey}
          eyebrow={copy.journey.eyebrow}
          title={copy.journey.title}
          subtitle={copy.journey.subtitle}
          relatedLabel={copy.journey.relatedProject}
          groups={timelineGroups.map((group) => ({
            id: group.id,
            label: group.label[locale],
            entries: timeline
              .filter((item) => item.group === group.id)
              .map((item) => ({
                id: item.id,
                icon: item.icon,
                title: item.title[locale],
                org: item.org[locale],
                period: item.period[locale],
                location: item.location?.[locale],
                highlights: item.highlights.map((highlight) => highlight[locale]),
                tags: item.tags ?? [],
                media: (item.media ?? []).map((media) => ({
                  image: media.image,
                  alt: media.alt[locale],
                  caption: media.caption[locale],
                })),
                projects: (item.projects ?? []).flatMap((slug) => {
                  const project = getProject(slug);
                  return project
                    ? [{ href: routes.project(locale, slug), title: t(project.title, locale) }]
                    : [];
                }),
              })),
          }))}
        />

        <Projects
          id={sectionIds.projects}
          eyebrow={copy.projects.eyebrow}
          title={copy.projects.title}
          subtitle={copy.projects.subtitle}
          filterLabel={copy.projects.filterLabel}
          showingOne={copy.projects.showingOne}
          showingMany={copy.projects.showingMany}
          exploreLabel={copy.projects.explore}
          detailsLabel={copy.projects.details}
          newTabLabel={copy.a11y.newTab}
          filters={projectFilters.map((filter) => ({ id: filter.id, label: filter.label[locale] }))}
          projects={projects.map((project) => ({
            slug: project.slug,
            href: routes.project(locale, project.slug),
            title: t(project.title, locale),
            badge: project.badge[locale],
            year: project.year,
            context: project.context[locale],
            summary: project.summary[locale],
            chips: project.chips.map((chip) => chip[locale]),
            tech: project.tech,
            categories: project.categories,
            links: project.links.map((link) => ({ ...link, label: copy.projects.links[link.kind] })),
            cover: resolveCover(project.cover, locale),
          }))}
        />

        <Research locale={locale} />

        <Contact locale={locale} />
      </main>
      <Footer locale={locale} variant="home" items={navItems(locale, "home")} topHref="#inicio" />
    </>
  );
}
