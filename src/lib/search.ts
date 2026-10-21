import type { KnowledgeChunk } from "./knowledge";

/**
 * Recuperação BM25 100% no navegador para o assistente do portfólio.
 * Normaliza acentos, remove stopwords (PT/EN), aplica um stemming leve e expande
 * a consulta com sinônimos do domínio (doutorado ↔ PhD, QA ↔ testes…).
 */

const STOPWORDS = new Set(
  (
    "a o as os um uma uns umas de do da dos das em no na nos nas por pelo pela pelos pelas para pra com sem sob " +
    "e ou mas que se ja nao sim ao aos à às é era ser sao foi tem ter como qual quais quem onde quando porque " +
    "isso isto esse essa este esta ele ela eles elas dele dela seu sua seus suas meu minha voce voces me te " +
    "sobre mais muito muita pouco tambem entao the an and or of to in on at for with by from is are was were be " +
    "been do does did what which who whom where when why how his her he she they them their its it this that " +
    "these those about into than then there here me my you your i we our can could would should will tell " +
    "me fale conte diga explique explain show mostre"
  ).split(" "),
);

/** Termos curtos que importam (siglas). */
const KEEP_SHORT = new Set(["qa", "ia", "ai", "ui", "ux", "ci", "cd", "go", "e2e", "k6", "ml"]);

const SYNONYMS: Record<string, string[]> = {
  doutorado: ["phd", "tese"],
  phd: ["doutorado", "tese"],
  tese: ["doutorado", "phd", "thesi"],
  thesi: ["phd", "doutorado", "tese"],
  mestrado: ["msc", "dissertacao"],
  msc: ["mestrado", "dissertacao"],
  master: ["mestrado", "msc"],
  dissertacao: ["mestrado", "msc"],
  dissertation: ["mestrado", "msc"],
  pesquisa: ["research", "publicacao"],
  research: ["pesquisa", "publication"],
  ferramenta: ["tool", "tecnologia", "stack"],
  tool: ["ferramenta", "technology", "stack"],
  tecnologia: ["technology", "stack", "ferramenta"],
  technology: ["tecnologia", "stack", "tool"],
  stack: ["tecnologia", "technology", "ferramenta"],
  qa: ["teste", "qualidade", "automacao", "testing"],
  teste: ["qa", "test", "testing"],
  test: ["teste", "qa", "testing"],
  testing: ["teste", "qa", "test"],
  qualidade: ["quality", "qa"],
  quality: ["qualidade", "qa"],
  automacao: ["automation", "qa"],
  automation: ["automacao", "qa"],
  ia: ["ai", "llm", "rag"],
  ai: ["ia", "llm", "rag"],
  llm: ["rag", "ia", "ai"],
  contato: ["contact", "email"],
  contact: ["contato", "email"],
  email: ["contato", "contact"],
  publicacao: ["publication", "artigo", "paper"],
  publication: ["publicacao", "paper", "artigo"],
  artigo: ["paper", "publicacao"],
  paper: ["artigo", "publicacao", "publication"],
  trabalho: ["experiencia", "work"],
  experiencia: ["experience", "trabalho", "carreira"],
  experience: ["experiencia", "work", "career"],
  carreira: ["career", "experiencia"],
  career: ["carreira", "experience"],
  empresa: ["experiencia", "trabalho"],
  formacao: ["education", "graduacao"],
  education: ["formacao"],
  graduacao: ["bacharelado", "formacao"],
  faculdade: ["bacharelado", "formacao", "graduacao"],
  frontend: ["react", "interface"],
  backend: ["api", "django", "spring"],
  fullstack: ["full", "stack", "react", "django"],
  certificacao: ["istqb", "certification"],
  certification: ["istqb", "certificacao"],
  idioma: ["language", "ingles", "espanhol"],
  language: ["idioma", "english", "spanish"],
};

export function normalize(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function stem(token: string) {
  if (token.length <= 4) return token;
  if (token.endsWith("oes") || token.endsWith("aes")) return `${token.slice(0, -3)}ao`;
  if (token.endsWith("ais")) return `${token.slice(0, -3)}al`;
  if (token.endsWith("eis")) return `${token.slice(0, -3)}el`;
  if (token.endsWith("ies")) return `${token.slice(0, -3)}y`;
  if (token.endsWith("s") && !token.endsWith("ss")) return token.slice(0, -1);
  return token;
}

export function tokenize(text: string) {
  const tokens = normalize(text).match(/[a-z0-9]+/g) ?? [];
  return tokens
    .filter((token) => (token.length > 2 || KEEP_SHORT.has(token)) && !STOPWORDS.has(token))
    .map(stem);
}

type IndexedDoc = { chunk: KnowledgeChunk; tf: Map<string, number>; length: number };

export type SearchIndex = {
  docs: IndexedDoc[];
  idf: Map<string, number>;
  avgLength: number;
};

/** Título e palavras-chave valem mais que o corpo do texto. */
export function buildIndex(chunks: KnowledgeChunk[]): SearchIndex {
  const docs = chunks.map((chunk) => {
    const tokens = [
      ...tokenize(chunk.title),
      ...tokenize(chunk.title),
      ...tokenize(chunk.keywords ?? ""),
      ...tokenize(chunk.text),
    ];
    const tf = new Map<string, number>();
    for (const token of tokens) tf.set(token, (tf.get(token) ?? 0) + 1);
    return { chunk, tf, length: tokens.length };
  });

  const df = new Map<string, number>();
  for (const doc of docs) for (const token of doc.tf.keys()) df.set(token, (df.get(token) ?? 0) + 1);

  const total = docs.length;
  const idf = new Map<string, number>();
  for (const [token, count] of df) idf.set(token, Math.log(1 + (total - count + 0.5) / (count + 0.5)));

  const avgLength = docs.reduce((sum, doc) => sum + doc.length, 0) / Math.max(1, total);
  return { docs, idf, avgLength };
}

export type SearchResult = { chunk: KnowledgeChunk; score: number };

const K1 = 1.2;
const B = 0.75;

export function search(index: SearchIndex, query: string, limit = 3): SearchResult[] {
  const terms = new Map<string, number>();
  for (const token of tokenize(query)) {
    terms.set(token, Math.max(terms.get(token) ?? 0, 1));
    for (const synonym of SYNONYMS[token] ?? [])
      terms.set(stem(synonym), Math.max(terms.get(stem(synonym)) ?? 0, 0.45));
  }
  if (terms.size === 0) return [];

  const results: SearchResult[] = [];
  for (const doc of index.docs) {
    let score = 0;
    for (const [term, weight] of terms) {
      const frequency = doc.tf.get(term);
      if (!frequency) continue;
      const idf = index.idf.get(term) ?? 0;
      score +=
        weight *
        idf *
        ((frequency * (K1 + 1)) / (frequency + K1 * (1 - B + (B * doc.length) / index.avgLength)));
    }
    if (score > 0) results.push({ chunk: doc.chunk, score: score * (doc.chunk.weight ?? 1) });
  }

  results.sort((a, b) => b.score - a.score);

  // Evita repetir a mesma origem (ex.: várias seções do mesmo projeto).
  const seen = new Set<string>();
  const unique: SearchResult[] = [];
  for (const result of results) {
    const key = result.chunk.href.split("#")[0] + result.chunk.source;
    if (seen.has(key) && unique.length > 0) continue;
    seen.add(key);
    unique.push(result);
    if (unique.length >= limit) break;
  }
  return unique;
}

/** Corta o texto em até `max` caracteres, preferindo o fim de uma frase. */
export function excerpt(text: string, max = 420) {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastStop = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("; "));
  return `${(lastStop > max * 0.5 ? slice.slice(0, lastStop + 1) : slice).trim()}…`;
}

/** Pontuação mínima para considerar que a pergunta tem resposta no portfólio. */
export const MIN_SCORE = 1.4;
