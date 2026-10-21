import { CircleCheck } from "lucide-react";
import Image from "next/image";
import type { Figure } from "@/data/types";
import { t, type Locale } from "@/lib/i18n";

/** Ilustração de uma seção do projeto: captura, fluxo, checklist ou métricas. */
export function FigureView({ figure, locale }: { figure: Figure; locale: Locale }) {
  const caption = figure.caption?.[locale];

  return (
    <figure className="overflow-hidden rounded-2xl glass transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
      {figure.kind === "image" ? (
        <div className="relative aspect-16/10 w-full bg-background-elevated">
          <Image
            src={figure.image}
            alt={figure.alt[locale]}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={figure.fit === "contain" ? "object-contain p-8" : "object-cover object-top"}
          />
        </div>
      ) : null}

      {figure.kind === "flow" ? (
        <ol className="relative space-y-3 p-6 md:p-8">
          <span
            aria-hidden="true"
            className="absolute top-12 bottom-12 left-[2.6rem] w-px bg-linear-to-b from-accent/60 via-accent/30 to-signal/50 md:left-[3.1rem]"
          />
          {figure.steps.map((step, index) => (
            <li key={index} className="relative flex items-center gap-4">
              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-background-elevated font-mono text-xs text-accent-strong">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 rounded-xl border border-surface-border bg-surface px-4 py-3 text-sm font-medium text-foreground">
                {t(step, locale)}
              </span>
            </li>
          ))}
        </ol>
      ) : null}

      {figure.kind === "checks" ? (
        <ul className="space-y-3 p-6 md:p-8">
          {figure.items.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface px-4 py-3 text-sm text-foreground"
            >
              <CircleCheck className="h-5 w-5 shrink-0 text-signal" aria-hidden="true" />
              {t(item, locale)}
            </li>
          ))}
        </ul>
      ) : null}

      {figure.kind === "metrics" ? (
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
          <dl className="relative grid grid-cols-2 gap-6 p-6 sm:grid-cols-3 md:p-8">
            {figure.items.map((item) => (
              <div key={item.label.pt} className="flex flex-col-reverse">
                <dt className="mt-1 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                  {item.label[locale]}
                </dt>
                <dd className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                  <span className="gradient-text">{item.value}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      {caption ? (
        <figcaption className="border-t border-surface-border px-5 py-3 text-sm text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
