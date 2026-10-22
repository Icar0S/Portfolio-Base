import { getProject, projects } from "@/data/projects";
import { markdownHeaders, projectMarkdown } from "@/lib/markdown";

// /en/projects/<slug>/index.md — Markdown version of each project.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)!;
  return new Response(projectMarkdown(project, "en"), { headers: markdownHeaders });
}
