export type ChatLink = { label: string; href: string };

export type ChatMessage =
  | { id: string; role: "user"; text: string }
  | {
      id: string;
      role: "assistant";
      kind: "answer" | "fallback" | "error";
      title?: string;
      text: string;
      source?: ChatLink;
      related?: ChatLink[];
      /** Já terminou a animação de digitação (não repete ao reabrir o painel). */
      typed: boolean;
    };

export type ChatStrings = {
  launcher: string;
  title: string;
  subtitle: string;
  close: string;
  greeting: string;
  greetingHint: string;
  suggestions: string[];
  placeholder: string;
  inputLabel: string;
  send: string;
  loading: string;
  loadError: string;
  source: string;
  related: string;
  noAnswer: string;
  contactCta: string;
  footnote: string;
  you: string;
  assistant: string;
};
