import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { ui } from "@/data/ui";
import { asset } from "@/lib/site";
import { fontVariables } from "./fonts";
import "./globals.css";

// Com dois root layouts (PT e EN), o 404 precisa de um documento próprio.
export const metadata: Metadata = {
  title: `404 — ${ui.pt.notFound.title}`,
  description: ui.pt.notFound.text,
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  const { pt, en } = ui;

  return (
    <html lang="pt-BR" className={fontVariables}>
      <body className="min-h-screen antialiased">
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid mask-fade-y opacity-50"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/4 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,169,94,0.18),transparent_65%)] blur-2xl"
          />
          <div className="relative text-center">
            <p className="font-display text-2xl font-bold tracking-tight">
              IS<span className="text-accent">.</span>
            </p>
            <p className="mt-10 font-mono text-xs tracking-[0.3em] text-accent uppercase">Erro 404</p>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
              <span className="gradient-text">404</span>
            </h1>
            <p className="mt-6 font-display text-2xl font-semibold text-foreground">{pt.notFound.title}</p>
            <p className="mx-auto mt-3 max-w-md text-muted">{pt.notFound.text}</p>
            <p lang="en" className="mx-auto mt-2 max-w-md text-sm text-muted">
              {en.notFound.title}. {en.notFound.text}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={asset("/")}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-strong"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {pt.notFound.back}
              </a>
              <a
                href={asset("/en/")}
                lang="en"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground glass transition-colors hover:border-surface-border-strong"
              >
                {en.notFound.back}
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
