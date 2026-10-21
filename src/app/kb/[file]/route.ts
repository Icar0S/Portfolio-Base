import { buildKnowledge } from "@/lib/knowledge";
import { locales, type Locale } from "@/lib/i18n";

// Gera /kb/pt.json e /kb/en.json no build (export estático).
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ file: `${locale}.json` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const locale = file.replace(/\.json$/, "") as Locale;
  return Response.json(buildKnowledge(locale));
}
