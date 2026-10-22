import { homeMarkdown, markdownHeaders } from "@/lib/markdown";

// /index.md — versão Markdown da home em português.
export const dynamic = "force-static";

export function GET() {
  return new Response(homeMarkdown("pt"), { headers: markdownHeaders });
}
