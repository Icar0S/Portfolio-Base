import { llmsTxt } from "@/lib/markdown";

// /llms.txt — índice para agentes e LLMs (https://llmstxt.org).
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
