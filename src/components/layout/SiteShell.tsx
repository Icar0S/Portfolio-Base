import type { ReactNode } from "react";
import { fontVariables } from "@/app/fonts";
import { ChatLauncher } from "@/components/chat/ChatLauncher";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { sectionIds, ui } from "@/data/ui";
import { htmlLang, routes, type Locale } from "@/lib/i18n";
import { preloaderBootScript } from "@/lib/preloader-script";
import { asset, basePath } from "@/lib/site";
import { Background } from "./Background";
import { Preloader } from "./Preloader";
import { ScrollProgress } from "./ScrollProgress";
import { SmoothScroll } from "./SmoothScroll";

// Sem JavaScript: esconde o preloader e mostra os elementos que entrariam animados.
const noScriptCss =
  "#preloader{display:none!important}[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}";

/** Estrutura comum às páginas em português e inglês (cada idioma tem seu root layout). */
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const copy = ui[locale];

  return (
    <html lang={htmlLang[locale]} className={fontVariables} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- no App Router o root layout pode declarar <head> */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloaderBootScript }} />
        <noscript>
          <style>{noScriptCss}</style>
        </noscript>
      </head>
      <body className="min-h-full antialiased">
        <a
          href="#conteudo"
          className="fixed top-3 left-3 z-10001 -translate-y-20 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-background transition-transform focus:translate-y-0"
        >
          {copy.a11y.skip}
        </a>
        <Preloader loading={copy.preloader.loading} subtitle={copy.preloader.subtitle} />
        <MotionProvider>
          <SmoothScroll>
            <Background />
            <ScrollProgress />
            {children}
            <ChatLauncher
              strings={copy.chat}
              knowledgeUrl={asset(`/kb/${locale}.json`)}
              contactHref={routes.section(locale, sectionIds.contact)}
              basePath={basePath}
            />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
