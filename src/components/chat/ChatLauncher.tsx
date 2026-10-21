"use client";

import { MessageCircle, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import type { ChatMessage, ChatStrings } from "./types";

// O painel (busca, UI e base de conhecimento) só é baixado no primeiro clique.
const ChatPanel = dynamic(() => import("./ChatPanel"), { ssr: false });

type ChatLauncherProps = {
  strings: ChatStrings;
  /** URL do JSON da base de conhecimento (com basePath). */
  knowledgeUrl: string;
  /** Link do contato (com basePath) usado quando não há resposta. */
  contactHref: string;
  basePath: string;
};

/** Botão flutuante do assistente "Portfolio AI". */
export function ChatLauncher({ strings, knowledgeUrl, contactHref, basePath }: ChatLauncherProps) {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const button = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        ref={button}
        type="button"
        aria-label={open ? strings.close : strings.launcher}
        aria-expanded={open}
        aria-controls={open ? "portfolio-ai" : undefined}
        onClick={() => {
          setRequested(true);
          setOpen((value) => !value);
        }}
        className="fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-70 flex size-14 items-center justify-center rounded-full bg-accent text-background shadow-[0_8px_32px_-8px_var(--glow)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-[0_12px_40px_-8px_var(--glow)] sm:right-6"
      >
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="size-6" aria-hidden="true" />
        )}
      </button>
      {requested ? (
        <ChatPanel
          open={open}
          onClose={close}
          messages={messages}
          setMessages={setMessages}
          strings={strings}
          knowledgeUrl={knowledgeUrl}
          contactHref={contactHref}
          basePath={basePath}
          returnFocus={button}
        />
      ) : null}
    </>
  );
}
