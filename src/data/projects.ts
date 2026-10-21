import adotsAdotar from "@/assets/images/adotspets-adotar.webp";
import adotsDashboards from "@/assets/images/adotspets-dashboards.webp";
import adotsDivulgar from "@/assets/images/adotspets-divulgar.webp";
import adotsLogin from "@/assets/images/adotspets-login.webp";
import bdfImage from "@/assets/images/big-data-fortaleza.webp";
import dashAdmin from "@/assets/images/dashboards-web-admin.webp";
import dashCharts from "@/assets/images/dashboards-web-charts.webp";
import dashHome from "@/assets/images/dashboards-web-home.webp";
import fndeImage from "@/assets/images/fnde-antonieta-de-barros.webp";
import sdtImage from "@/assets/images/smartdatatest.webp";
import type { Localized } from "@/lib/i18n";
import type { Project, ProjectCategory } from "./types";

/** Filtros da seção Projetos, na ordem exibida. */
export const projectFilters: { id: "all" | ProjectCategory; label: Localized }[] = [
  { id: "all", label: { pt: "Todos", en: "All" } },
  { id: "qa", label: { pt: "QA & Automação", en: "QA & Automation" } },
  { id: "ia", label: { pt: "IA & LLM", en: "AI & LLM" } },
  { id: "fullstack", label: { pt: "Fullstack", en: "Full Stack" } },
  { id: "uiux", label: { pt: "UI/UX", en: "UI/UX" } },
];

/**
 * Projetos. O primeiro da lista aparece em destaque (largura total).
 * Para trocar uma capa, gere a imagem com `npm run images` e importe-a acima.
 */
export const projects: Project[] = [
  /* ------------------------------ SmartDataTest ------------------------------ */
  {
    slug: "smartdatatest",
    title: "SmartDataTest",
    badge: { pt: "Plataforma de testes com IA", en: "AI-powered testing platform" },
    year: "2025",
    categories: ["ia", "qa", "fullstack", "uiux"],
    context: { pt: "Mestrado · UECE", en: "MSc · UECE" },
    summary: {
      pt: "Plataforma web que integra LLMs e RAG para apoiar testes de qualidade de dados em sistemas de Big Data — da geração de dados sintéticos à validação de acurácia e ao código PySpark.",
      en: "Web platform that brings LLMs and RAG to data quality testing in Big Data systems — from synthetic data generation to accuracy validation and PySpark code.",
    },
    chips: [
      { pt: "Geração de testes com IA", en: "AI test generation" },
      { pt: "RAG", en: "RAG" },
      { pt: "Big Data Quality", en: "Big Data quality" },
      { pt: "Dados sintéticos", en: "Synthetic data" },
    ],
    tech: ["React", "Tailwind CSS", "Flask", "Python", "pandas", "Ollama", "PySpark"],
    links: [
      { kind: "site", href: "https://smart-data-test.vercel.app" },
      { kind: "github", href: "https://github.com/Icar0S/SmartDataTest" },
    ],
    cover: {
      kind: "image",
      image: sdtImage,
      alt: {
        pt: "Tela de login do SmartDataTest com o painel do pipeline de qualidade e indicadores de testes, datasets e cobertura",
        en: "SmartDataTest login screen with the quality pipeline panel and test, dataset and coverage indicators",
      },
    },
    sections: [
      {
        key: "problem",
        title: {
          pt: "Testar dados em Big Data ainda é manual",
          en: "Testing Big Data is still a manual job",
        },
        body: {
          pt: "Pipelines de Big Data recebem volumes e formatos heterogêneos, e as verificações de qualidade costumam ser escritas à mão, script a script. A ideia foi aproximar o conhecimento de testes de dados de quem constrói os pipelines.",
          en: "Big Data pipelines ingest heterogeneous volumes and formats, and quality checks are usually hand-written, one script at a time. The goal was to bring data-testing knowledge closer to the people who build those pipelines.",
        },
        bullets: [
          {
            pt: "Regras de qualidade espalhadas em scripts ad hoc",
            en: "Quality rules scattered across ad-hoc scripts",
          },
          {
            pt: "Pouca disponibilidade de dados de teste realistas",
            en: "Little access to realistic test data",
          },
          {
            pt: "Validação de acurácia feita manualmente contra planilhas de referência",
            en: "Accuracy checks done by hand against reference spreadsheets",
          },
        ],
      },
      {
        key: "solution",
        title: { pt: "LLM + RAG a serviço da qualidade de dados", en: "LLM + RAG for data quality" },
        body: {
          pt: "O SmartDataTest combina um assistente RAG sobre documentação de testes de dados com geradores guiados por LLM. O usuário conversa com a plataforma, envia datasets e recebe código, dados e relatórios prontos para uso.",
          en: "SmartDataTest pairs a RAG assistant over data-testing documentation with LLM-guided generators. Users chat with the platform, upload datasets and get ready-to-use code, data and reports.",
        },
        bullets: [
          {
            pt: "Chat RAG que gera código PySpark de validação a partir de linguagem natural",
            en: "RAG chat that turns natural language into PySpark validation code",
          },
          {
            pt: "Gerador avançado: upload de CSV, JSON ou Parquet, inferência de schema, DSL e código",
            en: "Advanced generator: CSV, JSON or Parquet upload, schema inference, DSL and code",
          },
          {
            pt: "Dados sintéticos com LLM — 14+ tipos de dados e até 1 milhão de linhas",
            en: "LLM-generated synthetic data — 14+ data types and up to 1 million rows",
          },
          {
            pt: "Validação de acurácia contra datasets GOLD, com normalização e relatórios",
            en: "Accuracy validation against GOLD datasets, with normalisation and reports",
          },
        ],
        figure: {
          kind: "image",
          image: sdtImage,
          alt: {
            pt: "Interface do SmartDataTest com o painel do pipeline de qualidade",
            en: "SmartDataTest interface with the quality pipeline panel",
          },
          caption: {
            pt: "Demo pública: pipeline de qualidade com ingestão, schema, checagens, GOLD e relatório",
            en: "Public demo: quality pipeline with ingestion, schema, checks, GOLD and report",
          },
        },
      },
      {
        key: "stack",
        title: { pt: "React, Flask e LLMs plugáveis", en: "React, Flask and pluggable LLMs" },
        body: {
          pt: "Frontend em React com Tailwind CSS e Framer Motion; backend em Python/Flask com API REST modular; provedores de LLM plugáveis — Ollama local e open source, ou APIs em nuvem.",
          en: "React frontend with Tailwind CSS and Framer Motion; Python/Flask backend with a modular REST API; pluggable LLM providers — local, open-source Ollama or cloud APIs.",
        },
        bullets: [
          { pt: "React + Tailwind CSS + Framer Motion", en: "React + Tailwind CSS + Framer Motion" },
          {
            pt: "Flask, pandas, PyArrow e ReportLab para relatórios em PDF",
            en: "Flask, pandas, PyArrow and ReportLab for PDF reports",
          },
          {
            pt: "Ollama (qwen2.5-coder) ou Anthropic Claude como provedores de LLM",
            en: "Ollama (qwen2.5-coder) or Anthropic Claude as LLM providers",
          },
          {
            pt: "Frontend na Vercel e backend em contêiner Docker no Render",
            en: "Frontend on Vercel and a Docker-based backend on Render",
          },
        ],
        figure: {
          kind: "flow",
          steps: [
            "React",
            { pt: "API Flask", en: "Flask API" },
            { pt: "LLM + RAG", en: "LLM + RAG" },
            { pt: "PySpark · dados · PDF", en: "PySpark · data · PDF" },
          ],
          caption: {
            pt: "Fluxo de uma requisição na plataforma",
            en: "How a request flows through the platform",
          },
        },
      },
      {
        key: "quality",
        title: { pt: "Testado como produto, não como protótipo", en: "Tested as a product, not a prototype" },
        body: {
          pt: "Suítes automatizadas cobrem o sistema RAG, os endpoints da API e a validação de acurácia — incluindo cenários de segurança e casos de borda — e rodam em pipeline de CI.",
          en: "Automated suites cover the RAG system, the API endpoints and accuracy validation — including security scenarios and edge cases — and run in a CI pipeline.",
        },
        bullets: [
          {
            pt: "Pytest para unidade e integração do backend (RAG 14/14, acurácia 31/31)",
            en: "Pytest for backend unit and integration tests (RAG 14/14, accuracy 31/31)",
          },
          {
            pt: "Testes de segurança: path traversal e controle de acesso",
            en: "Security tests: path traversal and access control",
          },
          {
            pt: "Testing Library no frontend e CI com GitHub Actions",
            en: "Testing Library on the frontend and CI with GitHub Actions",
          },
        ],
        figure: {
          kind: "checks",
          items: [
            { pt: "Sistema RAG · 14/14", en: "RAG system · 14/14" },
            { pt: "Acurácia de dados · 31/31", en: "Data accuracy · 31/31" },
            { pt: "Formatos CSV · XLSX · Parquet", en: "CSV · XLSX · Parquet formats" },
            { pt: "Path traversal e controle de acesso", en: "Path traversal & access control" },
          ],
          caption: { pt: "Suítes do backend no repositório", en: "Backend suites in the repository" },
        },
      },
      {
        key: "results",
        title: { pt: "Da dissertação para uma ferramenta pública", en: "From dissertation to public tool" },
        body: {
          pt: "O SmartDataTest é a ferramenta de apoio da minha dissertação de mestrado na UECE e está publicado, com demo aberta e código no GitHub.",
          en: "SmartDataTest is the support tool of my MSc dissertation at UECE and is publicly available, with an open demo and code on GitHub.",
        },
        bullets: [
          {
            pt: "Demo pública em smart-data-test.vercel.app",
            en: "Public demo at smart-data-test.vercel.app",
          },
          {
            pt: "Base para a pesquisa de doutorado em testes de sistemas LLM/RAG",
            en: "Groundwork for my PhD research on testing LLM/RAG systems",
          },
        ],
        figure: {
          kind: "metrics",
          items: [
            { value: "886+", label: { pt: "testes", en: "tests" } },
            { value: "106+", label: { pt: "datasets", en: "datasets" } },
            { value: "86%", label: { pt: "cobertura", en: "coverage" } },
          ],
          caption: {
            pt: "Indicadores exibidos no painel da plataforma",
            en: "Indicators shown on the platform dashboard",
          },
        },
      },
    ],
  },

  /* ------------------------ Arquitetura de testes RAG ------------------------ */
  {
    slug: "arquitetura-testes-rag",
    title: { pt: "Arquitetura de testes para RAG", en: "Test architecture for RAG" },
    badge: { pt: "QA para IA · Setor público", en: "QA for AI · Public sector" },
    year: "2026",
    categories: ["qa", "ia"],
    context: { pt: "CAGECE · Time de IA", en: "CAGECE · AI team" },
    summary: {
      pt: "Arquitetura de testes do assistente RAG institucional da CAGECE, com oráculos híbridos — similaridade semântica combinada a guardrails determinísticos — rodando em CI.",
      en: "Test architecture for CAGECE's RAG assistant, built on hybrid oracles — semantic similarity combined with deterministic guardrails — running in CI.",
    },
    chips: [
      { pt: "Oráculos híbridos", en: "Hybrid oracles" },
      { pt: "Regressão semântica", en: "Semantic regression" },
      { pt: "CI contínuo", en: "Continuous CI" },
    ],
    tech: ["Python", "spaCy", "RAG", "Guardrails", "CI/CD"],
    links: [{ kind: "artifact", href: "https://doi.org/10.5281/zenodo.21837636" }],
    cover: { kind: "art", motif: "oracle", icon: "scan-search" },
    sections: [
      {
        key: "problem",
        title: {
          pt: "Como saber se um assistente RAG continua certo?",
          en: "How do you know a RAG assistant is still right?",
        },
        body: {
          pt: "Respostas de LLM variam a cada execução e dependem de documentos que mudam — no caso, normas e regulamentos internos. Comparações exatas de texto não funcionam, e revisões manuais não escalam.",
          en: "LLM answers vary between runs and depend on documents that change — in this case, internal rules and regulations. Exact text comparisons don't work, and manual reviews don't scale.",
        },
        bullets: [
          {
            pt: "Saídas não determinísticas tornam asserts tradicionais frágeis",
            en: "Non-deterministic outputs make traditional asserts brittle",
          },
          {
            pt: "Atualizações regulatórias mudam a resposta correta ao longo do tempo",
            en: "Regulatory updates change the correct answer over time",
          },
          {
            pt: "Um sistema do setor público exige evidência contínua de qualidade",
            en: "A public-sector system needs continuous quality evidence",
          },
        ],
      },
      {
        key: "solution",
        title: { pt: "Oráculos híbridos: semântica + regras", en: "Hybrid oracles: semantics + rules" },
        body: {
          pt: "Projetei uma arquitetura de testes em que cada caso combina similaridade semântica por cosseno (spaCy, limiar 0,85) com guardrails determinísticos — verificações objetivas que a resposta precisa sempre cumprir.",
          en: "I designed a test architecture where each case combines cosine semantic similarity (spaCy, 0.85 threshold) with deterministic guardrails — objective checks every answer must always pass.",
        },
        bullets: [
          {
            pt: "Oráculo semântico com spaCy e limiar calibrado em 0,85",
            en: "Semantic oracle with spaCy and a threshold calibrated at 0.85",
          },
          {
            pt: "Guardrails determinísticos como segunda camada de verificação",
            en: "Deterministic guardrails as a second verification layer",
          },
          {
            pt: "Ativos de teste versionados com Gitflow",
            en: "Test assets versioned with Gitflow",
          },
        ],
        figure: {
          kind: "flow",
          steps: [
            { pt: "Pergunta", en: "Question" },
            { pt: "Assistente RAG", en: "RAG assistant" },
            { pt: "Similaridade ≥ 0,85", en: "Similarity ≥ 0.85" },
            "Guardrails",
            { pt: "Veredito no CI", en: "CI verdict" },
          ],
          caption: {
            pt: "Cada caso de teste passa pelos dois oráculos",
            en: "Every test case goes through both oracles",
          },
        },
      },
      {
        key: "quality",
        title: { pt: "53 casos, três meses de CI", en: "53 cases, three months of CI" },
        body: {
          pt: "A suíte rodou continuamente por três meses, servindo de rede de segurança a cada atualização da base documental, com governança para manter a confiança nos resultados.",
          en: "The suite ran continuously for three months as a safety net for every knowledge-base update, with governance to keep the results trustworthy.",
        },
        bullets: [
          { pt: "53 casos de teste automatizados", en: "53 automated test cases" },
          { pt: "Quarantine lane para testes instáveis (flaky)", en: "Quarantine lane for flaky tests" },
          { pt: "Board de Qualidade para priorização", en: "Quality Board for prioritisation" },
        ],
      },
      {
        key: "results",
        title: { pt: "Regressões reais, artigo aceito", en: "Real regressions, accepted paper" },
        body: {
          pt: "A arquitetura detectou regressões reais após atualizações regulatórias e virou artigo aceito no SAST 2026 (CBSoft), com o artefato também aprovado na trilha de Artefatos.",
          en: "The architecture caught real regressions after regulatory updates and became a paper accepted at SAST 2026 (CBSoft), with the artefact also accepted in the Artefacts track.",
        },
        bullets: [
          { pt: "Artigo aceito no SAST 2026 — CBSoft/ACM", en: "Paper accepted at SAST 2026 — CBSoft/ACM" },
          {
            pt: "Implementação de referência aberta (Apache 2.0) com DOI no Zenodo",
            en: "Open reference implementation (Apache 2.0) with a Zenodo DOI",
          },
        ],
        figure: {
          kind: "metrics",
          items: [
            { value: "53", label: { pt: "casos de teste", en: "test cases" } },
            { value: "96,22%", label: { pt: "aprovação", en: "pass rate" } },
            { value: "3", label: { pt: "meses de CI", en: "months of CI" } },
          ],
          caption: { pt: "Resultados relatados no artigo", en: "Results reported in the paper" },
        },
      },
    ],
  },

  /* --------------------------- Benchmark LLM + RAG --------------------------- */
  {
    slug: "benchmark-llm-rag",
    title: { pt: "Benchmark de LLMs + RAG", en: "LLM + RAG Benchmark" },
    badge: { pt: "Avaliação de LLMs", en: "LLM evaluation" },
    year: "2026",
    categories: ["ia", "qa"],
    context: { pt: "Pesquisa · UECE", en: "Research · UECE" },
    summary: {
      pt: "Pipeline de benchmark que avalia a qualidade das respostas de um sistema RAG 100% local com RAGAS, DeepEval e LLM-as-a-Judge, e consolida tudo em relatórios em PDF.",
      en: "Benchmark pipeline that evaluates the answer quality of a fully local RAG system with RAGAS, DeepEval and LLM-as-a-Judge, consolidating everything into PDF reports.",
    },
    chips: [
      { pt: "Avaliação de LLMs", en: "LLM evaluation" },
      { pt: "Métricas", en: "Metrics" },
      { pt: "Relatórios em PDF", en: "PDF reports" },
    ],
    tech: ["FastAPI", "ChromaDB", "Ollama", "RAGAS", "DeepEval", "Playwright", "Pytest"],
    links: [
      { kind: "github", href: "https://github.com/Icar0S/Evaluating-Answer-Quality-RAG-System" },
      { kind: "artifact", href: "https://doi.org/10.5281/zenodo.21837636" },
    ],
    cover: { kind: "art", motif: "bars", icon: "chart" },
    sections: [
      {
        key: "problem",
        title: {
          pt: "Métricas de RAG não concordam entre si",
          en: "RAG metrics don't agree with each other",
        },
        body: {
          pt: "Ferramentas como RAGAS e DeepEval usam LLMs como juízes, e cada uma mede “qualidade” de um jeito. Sem uma base comum, comparar resultados — ou confiar neles — é difícil.",
          en: "Tools like RAGAS and DeepEval use LLMs as judges, and each measures “quality” differently. Without a common baseline, comparing — or trusting — their results is hard.",
        },
        bullets: [
          {
            pt: "Juízes diferentes produzem notas diferentes para a mesma resposta",
            en: "Different judges score the same answer differently",
          },
          {
            pt: "Avaliar em nuvem expõe dados e gera custo",
            en: "Cloud-based evaluation exposes data and costs money",
          },
          {
            pt: "Faltava acompanhar a evolução das métricas entre execuções",
            en: "There was no way to track metrics across runs",
          },
        ],
      },
      {
        key: "solution",
        title: { pt: "Mesmas respostas, vários juízes", en: "Same answers, several judges" },
        body: {
          pt: "O pipeline gera as respostas do assistente uma única vez e submete exatamente as mesmas respostas ao RAGAS, ao DeepEval e ao JevEval — então a comparação é entre métodos, não entre rodadas.",
          en: "The pipeline generates the assistant's answers once and submits exactly the same answers to RAGAS, DeepEval and JevEval — so the comparison is between methods, not runs.",
        },
        bullets: [
          {
            pt: "Assistente RAG local com Ollama e embeddings nomic-embed-text",
            en: "Local RAG assistant with Ollama and nomic-embed-text embeddings",
          },
          {
            pt: "RAGAS, DeepEval e JevEval julgando o mesmo golden dataset",
            en: "RAGAS, DeepEval and JevEval judging the same golden dataset",
          },
          { pt: "LLM-as-a-Judge com Human-in-the-Loop", en: "LLM-as-a-Judge with Human-in-the-Loop" },
          {
            pt: "Relatório consolidado em PDF a cada execução, com histórico",
            en: "Consolidated PDF report on every run, with history",
          },
        ],
      },
      {
        key: "stack",
        title: { pt: "Tudo local, de ponta a ponta", en: "Fully local, end to end" },
        body: {
          pt: "Backend em FastAPI com ChromaDB como vector store e modelos locais via Ollama (qwen3 ou gemma3). O frontend tem chat, monitor de recursos em tempo real via WebSocket e homepage com estatísticas.",
          en: "FastAPI backend with ChromaDB as the vector store and local models through Ollama (qwen3 or gemma3). The frontend includes a chat, a real-time resource monitor over WebSocket and a stats homepage.",
        },
        bullets: [
          { pt: "FastAPI + Uvicorn, Pydantic e ChromaDB", en: "FastAPI + Uvicorn, Pydantic and ChromaDB" },
          { pt: "Ingestão de PDFs com PyMuPDF", en: "PDF ingestion with PyMuPDF" },
          { pt: "Monitor de CPU, RAM e GPU via WebSocket", en: "CPU, RAM and GPU monitor over WebSocket" },
          {
            pt: "Provider remoto opcional, alternável em tempo de execução",
            en: "Optional remote provider, switchable at runtime",
          },
        ],
        figure: {
          kind: "flow",
          steps: [
            "PDFs",
            { pt: "Ingestão + ChromaDB", en: "Ingestion + ChromaDB" },
            "FastAPI + Ollama",
            "RAGAS · DeepEval · JevEval",
            { pt: "Relatório PDF", en: "PDF report" },
          ],
          caption: { pt: "Do documento ao relatório de qualidade", en: "From document to quality report" },
        },
      },
      {
        key: "quality",
        title: { pt: "Quatro suítes, do hermético ao juiz", en: "Four suites, from hermetic to judge" },
        body: {
          pt: "A arquitetura separa o que é determinístico do que depende do modelo: suítes herméticas rodam no CI a cada push; as de qualidade de resposta rodam localmente, com GPU.",
          en: "The architecture separates what is deterministic from what depends on the model: hermetic suites run in CI on every push; answer-quality suites run locally on a GPU.",
        },
        bullets: [
          {
            pt: "Pytest hermético (sem rede e sem GPU) para API e gerador de relatório",
            en: "Hermetic Pytest (no network, no GPU) for the API and report generator",
          },
          {
            pt: "Playwright E2E para chat, monitor e seletor de provider",
            en: "Playwright E2E for chat, monitor and provider switcher",
          },
          { pt: "Controles do juiz no RAGAS e no DeepEval", en: "Judge controls for RAGAS and DeepEval" },
          { pt: "Estudo de mutação com protocolo próprio", en: "Mutation study with its own protocol" },
        ],
        figure: {
          kind: "checks",
          items: [
            { pt: "API e relatório · Pytest", en: "API & report · Pytest" },
            { pt: "Interface · Playwright E2E", en: "Interface · Playwright E2E" },
            { pt: "Qualidade de resposta · RAGAS", en: "Answer quality · RAGAS" },
            { pt: "Qualidade de resposta · DeepEval", en: "Answer quality · DeepEval" },
          ],
          caption: { pt: "As quatro suítes do benchmark", en: "The benchmark's four suites" },
        },
      },
      {
        key: "results",
        title: { pt: "Benchmark reprodutível e aberto", en: "Reproducible, open benchmark" },
        body: {
          pt: "É a implementação de referência aberta do artigo aceito no SAST 2026, publicada sob Apache 2.0 com DOI no Zenodo.",
          en: "It is the open reference implementation of the paper accepted at SAST 2026, released under Apache 2.0 with a Zenodo DOI.",
        },
        bullets: [
          {
            pt: "Artefato aceito na trilha de Artefatos do SAST 2026",
            en: "Artefact accepted in the SAST 2026 Artefacts track",
          },
          {
            pt: "Execução completa com um único script e histórico de relatórios",
            en: "Full run with a single script and a report history",
          },
        ],
      },
    ],
  },

  /* ------------------------------- ERP Protheus ------------------------------- */
  {
    slug: "erp-protheus",
    title: { pt: "Qualidade contínua no ERP Protheus", en: "Continuous quality for Protheus ERP" },
    badge: { pt: "Automação de testes · ERP", en: "Test automation · ERP" },
    year: "2025",
    categories: ["qa"],
    context: { pt: "CAGECE · Time de Qualidade", en: "CAGECE · Quality team" },
    summary: {
      pt: "Transição de validações manuais ad hoc para um programa de qualidade contínua multicamada no ERP Protheus — UI com TIR, API com Playwright, relatórios Allure e Jenkins.",
      en: "From ad-hoc manual validation to a multi-layer continuous quality programme for the Protheus ERP — UI with TIR, API with Playwright, Allure reports and Jenkins.",
    },
    chips: [
      { pt: "Qualidade contínua", en: "Continuous quality" },
      { pt: "Pipeline-as-code", en: "Pipeline-as-code" },
      { pt: "Testes de API", en: "API testing" },
    ],
    tech: ["TIR", "Playwright", "Allure", "Jenkins", "Gitflow"],
    links: [],
    cover: { kind: "art", motif: "pipeline", icon: "workflow" },
    sections: [
      {
        key: "problem",
        title: { pt: "Validação manual em um ERP legado", en: "Manual validation in a legacy ERP" },
        body: {
          pt: "A folha de pagamento depende de rotinas críticas do Protheus, e cada atualização era validada manualmente, de forma ad hoc — um processo lento, difícil de repetir e sem histórico.",
          en: "Payroll depends on critical Protheus routines, and every update was validated by hand, ad hoc — slow, hard to repeat and leaving no history.",
        },
        bullets: [
          {
            pt: "Rotinas críticas validadas à mão a cada release",
            en: "Critical routines checked by hand every release",
          },
          { pt: "Sem evidência automatizada de regressão", en: "No automated regression evidence" },
          {
            pt: "Conhecimento de teste concentrado em pessoas, não em código",
            en: "Test knowledge held by people, not code",
          },
        ],
      },
      {
        key: "solution",
        title: { pt: "Um programa de qualidade em camadas", en: "A layered quality programme" },
        body: {
          pt: "Conduzi a transição para um programa de qualidade contínua: automação de UI com TIR, testes de API com Playwright, relatórios Allure e pipelines Jenkins como código.",
          en: "I led the move to a continuous quality programme: UI automation with TIR, API testing with Playwright, Allure reports and Jenkins pipelines as code.",
        },
        bullets: [
          { pt: "TIR para automação da interface do Protheus", en: "TIR for Protheus UI automation" },
          { pt: "Playwright para testes de API", en: "Playwright for API testing" },
          { pt: "Allure para relatórios navegáveis", en: "Allure for browsable reports" },
          { pt: "Jenkins com pipeline-as-code", en: "Jenkins with pipeline-as-code" },
        ],
        figure: {
          kind: "flow",
          steps: [
            "Commit",
            { pt: "Jenkins (pipeline-as-code)", en: "Jenkins (pipeline-as-code)" },
            "UI · TIR",
            "API · Playwright",
            { pt: "Relatório Allure", en: "Allure report" },
          ],
          caption: { pt: "Camadas de teste no pipeline", en: "Test layers in the pipeline" },
        },
      },
      {
        key: "quality",
        title: { pt: "Governança para a suíte não envelhecer", en: "Governance so the suite doesn't rot" },
        body: {
          pt: "Além dos testes, estruturei a governança dos ativos de teste para manter a suíte confiável à medida que cresce.",
          en: "Beyond the tests, I set up governance for test assets to keep the suite reliable as it grows.",
        },
        bullets: [
          { pt: "Gitflow para ativos de teste", en: "Gitflow for test assets" },
          { pt: "Board de Qualidade para priorização", en: "Quality Board for prioritisation" },
          { pt: "Quarantine lane para testes instáveis", en: "Quarantine lane for flaky tests" },
          { pt: "Gestão explícita da dívida técnica de teste", en: "Explicit management of test debt" },
        ],
      },
      {
        key: "results",
        title: {
          pt: "Rotinas críticas sob teste contínuo",
          en: "Critical routines under continuous testing",
        },
        body: {
          pt: "O programa automatizou mais de 30 rotinas críticas de folha de pagamento e mais de 1.300 testes de API, e virou relato de experiência no VEM 2026 (CBSoft).",
          en: "The programme automated 30+ critical payroll routines and 1,300+ API tests, and became an experience report at VEM 2026 (CBSoft).",
        },
        bullets: [
          {
            pt: "Relato de experiência publicado no VEM 2026 — CBSoft",
            en: "Experience report published at VEM 2026 — CBSoft",
          },
        ],
        figure: {
          kind: "metrics",
          items: [
            { value: "30+", label: { pt: "rotinas críticas", en: "critical routines" } },
            { value: "1.300+", label: { pt: "testes de API", en: "API tests" } },
          ],
          caption: { pt: "Automação no Time de Qualidade", en: "Automation in the Quality team" },
        },
      },
    ],
  },

  /* --------------------------- Antonieta de Barros --------------------------- */
  {
    slug: "antonieta-de-barros",
    title: { pt: "Plataforma Antonieta de Barros", en: "Antonieta de Barros Platform" },
    badge: { pt: "Governança de dados · FNDE", en: "Data governance · FNDE" },
    year: "2022–25",
    categories: ["qa"],
    context: { pt: "GREat · UFC", en: "GREat · UFC" },
    summary: {
      pt: "Liderança do time de QA da plataforma de governança de dados do FNDE, que une dados e IA para apoiar políticas públicas — com automação E2E em Playwright e testes de API em Pytest no GitLab CI.",
      en: "Led the QA team for FNDE's data governance platform, which combines data and AI to support public policy — with Playwright E2E automation and Pytest API tests in GitLab CI.",
    },
    chips: [
      { pt: "Liderança de QA", en: "QA leadership" },
      { pt: "Testes E2E", en: "E2E testing" },
      { pt: "CI/CD", en: "CI/CD" },
    ],
    tech: ["Playwright", "Pytest", "GitLab CI", "Python"],
    links: [],
    cover: {
      kind: "image",
      image: fndeImage,
      alt: {
        pt: "Página inicial da Plataforma Antonieta de Barros, com o retrato de Antonieta de Barros",
        en: "Home page of the Antonieta de Barros Platform, featuring a portrait of Antonieta de Barros",
      },
    },
    sections: [
      {
        key: "problem",
        title: { pt: "Uma plataforma pública, muitas frentes", en: "One public platform, many fronts" },
        body: {
          pt: "A Plataforma Antonieta de Barros une dados e ferramentas de inteligência artificial para melhorar o desenho, a execução e o acompanhamento de políticas públicas do FNDE. Com tantos módulos, qualidade precisava de estrutura.",
          en: "The Antonieta de Barros Platform combines data and AI tools to improve the design, delivery and monitoring of FNDE's public policies. With so many modules, quality needed structure.",
        },
        bullets: [
          {
            pt: "Módulos de dados, obras, painéis gerenciais, programas e ações",
            en: "Modules for data, construction works, management dashboards, programmes and actions",
          },
          { pt: "Acesso integrado ao login gov.br", en: "Sign-in integrated with gov.br" },
          {
            pt: "Entregas frequentes exigindo regressão confiável",
            en: "Frequent releases requiring reliable regression",
          },
        ],
        figure: {
          kind: "image",
          image: fndeImage,
          alt: {
            pt: "Página inicial da Plataforma Antonieta de Barros",
            en: "Home page of the Antonieta de Barros Platform",
          },
          caption: { pt: "Plataforma de Governança de Dados do FNDE", en: "FNDE's Data Governance Platform" },
        },
      },
      {
        key: "solution",
        title: { pt: "Estruturar o time e a automação", en: "Structuring the team and the automation" },
        body: {
          pt: "Liderei o time de QA e estruturei a automação: testes E2E com Playwright e testes de API com Pytest, integrados ao pipeline de CI/CD no GitLab.",
          en: "I led the QA team and set up the automation: Playwright E2E tests and Pytest API tests, integrated into the GitLab CI/CD pipeline.",
        },
        bullets: [
          {
            pt: "Estratégia de testes e liderança do time de QA",
            en: "Test strategy and QA team leadership",
          },
          { pt: "Automação E2E com Playwright", en: "E2E automation with Playwright" },
          { pt: "Testes de API com Pytest", en: "API testing with Pytest" },
        ],
      },
      {
        key: "stack",
        title: { pt: "Testes dentro do pipeline", en: "Tests inside the pipeline" },
        body: {
          pt: "As suítes rodam no GitLab CI, para que cada entrega carregue evidência automatizada de qualidade.",
          en: "The suites run in GitLab CI, so every delivery carries automated quality evidence.",
        },
        bullets: [
          { pt: "GitLab CI/CD como orquestrador", en: "GitLab CI/CD as the orchestrator" },
          { pt: "Python + Pytest para a camada de API", en: "Python + Pytest for the API layer" },
          { pt: "Playwright para os fluxos de ponta a ponta", en: "Playwright for end-to-end flows" },
        ],
        figure: {
          kind: "flow",
          steps: [
            "Merge request",
            "GitLab CI",
            "API · Pytest",
            "E2E · Playwright",
            { pt: "Evidência", en: "Evidence" },
          ],
          caption: {
            pt: "Testes automatizados no fluxo de entrega",
            en: "Automated tests in the delivery flow",
          },
        },
      },
    ],
  },

  /* ---------------------------- Big Data Fortaleza ---------------------------- */
  {
    slug: "big-data-fortaleza",
    title: { pt: "Plataforma Big Data Fortaleza", en: "Big Data Fortaleza Platform" },
    badge: { pt: "Big Data · Prefeitura de Fortaleza", en: "Big Data · City of Fortaleza" },
    year: "2022–25",
    categories: ["qa", "fullstack"],
    context: { pt: "GREat · UFC · Iplanfor", en: "GREat · UFC · Iplanfor" },
    summary: {
      pt: "Processo de testes da plataforma de suporte a políticas públicas baseadas em dados e IA da Prefeitura de Fortaleza — funcionais, integração, API, carga e segurança.",
      en: "Testing process for the City of Fortaleza's platform supporting data- and AI-driven public policy — functional, integration, API, load and security testing.",
    },
    chips: [
      { pt: "Processo de testes", en: "Testing process" },
      { pt: "Carga & segurança", en: "Load & security" },
      { pt: "Big Data", en: "Big Data" },
    ],
    tech: ["JUnit 5", "Testcontainers", "Postman", "JMeter", "Locust", "OWASP ZAP", "React", "Spring"],
    links: [{ kind: "paper", href: "https://doi.org/10.5220/0013290500003929" }],
    cover: {
      kind: "image",
      image: bdfImage,
      alt: {
        pt: "Página inicial da plataforma Big Data Fortaleza: suporte a políticas públicas baseadas em dados e inteligência artificial",
        en: "Big Data Fortaleza home page: support for public policy based on data and artificial intelligence",
      },
    },
    sections: [
      {
        key: "problem",
        title: { pt: "Dados públicos exigem confiança", en: "Public data demands trust" },
        body: {
          pt: "A Big Data Fortaleza é uma plataforma de suporte a políticas públicas baseadas em dados e inteligência artificial. Para gestores confiarem nos painéis, cada camada — dos dados à interface — precisava ser testada.",
          en: "Big Data Fortaleza is a platform that supports public policy based on data and artificial intelligence. For managers to trust the dashboards, every layer — from data to interface — had to be tested.",
        },
        bullets: [
          { pt: "Dados de várias fontes da prefeitura", en: "Data from many city sources" },
          { pt: "Painéis usados em decisões de gestão", en: "Dashboards used for management decisions" },
          { pt: "Requisitos de desempenho e segurança", en: "Performance and security requirements" },
        ],
        figure: {
          kind: "image",
          image: bdfImage,
          alt: { pt: "Página inicial da Big Data Fortaleza", en: "Big Data Fortaleza home page" },
          caption: { pt: "Big Data Fortaleza · Iplanfor", en: "Big Data Fortaleza · Iplanfor" },
        },
      },
      {
        key: "solution",
        title: { pt: "Um processo de testes completo", en: "A complete testing process" },
        body: {
          pt: "Estruturei o processo de testes da plataforma, cobrindo diferentes níveis e tipos de teste — do unitário à segurança.",
          en: "I structured the platform's testing process, covering different test levels and types — from unit to security.",
        },
        bullets: [
          { pt: "Testes funcionais e exploratórios", en: "Functional and exploratory testing" },
          {
            pt: "Unitários e de integração com JUnit 5 e Testcontainers/Docker",
            en: "Unit and integration tests with JUnit 5 and Testcontainers/Docker",
          },
          { pt: "Testes de API com Postman", en: "API testing with Postman" },
          {
            pt: "Carga com JMeter e Locust; segurança com OWASP ZAP",
            en: "Load with JMeter and Locust; security with OWASP ZAP",
          },
        ],
        figure: {
          kind: "flow",
          steps: [
            { pt: "Unidade · JUnit 5", en: "Unit · JUnit 5" },
            { pt: "Integração · Testcontainers", en: "Integration · Testcontainers" },
            "API · Postman",
            { pt: "Carga · JMeter/Locust", en: "Load · JMeter/Locust" },
            { pt: "Segurança · OWASP ZAP", en: "Security · OWASP ZAP" },
          ],
          caption: { pt: "Níveis e tipos de teste do processo", en: "Test levels and types in the process" },
        },
      },
      {
        key: "stack",
        title: { pt: "Também do lado do código", en: "On the code side, too" },
        body: {
          pt: "Além dos testes, atuei no GREat como desenvolvedor full stack júnior: React no front-end, Spring com PostgreSQL no back-end e microsserviços em Go e Python na AWS (EC2).",
          en: "Beyond testing, I worked at GREat as a junior full stack developer: React on the front end, Spring with PostgreSQL on the back end and Go/Python microservices on AWS (EC2).",
        },
        bullets: [
          { pt: "React no front-end", en: "React on the front end" },
          { pt: "Spring + PostgreSQL no back-end", en: "Spring + PostgreSQL on the back end" },
          {
            pt: "Microsserviços em Go e Python na AWS (EC2)",
            en: "Go and Python microservices on AWS (EC2)",
          },
        ],
      },
      {
        key: "results",
        title: { pt: "Processo publicado no ICEIS 2025", en: "Process published at ICEIS 2025" },
        body: {
          pt: "O processo de testes e seus resultados de melhoria de qualidade foram publicados no ICEIS 2025 e ganharam versão estendida em capítulo do LNBIP (Springer).",
          en: "The testing process and its quality improvements were published at ICEIS 2025 and extended into a book chapter in LNBIP (Springer).",
        },
        bullets: [
          { pt: "Artigo no ICEIS 2025 — vol. 2, pp. 227–236", en: "ICEIS 2025 paper — vol. 2, pp. 227–236" },
          {
            pt: "Capítulo estendido no LNBIP, Springer (no prelo)",
            en: "Extended chapter in LNBIP, Springer (to appear)",
          },
        ],
      },
    ],
  },

  /* --------------------------------- DOM-Heal --------------------------------- */
  {
    slug: "dom-heal",
    title: "DOM-Heal",
    badge: { pt: "Biblioteca de self-healing", en: "Self-healing library" },
    year: "2025",
    categories: ["qa"],
    context: { pt: "Pesquisa · UECE", en: "Research · UECE" },
    summary: {
      pt: "Biblioteca de self-healing para testes E2E que recupera automaticamente seletores quebrados após mudanças na interface, com matching fuzzy e log de alterações.",
      en: "Self-healing library for E2E tests that automatically recovers broken selectors after UI changes, using fuzzy matching and a change log.",
    },
    chips: [
      { pt: "Self-healing", en: "Self-healing" },
      { pt: "Testes E2E", en: "E2E testing" },
      { pt: "Resiliência", en: "Resilience" },
    ],
    tech: ["Python", "Selenium", "Fuzzy matching", "CLI"],
    links: [{ kind: "github", href: "https://github.com/jonnaschristian/dom-heal" }],
    cover: { kind: "art", motif: "tree", icon: "wand" },
    // [CONFIRMAR] Descreva seu papel no projeto (coorientação, testes, contribuição de código…).
    credit: {
      pt: "Desenvolvido como TCC de Jonnas Christian Sousa de Paiva (Ciência da Computação, UECE), com orientação do Prof. Dr. Ismayle S. Santos, em colaboração no grupo de pesquisa.",
      en: "Built as the undergraduate thesis of Jonnas Christian Sousa de Paiva (Computer Science, UECE), advised by Prof. Dr. Ismayle S. Santos, in collaboration within the research group.",
    },
    sections: [
      {
        key: "problem",
        title: {
          pt: "Seletores quebram, testes falham à toa",
          en: "Selectors break, tests fail for nothing",
        },
        body: {
          pt: "Pequenas mudanças no front-end — um id renomeado, uma classe nova — quebram seletores e derrubam suítes E2E inteiras, mesmo quando a funcionalidade continua correta.",
          en: "Small front-end changes — a renamed id, a new class — break selectors and take down whole E2E suites, even when the feature still works.",
        },
        bullets: [
          { pt: "Falsos negativos por mudanças cosméticas", en: "False failures from cosmetic changes" },
          { pt: "Manutenção manual de seletores a cada release", en: "Manual selector upkeep every release" },
        ],
      },
      {
        key: "solution",
        title: { pt: "Encontrar o elemento mais parecido", en: "Finding the most similar element" },
        body: {
          pt: "O DOM-Heal extrai o DOM atual da página, compara cada seletor salvo com os elementos existentes por matching fuzzy (id, name, class e XPath) e atualiza o arquivo de seletores automaticamente.",
          en: "DOM-Heal extracts the page's current DOM, compares every stored selector with the existing elements through fuzzy matching (id, name, class and XPath) and updates the selector file automatically.",
        },
        bullets: [
          {
            pt: "Matching fuzzy com boosts por tipo de atributo",
            en: "Fuzzy matching with per-attribute boosts",
          },
          { pt: "Atualização automática do JSON de seletores", en: "Automatic update of the selector JSON" },
          {
            pt: "Independente de framework: Cypress, Selenium, Playwright ou Robot",
            en: "Framework-agnostic: Cypress, Selenium, Playwright or Robot",
          },
        ],
        figure: {
          kind: "flow",
          steps: [
            { pt: "JSON de seletores", en: "Selector JSON" },
            "Extractor · Selenium",
            "Comparator · fuzzy",
            "Healing",
            { pt: "JSON atualizado + log", en: "Updated JSON + log" },
          ],
          caption: { pt: "Ciclo de self-healing", en: "Self-healing cycle" },
        },
      },
      {
        key: "quality",
        title: { pt: "Rastreabilidade em cada correção", en: "Traceability for every fix" },
        body: {
          pt: "Cada ajuste vira evidência: o arquivo ElementosAlterados.json registra seletor antigo, sugestão, pontuação de similaridade e motivo, para revisão humana.",
          en: "Every fix becomes evidence: ElementosAlterados.json records the old selector, the suggestion, the similarity score and the reason, for human review.",
        },
        bullets: [
          {
            pt: "Exemplo: #email → #input-email (score 0,88)",
            en: "Example: #email → #input-email (score 0.88)",
          },
          { pt: "Um JSON por página, para máxima precisão", en: "One JSON per page for maximum precision" },
        ],
      },
    ],
  },

  /* --------------------------------- AdotsPets --------------------------------- */
  {
    slug: "adotspets",
    title: "AdotsPets",
    badge: { pt: "Plataforma web · Adoção de pets", en: "Web platform · Pet adoption" },
    year: "2023",
    categories: ["fullstack", "uiux"],
    context: { pt: "Projeto pessoal", en: "Personal project" },
    summary: {
      pt: "Plataforma web de cadastro e pedidos de adoção de pets, com filtros por cidade e raça, gestão dos próprios anúncios e dashboards de adoções.",
      en: "Web platform for listing pets and handling adoption requests, with city and breed filters, listing management and adoption dashboards.",
    },
    chips: [
      { pt: "Cadastro de pets", en: "Pet listings" },
      { pt: "Filtros", en: "Filters" },
      { pt: "Dashboards", en: "Dashboards" },
    ],
    tech: ["Python", "Django", "HTML", "CSS", "JavaScript"],
    links: [{ kind: "github", href: "https://github.com/Icar0S/plataforma-AdotsPets" }],
    cover: {
      kind: "image",
      image: adotsLogin,
      alt: {
        pt: "Tela de login do AdotsPets com o logotipo de um cão e um gato formando um coração",
        en: "AdotsPets login screen with a logo of a dog and a cat forming a heart",
      },
    },
    sections: [
      {
        key: "problem",
        title: {
          pt: "Adoção depende de encontrar o pet certo",
          en: "Adoption depends on finding the right pet",
        },
        body: {
          pt: "Quem resgata animais precisa divulgá-los e acompanhar pedidos; quem quer adotar precisa encontrar pets perto de casa.",
          en: "Rescuers need to list animals and track requests; adopters need to find pets close to home.",
        },
        bullets: [
          { pt: "Divulgação espalhada em redes sociais", en: "Listings scattered across social media" },
          {
            pt: "Pouca visibilidade sobre pedidos de adoção",
            en: "Little visibility into adoption requests",
          },
        ],
        figure: {
          kind: "image",
          image: adotsDivulgar,
          alt: {
            pt: "Formulário “Quero divulgar” com foto, nome, descrição, estado, cidade, telefone e tags do pet",
            en: "“Quero divulgar” form with the pet's photo, name, description, state, city, phone and tags",
          },
          caption: { pt: "Cadastro de um pet para adoção", en: "Listing a pet for adoption" },
        },
      },
      {
        key: "solution",
        title: { pt: "Divulgar, encontrar e acompanhar", en: "List, find and follow up" },
        body: {
          pt: "Uma plataforma única com cadastro de pets, busca com filtros e gestão dos anúncios e dos pedidos de adoção.",
          en: "A single platform for pet listings, filtered search and management of listings and adoption requests.",
        },
        bullets: [
          {
            pt: "Cadastro com foto, descrição, cidade e tags",
            en: "Listings with photo, description, city and tags",
          },
          { pt: "Busca com filtros por cidade e raça", en: "Search with city and breed filters" },
          {
            pt: "Gestão dos próprios pets e do status de adoção",
            en: "Manage your pets and their adoption status",
          },
        ],
        figure: {
          kind: "image",
          image: adotsAdotar,
          alt: {
            pt: "Lista “Quero adotar” com fotos, nomes, raças, status e cidades dos pets e filtros por cidade e raça",
            en: "“Quero adotar” list with pet photos, names, breeds, status and cities, plus city and breed filters",
          },
          caption: { pt: "Busca de pets com filtros", en: "Pet search with filters" },
        },
      },
      {
        key: "stack",
        title: { pt: "Django de ponta a ponta", en: "Django end to end" },
        body: {
          pt: "Aplicação em Python com Django: autenticação, templates renderizados no servidor e páginas de dashboard com gráficos de adoções por raça.",
          en: "A Python/Django application: authentication, server-rendered templates and dashboard pages with adoption charts by breed.",
        },
        bullets: [
          { pt: "Autenticação e cadastro de usuários", en: "User sign-up and authentication" },
          { pt: "Dashboards de adoções por raça", en: "Adoption dashboards by breed" },
        ],
        figure: {
          kind: "image",
          image: adotsDashboards,
          alt: {
            pt: "Gráficos de quantidade de adoções e de adoções confirmadas por raça",
            en: "Charts of adoptions and confirmed adoptions by breed",
          },
          caption: { pt: "Dashboards de adoções", en: "Adoption dashboards" },
        },
      },
    ],
  },

  /* ---------------------------- Dashboards Django ---------------------------- */
  {
    slug: "dashboards-django",
    title: { pt: "Dashboards com Django", en: "Django Dashboards" },
    badge: { pt: "Dashboards analíticos", en: "Analytics dashboards" },
    year: "2022",
    categories: ["fullstack"],
    context: { pt: "Etice · Treinamento", en: "Etice · Training" },
    summary: {
      pt: "Painéis web com Django e gráficos interativos — faturamento, despesas, produtos mais vendidos e destaques do mês —, base do trabalho com dashboards analíticos na Etice.",
      en: "Web dashboards with Django and interactive charts — revenue, expenses, best-selling products and monthly highlights — the groundwork for my analytics dashboards at Etice.",
    },
    chips: [
      { pt: "Dashboards", en: "Dashboards" },
      { pt: "Django Admin", en: "Django Admin" },
      { pt: "Gráficos interativos", en: "Interactive charts" },
    ],
    tech: ["Python", "Django", "Chart.js", "SQLite", "JavaScript"],
    links: [{ kind: "github", href: "https://github.com/Icar0S/Dashboards-Web" }],
    cover: {
      kind: "image",
      image: dashHome,
      alt: {
        pt: "Dashboard escuro com indicadores de faturamento, vendas e despesas e gráficos mensais",
        en: "Dark dashboard with revenue, sales and expense indicators and monthly charts",
      },
    },
    sections: [
      {
        key: "problem",
        title: { pt: "Transformar dados em decisões", en: "Turning data into decisions" },
        body: {
          pt: "Gestores precisam enxergar faturamento, despesas e desempenho de vendas sem abrir planilhas.",
          en: "Managers need to see revenue, expenses and sales performance without opening spreadsheets.",
        },
        bullets: [
          { pt: "Indicadores espalhados em planilhas", en: "Indicators scattered across spreadsheets" },
          { pt: "Pouca visão de tendência mês a mês", en: "Little month-over-month visibility" },
        ],
      },
      {
        key: "solution",
        title: { pt: "Indicadores e gráficos em um só painel", en: "Indicators and charts in one dashboard" },
        body: {
          pt: "Painel com cards de indicadores e gráficos de faturamento mensal, despesas, produtos mais vendidos e funcionários do mês.",
          en: "A dashboard with indicator cards and charts for monthly revenue, expenses, best-selling products and employees of the month.",
        },
        bullets: [
          { pt: "Cards de faturamento, vendas e despesas", en: "Revenue, sales and expense cards" },
          {
            pt: "Gráficos de barras, linhas, rosca e área polar",
            en: "Bar, line, doughnut and polar area charts",
          },
          { pt: "Visual escuro com cards de destaque", en: "Dark look with highlight cards" },
        ],
        figure: {
          kind: "image",
          image: dashCharts,
          alt: {
            pt: "Gráficos de produtos mais vendidos e funcionários do mês",
            en: "Charts of best-selling products and employees of the month",
          },
          caption: {
            pt: "Produtos mais vendidos e destaques do mês",
            en: "Best sellers and monthly highlights",
          },
        },
      },
      {
        key: "stack",
        title: { pt: "Django + Chart.js", en: "Django + Chart.js" },
        body: {
          pt: "Modelos Django para produtos, vendas e vendedores, views que agregam os dados e templates com Chart.js. O cadastro é feito pelo Django Admin.",
          en: "Django models for products, sales and sellers, views that aggregate the data and templates with Chart.js. Data entry happens through Django Admin.",
        },
        bullets: [
          { pt: "Modelos, migrations e Django Admin", en: "Models, migrations and Django Admin" },
          {
            pt: "Agregações no back-end e gráficos no front-end",
            en: "Back-end aggregation, front-end charts",
          },
        ],
        figure: {
          kind: "image",
          image: dashAdmin,
          alt: {
            pt: "Django Admin listando produtos cadastrados",
            en: "Django Admin listing registered products",
          },
          caption: { pt: "Cadastro via Django Admin", en: "Data entry via Django Admin" },
        },
      },
      {
        key: "results",
        title: { pt: "Na prática, na Etice", en: "In practice at Etice" },
        body: {
          pt: "Na Etice (2023–2024), apliquei a mesma base em projetos reais: Django com PostgreSQL, autenticação via Google e dashboards analíticos com pandas e Plotly.",
          en: "At Etice (2023–2024), I applied the same foundation to real projects: Django with PostgreSQL, Google sign-in and analytics dashboards with pandas and Plotly.",
        },
        bullets: [
          { pt: "Django + PostgreSQL em produção", en: "Django + PostgreSQL in production" },
          { pt: "Autenticação via Google", en: "Google sign-in" },
          { pt: "Dashboards com pandas e Plotly", en: "Dashboards with pandas and Plotly" },
        ],
      },
    ],
  },

  /* --------------------------------- Portfólio --------------------------------- */
  {
    slug: "portfolio",
    title: { pt: "Este portfólio", en: "This portfolio" },
    badge: { pt: "Frontend · UI/UX · QA", en: "Frontend · UI/UX · QA" },
    year: "2026",
    categories: ["uiux", "qa", "fullstack"],
    context: { pt: "Projeto pessoal", en: "Personal project" },
    summary: {
      pt: "Site estático em Next.js com animações em Framer Motion, smooth scroll com Lenis, um assistente RAG que roda no navegador e qualidade garantida por Playwright, axe-core e Lighthouse CI.",
      en: "Static Next.js site with Framer Motion animations, Lenis smooth scrolling, an in-browser RAG assistant and quality enforced by Playwright, axe-core and Lighthouse CI.",
    },
    chips: [
      { pt: "UI/UX", en: "UI/UX" },
      { pt: "Acessibilidade", en: "Accessibility" },
      { pt: "RAG no navegador", en: "In-browser RAG" },
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis", "Playwright"],
    links: [{ kind: "github", href: "https://github.com/Icar0S/Portfolio-Base" }],
    cover: { kind: "art", motif: "browser", icon: "sparkles" },
    sections: [
      {
        key: "problem",
        title: { pt: "Um portfólio que prove o que diz", en: "A portfolio that proves what it says" },
        body: {
          pt: "Para quem trabalha com qualidade e desenvolvimento, o próprio portfólio é a primeira evidência: precisa ser bonito, rápido, acessível e testado.",
          en: "For someone working in quality and development, the portfolio itself is the first piece of evidence: it has to be beautiful, fast, accessible and tested.",
        },
        bullets: [
          { pt: "Hospedagem estática no GitHub Pages", en: "Static hosting on GitHub Pages" },
          {
            pt: "Sem backend e sem chaves de API no cliente",
            en: "No backend and no API keys on the client",
          },
        ],
      },
      {
        key: "solution",
        title: { pt: "Design escuro, dourado e em movimento", en: "Dark, golden and in motion" },
        body: {
          pt: "Interface com tipografia Syne, cards translúcidos, timeline animada e bento de projetos, com todo o conteúdo em arquivos de dados bilíngues.",
          en: "An interface with Syne typography, translucent cards, an animated timeline and a project bento grid, with all content in bilingual data files.",
        },
        bullets: [
          {
            pt: "Animações com Framer Motion e smooth scroll com Lenis",
            en: "Framer Motion animations and Lenis smooth scrolling",
          },
          { pt: "Respeita prefers-reduced-motion", en: "Respects prefers-reduced-motion" },
          { pt: "Conteúdo em português e inglês", en: "Content in Portuguese and English" },
        ],
      },
      {
        key: "stack",
        title: { pt: "Export estático com Next.js", en: "Static export with Next.js" },
        body: {
          pt: "Next.js (App Router) com export estático, páginas de projeto geradas com generateStaticParams e deploy automático pelo GitHub Actions.",
          en: "Next.js (App Router) with static export, project pages generated with generateStaticParams and automatic deploys through GitHub Actions.",
        },
        bullets: [
          { pt: "TypeScript, Tailwind CSS e lucide-react", en: "TypeScript, Tailwind CSS and lucide-react" },
          { pt: "Imagens WebP otimizadas com sharp", en: "WebP images optimised with sharp" },
        ],
        figure: {
          kind: "flow",
          steps: ["src/data", "Next.js · export", "GitHub Actions", "GitHub Pages"],
          caption: { pt: "Do arquivo de dados ao deploy", en: "From data file to deploy" },
        },
      },
      {
        key: "quality",
        title: { pt: "Testado como qualquer produto", en: "Tested like any product" },
        body: {
          pt: "Toda alteração passa por lint, checagem de tipos, testes E2E, auditoria de acessibilidade e Lighthouse antes do deploy.",
          en: "Every change goes through lint, type checking, E2E tests, an accessibility audit and Lighthouse before deploying.",
        },
        bullets: [
          { pt: "Playwright em desktop, tablet e mobile", en: "Playwright on desktop, tablet and mobile" },
          { pt: "axe-core para WCAG 2.1 AA", en: "axe-core for WCAG 2.1 AA" },
          { pt: "Verificação de links quebrados", en: "Broken-link checks" },
        ],
        figure: {
          kind: "checks",
          items: ["ESLint + TypeScript", "Playwright E2E", "axe-core · WCAG 2.1 AA", "Lighthouse CI ≥ 95"],
          caption: { pt: "Etapas do pipeline antes do deploy", en: "Pipeline steps before deploying" },
        },
      },
      {
        key: "results",
        title: { pt: "Portfolio AI: RAG sem servidor", en: "Portfolio AI: serverless RAG" },
        body: {
          pt: "O assistente no canto da tela é um RAG client-side: a base de conhecimento é gerada no build a partir dos dados do site, e a recuperação usa BM25 em JavaScript.",
          en: "The assistant in the corner is a client-side RAG: the knowledge base is generated at build time from the site's data, and retrieval uses BM25 in JavaScript.",
        },
        bullets: [
          { pt: "Respostas citam a seção de origem", en: "Answers cite their source section" },
          { pt: "Funciona sem backend e sem chaves de API", en: "Works without a backend or API keys" },
        ],
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
