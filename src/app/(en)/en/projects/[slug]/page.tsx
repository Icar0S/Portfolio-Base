import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/pages/ProjectPage";
import { getProject, projects } from "@/data/projects";
import { projectMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/en/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? projectMetadata(project, "en") : {};
}

export default async function Page({ params }: PageProps<"/en/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectPage project={project} locale="en" />;
}
