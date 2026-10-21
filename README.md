# Icaro Santos de Oliveira — Portfolio

[![Playwright E2E and accessibility](https://github.com/Icar0S/Portfolio-Base/actions/workflows/pages.yml/badge.svg)](https://github.com/Icar0S/Portfolio-Base/actions/workflows/pages.yml)

Portfolio pessoal estático e bilíngue de Icaro Santos de Oliveira, construído com HTML, CSS e JavaScript nativos e publicado no GitHub Pages.

**Acesse:** https://icar0s.github.io/Portfolio-Base/

## Tecnologias

- HTML semântico e CSS mobile-first, sem framework de runtime.
- JavaScript nativo para navegação mobile, tema claro/escuro e animações progressivas.
- Páginas em português (`index.html`) e inglês (`index-en.html`), com alternância de idioma e metadados próprios.
- Playwright para testes E2E em Chromium desktop e mobile.
- axe-core para verificações automatizadas de acessibilidade WCAG 2.1 AA.
- GitHub Actions para executar a suíte e publicar os arquivos estáticos no GitHub Pages.

## Estrutura

```text
.
├── .github/workflows/pages.yml  # testes e deploy no Pages
├── assets/                      # retrato, identidade visual e favicon
├── css/portfolio.css             # estilos, tokens e breakpoints responsivos
├── docs/                         # currículos em PDF
├── scripts/portfolio.js          # interações da página
├── tests/portfolio.spec.js       # E2E, responsividade e axe
├── index.html
├── index-en.html
├── playwright.config.js
├── robots.txt
└── sitemap.xml
```

## Rodar localmente

Requisitos: Node.js 20 ou superior e Python 3.

```bash
npm ci
npx playwright install chromium
npm run test:e2e
```

O Playwright inicia um servidor estático local com `python -m http.server`. Para ver a página manualmente, execute `python -m http.server 8000` na raiz e acesse http://localhost:8000.

## Deploy no GitHub Pages

O workflow `.github/workflows/pages.yml` executa os testes em pull requests e, após sucesso em push para `main` (ou execução manual), publica o site. Na primeira configuração, em **Settings → Pages → Build and deployment**, selecione **GitHub Actions** como fonte.

O site não tem etapa de build: os arquivos HTML, CSS, JavaScript, PDFs e imagens são publicados diretamente.

## Personalização pendente

- Substitua `[INSERIR LINK]` / `[ADD LINK]` nos cards pelos repositórios ou demos públicos dos projetos correspondentes.
- Preencha o URL do Currículo Lattes no campo de contato. O perfil do LinkedIn vem do currículo atualizado.
- Atualize `sitemap.xml`, a URL canônica e as URLs Open Graph se mudar o endereço publicado.

Os itens sem URL ainda são texto informativo, não links vazios ou destinos fictícios. Os currículos atualizados em português e inglês estão em `docs/CurriculoBR_Icaro_09_26.pdf` e `docs/CurriculoEN_Icaro_09_26.pdf`.
