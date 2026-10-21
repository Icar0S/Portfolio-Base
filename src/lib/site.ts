/** Prefixo do repositório no GitHub Pages (definido em next.config.ts). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** URL pública do site, sem barra final. */
export const siteUrl = "https://icar0s.github.io/Portfolio-Base";

/** Prefixa arquivos de `public/` com o basePath (o next/link faz isso só para rotas). */
export function asset(path: string) {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

/** URL absoluta para metadados (Open Graph, sitemap, canonical). */
export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
