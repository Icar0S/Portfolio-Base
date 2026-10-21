import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import type { Project } from "@/data/types";
import { otherLocale, routes, type Locale } from "@/lib/i18n";
import { navbarProps, navItems } from "./navigation";

export function ProjectPage({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <>
      <Navbar {...navbarProps(locale, "page", routes.project(otherLocale(locale), project.slug))} />
      <main id="conteudo" tabIndex={-1} className="overflow-x-clip outline-none">
        <ProjectDetail project={project} locale={locale} />
      </main>
      <Footer locale={locale} variant="page" items={navItems(locale, "page")} topHref="#inicio" />
    </>
  );
}
