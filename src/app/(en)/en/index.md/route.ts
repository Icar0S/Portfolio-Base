import { homeMarkdown, markdownHeaders } from "@/lib/markdown";

// /en/index.md — Markdown version of the English home page.
export const dynamic = "force-static";

export function GET() {
  return new Response(homeMarkdown("en"), { headers: markdownHeaders });
}
