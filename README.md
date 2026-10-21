# Ícaro Santos — Portfólio

[![Qualidade e deploy](https://github.com/Icar0S/Portfolio-Base/actions/workflows/deploy.yml/badge.svg)](https://github.com/Icar0S/Portfolio-Base/actions/workflows/deploy.yml)
![Lighthouse](https://img.shields.io/badge/Lighthouse-%E2%89%A595-e0a95e)
![WCAG 2.1 AA](https://img.shields.io/badge/axe--core-WCAG%202.1%20AA-7fc7c4)

Portfólio pessoal de Ícaro Santos de Oliveira — QA Engineer, desenvolvedor fullstack, UI/UX e pesquisador em IA (LLM/RAG).

**Acesse:** https://icar0s.github.io/Portfolio-Base/ · versão em inglês: https://icar0s.github.io/Portfolio-Base/en/

## Stack

- **Next.js (App Router) + TypeScript**, exportado como site estático (`output: "export"`).
- **Tailwind CSS 4**, **Framer Motion** (via `LazyMotion`), **Lenis** (smooth scroll) e **lucide-react**.
- Fontes **Syne**, **DM Sans** e **JetBrains Mono** via `next/font`.
- **Playwright + @axe-core/playwright** (E2E e acessibilidade) e **Lighthouse CI**.
- Publicação no **GitHub Pages** pelo GitHub Actions. Não há backend, banco de dados nem chaves de API.

O assistente **Portfolio AI** (botão no canto inferior direito) também é 100% estático: no build, o
conteúdo de `src/data` vira uma base de conhecimento em JSON (`/kb/pt.json` e `/kb/en.json`), e a
recuperação é feita no navegador com **BM25** — a resposta mostra o trecho e cita a seção de origem.

## Rodar localmente

Requisitos: Node.js 20.9+ (o CI usa o 22).

```bash
npm ci
npm run dev          # desenvolvimento em http://localhost:3000/Portfolio-Base/
npm run build        # gera o site estático em out/
npm start            # serve out/ em http://127.0.0.1:4173/Portfolio-Base/ (como no GitHub Pages)
```

## Onde editar o conteúdo

Todo o texto do site fica em `src/data` — os componentes não precisam ser alterados.
Os textos têm versão `pt` e `en` lado a lado.

| Arquivo                  | Conteúdo                                                                    |
| ------------------------ | --------------------------------------------------------------------------- |
| `src/data/profile.ts`    | nome, palavras do hero, apresentação, e-mails, redes, estatísticas, idiomas |
| `src/data/skills.ts`     | categorias e tecnologias da seção Habilidades e das faixas animadas         |
| `src/data/experience.ts` | linha do tempo: experiência, formação, certificações e atividades           |
| `src/data/projects.ts`   | projetos (cards e páginas de detalhe, com as seções Problema → Resultados)  |
| `src/data/research.ts`   | publicações, linhas de pesquisa e artefatos com DOI                         |
| `src/data/ui.ts`         | textos de interface (menus, botões, títulos de seção, assistente)           |

Trechos entre `**asteriscos duplos**` aparecem em destaque. O primeiro projeto da lista é o destaque
(card largo). Para adicionar um projeto, copie um item de `projects.ts`: a página
`/projetos/<slug>/` e `/en/projects/<slug>/` é gerada automaticamente.

## Foto, currículo e imagens

- **Imagens:** as originais ficam em `assets/` (não são publicadas). Rode `npm run images` para gerar
  as versões WebP otimizadas em `src/assets/images/` (veja os recortes em `scripts/optimize-images.mjs`).
  Para trocar uma captura, substitua o arquivo em `assets/` mantendo o nome e rode o script.
- **Foto do hero:** `assets/Icaro Santos (58).jpg` → `src/assets/images/profile.webp`.
- **Currículos:** `public/cv-icaro-santos.pdf` (PT) e `public/cv-icaro-santos-en.pdf` (EN).
- **Imagem de compartilhamento e ícones:** `npm run og` gera `public/og-image.png` (1200×630),
  `src/app/icon.png` e `src/app/apple-icon.png` (precisa de internet para baixar as fontes).

## Testes e qualidade

```bash
npm run lint         # ESLint
npm run typecheck    # TypeScript
npm run build        # obrigatório antes dos testes
npm run test:e2e     # Playwright: desktop, tablet e mobile
npm run lhci         # Lighthouse CI (Performance, Acessibilidade, Boas Práticas e SEO ≥ 95)
npm run check        # lint + tipos + build + testes
```

Os testes cobrem carregamento sem erros no console, navegação por âncoras e menu mobile, troca de
idioma, filtros de projetos, todas as páginas de detalhe, assistente (respostas, citação, foco e Esc),
links quebrados ou com placeholder, ausência de rolagem horizontal de 320 a 1440 px, metadados/SEO,
404, preloader e auditoria **axe-core WCAG 2.1 AA** em todas as páginas. As capturas de tela de
desktop, tablet e mobile ficam no relatório do Playwright (artefato do CI).

> No Windows, o `next build` grava parte dos arquivos de prefetch com o nome errado (bug do Next.js
> com separadores de caminho). O `scripts/postbuild.mjs` corrige isso automaticamente; no Linux não
> há nada a fazer.

## Deploy

O workflow `.github/workflows/deploy.yml` roda lint, tipos, build, Playwright e Lighthouse em todo
push e pull request. Em push na `main` (ou execução manual), publica `out/` no GitHub Pages.
Na primeira vez, em **Settings → Pages → Build and deployment**, selecione **GitHub Actions**.

O caminho base (`/Portfolio-Base`) está em `next.config.ts`; se o repositório mudar de nome,
ajuste-o lá e em `src/lib/site.ts` (`siteUrl`).

## Pendências para revisar

- `[INSERIR]` URL do Currículo Lattes em `src/data/profile.ts` (`social.lattes`; enquanto for `null`, o ícone não aparece).
- `[CONFIRMAR]` tecnologias que não aparecem no currículo nem nos repositórios: axe-core, Next.js, LangChain e Figma (`src/data/skills.ts`).
- `[CONFIRMAR]` seu papel no DOM-Heal (TCC de Jonnas Christian, UECE) — campo `credit` em `src/data/projects.ts`.
