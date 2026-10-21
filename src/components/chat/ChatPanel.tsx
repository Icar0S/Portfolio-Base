"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Send, Sparkles, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useId,
  useRef,
  useState,
  type Dispatch,
  type FormEvent,
  type RefObject,
  type SetStateAction,
} from "react";
import { easeOut } from "@/components/motion/easing";
import { cn } from "@/lib/cn";
import type { KnowledgeChunk } from "@/lib/knowledge";
import { buildIndex, excerpt, MIN_SCORE, search, type SearchIndex } from "@/lib/search";
import { useFocusTrap } from "@/lib/useFocusTrap";
import type { ChatLink, ChatMessage, ChatStrings } from "./types";

type ChatPanelProps = {
  open: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  strings: ChatStrings;
  knowledgeUrl: string;
  contactHref: string;
  basePath: string;
  returnFocus: RefObject<HTMLButtonElement | null>;
};

let indexPromise: Promise<SearchIndex> | null = null;

function loadIndex(url: string) {
  if (!indexPromise) {
    indexPromise = fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<KnowledgeChunk[]>;
      })
      .then(buildIndex)
      .catch((error: unknown) => {
        indexPromise = null;
        throw error;
      });
  }
  return indexPromise;
}

/** Texto com efeito de digitação (o texto completo vai para leitores de tela de uma vez). */
function TypedText({ text, animate, onDone }: { text: string; animate: boolean; onDone: () => void }) {
  const [count, setCount] = useState(animate ? 0 : text.length);
  const finish = useEffectEvent(onDone);

  useEffect(() => {
    if (!animate) return;
    let frame = 0;
    let current = 0;
    const step = () => {
      current = Math.min(text.length, current + 3);
      setCount(current);
      if (current < text.length) frame = requestAnimationFrame(step);
      else finish();
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [animate, text]);

  return (
    <>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {count < text.length ? (
          <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-accent" />
        ) : null}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}

function SourceLinks({
  source,
  related,
  strings,
  basePath,
  onNavigate,
}: {
  source?: ChatLink;
  related?: ChatLink[];
  strings: ChatStrings;
  basePath: string;
  onNavigate: () => void;
}) {
  if (!source && !related?.length) return null;
  return (
    <div className="mt-3 space-y-2 border-t border-surface-border pt-3">
      {source ? (
        <p className="text-[11px] text-muted">
          <span className="font-mono tracking-wider uppercase">{strings.source}: </span>
          <a
            href={`${basePath}${source.href}`}
            onClick={onNavigate}
            className="inline-flex items-center gap-1 font-medium text-accent-strong hover:underline"
          >
            {source.label}
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </p>
      ) : null}
      {related?.length ? (
        <div>
          <p className="font-mono text-[11px] tracking-wider text-muted uppercase">{strings.related}</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {related.map((link) => (
              <li key={link.href + link.label}>
                <a
                  href={`${basePath}${link.href}`}
                  onClick={onNavigate}
                  className="inline-flex rounded-full border border-surface-border px-2.5 py-1 text-[11px] text-muted-strong transition-colors hover:border-surface-border-strong hover:text-accent-strong"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default function ChatPanel({
  open,
  onClose,
  messages,
  setMessages,
  strings,
  knowledgeUrl,
  contactHref,
  basePath,
  returnFocus,
}: ChatPanelProps) {
  const panel = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const [question, setQuestion] = useState("");
  const [pending, setPending] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const reduceMotion = useReducedMotion();
  const ids = useId();
  const nextId = useRef(0);

  useFocusTrap(panel, open, { onEscape: onClose, returnFocus });

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    loadIndex(knowledgeUrl).catch(() => setLoadFailed(true));
  }, [open, knowledgeUrl]);

  useEffect(() => {
    const node = log.current;
    if (node) node.scrollTo({ top: node.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, pending, reduceMotion]);

  const markTyped = useCallback(
    (id: string) =>
      setMessages((current) =>
        current.map((message) =>
          message.id === id && message.role === "assistant" ? { ...message, typed: true } : message,
        ),
      ),
    [setMessages],
  );

  const ask = async (text: string) => {
    const query = text.trim();
    if (!query || pending) return;
    nextId.current += 1;
    const stamp = String(nextId.current);
    setMessages((current) => [...current, { id: `u-${stamp}`, role: "user", text: query }]);
    setQuestion("");
    setPending(true);

    let reply: ChatMessage;
    try {
      const index = await loadIndex(knowledgeUrl);
      setLoadFailed(false);
      const results = search(index, query, 3);
      const top = results[0];
      if (!top || top.score < MIN_SCORE) {
        reply = {
          id: `a-${stamp}`,
          role: "assistant",
          kind: "fallback",
          text: strings.noAnswer,
          source: { label: strings.contactCta, href: contactHref },
          typed: false,
        };
      } else {
        reply = {
          id: `a-${stamp}`,
          role: "assistant",
          kind: "answer",
          title: top.chunk.title,
          text: excerpt(top.chunk.text),
          source: { label: top.chunk.source, href: top.chunk.href },
          related: results
            .slice(1)
            .filter((result) => result.score >= top.score * 0.45)
            .map((result) => ({ label: result.chunk.title, href: result.chunk.href })),
          typed: false,
        };
      }
    } catch {
      setLoadFailed(true);
      reply = { id: `a-${stamp}`, role: "assistant", kind: "error", text: strings.loadError, typed: false };
    }
    setMessages((current) => [...current, reply]);
    setPending(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void ask(question);
  };

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          ref={panel}
          id="portfolio-ai"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${ids}-title`}
          aria-describedby={`${ids}-subtitle`}
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.28, ease: easeOut }}
          style={{ transformOrigin: "bottom right" }}
          className="fixed right-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-3 z-70 flex h-[min(560px,calc(100dvh-7.5rem))] flex-col overflow-hidden rounded-3xl border border-surface-border shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] glass-strong max-sm:bg-background-elevated! sm:right-6 sm:left-auto sm:w-95"
        >
          <div className="flex items-center gap-3 border-b border-surface-border px-5 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-strong">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id={`${ids}-title`} className="font-display text-base font-bold text-foreground">
                {strings.title}
              </h2>
              <p id={`${ids}-subtitle`} className="truncate text-xs text-muted">
                {strings.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={strings.close}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div
            ref={log}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            data-lenis-prevent=""
            className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-5"
          >
            <div className="flex gap-2.5">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-strong">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <div className="rounded-2xl rounded-tl-md px-4 py-3 text-sm leading-relaxed text-foreground glass">
                <p>{strings.greeting}</p>
                <p className="mt-1.5 text-muted">{strings.greetingHint}</p>
                <ul className="mt-3 flex flex-col items-start gap-2">
                  {strings.suggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        type="button"
                        onClick={() => void ask(suggestion)}
                        disabled={pending}
                        className="rounded-full border border-accent/25 bg-accent/7 px-3 py-1.5 text-left text-xs font-medium text-accent-strong transition-colors hover:border-accent/45 hover:bg-accent/15 disabled:opacity-50"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {messages.map((message) =>
              message.role === "user" ? (
                <div key={message.id} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-md bg-accent/15 px-4 py-2.5 text-sm text-foreground">
                    <span className="sr-only">{strings.you}: </span>
                    {message.text}
                  </p>
                </div>
              ) : (
                <div key={message.id} className="flex gap-2.5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-strong">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <div
                    className={cn(
                      "min-w-0 flex-1 rounded-2xl rounded-tl-md px-4 py-3 text-sm leading-relaxed glass",
                      message.kind === "answer" ? "text-muted-strong" : "text-foreground",
                    )}
                  >
                    <span className="sr-only">{strings.assistant}: </span>
                    {message.title ? (
                      <p className="mb-1 font-semibold text-foreground">{message.title}</p>
                    ) : null}
                    <p>
                      <TypedText
                        text={message.text}
                        animate={!message.typed && !reduceMotion}
                        onDone={() => markTyped(message.id)}
                      />
                    </p>
                    {message.typed || reduceMotion ? (
                      <SourceLinks
                        source={message.source}
                        related={message.related}
                        strings={strings}
                        basePath={basePath}
                        onNavigate={onClose}
                      />
                    ) : null}
                  </div>
                </div>
              ),
            )}

            {pending ? (
              <div className="flex gap-2.5" aria-hidden="true">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-strong">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md px-4 py-3.5 glass">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"
                      style={{ animationDelay: `${dot * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {loadFailed && messages.length === 0 ? (
              <p className="text-xs text-muted">{strings.loadError}</p>
            ) : null}
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-surface-border p-3">
            <label htmlFor={`${ids}-input`} className="sr-only">
              {strings.inputLabel}
            </label>
            <input
              ref={input}
              id={`${ids}-input`}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder={strings.placeholder}
              autoComplete="off"
              maxLength={300}
              className="h-11 min-w-0 flex-1 rounded-full border border-surface-border bg-background/60 px-4 text-sm text-foreground placeholder:text-muted focus:border-surface-border-strong focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
            <button
              type="submit"
              aria-label={strings.send}
              disabled={!question.trim() || pending}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-background transition-colors hover:bg-accent-strong disabled:opacity-50"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
          <p className="px-5 pb-3 font-mono text-[10px] leading-relaxed text-muted">{strings.footnote}</p>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
