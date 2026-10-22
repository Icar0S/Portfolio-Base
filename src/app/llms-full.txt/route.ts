import { llmsFullTxt } from "@/lib/markdown";

// /llms-full.txt — todo o conteúdo do portfólio em um único arquivo Markdown.
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
