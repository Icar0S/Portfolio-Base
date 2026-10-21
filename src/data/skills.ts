import type { SkillCategory } from "./types";

/**
 * Categorias da seção Habilidades. A maior parte vem do currículo e dos repositórios
 * públicos. Itens marcados com [CONFIRMAR] não aparecem em nenhum dos dois — revise
 * e remova a linha se não fizer sentido.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "qa",
    icon: "shield-check",
    name: { pt: "QA & Automação", en: "QA & Automation" },
    items: [
      "Playwright",
      "Cypress",
      "Selenium",
      "Appium",
      "Pytest",
      "JUnit 5",
      "TIR (Protheus)",
      "Testcontainers",
      "Postman",
      "Allure",
      "TestLink",
      { pt: "Testes E2E", en: "E2E testing" },
      { pt: "Testes de API", en: "API testing" },
      { pt: "Oráculos semânticos", en: "Semantic oracles" },
      "axe-core", // [CONFIRMAR]
    ],
  },
  {
    id: "performance",
    icon: "gauge",
    name: { pt: "Performance & Segurança", en: "Performance & Security" },
    items: ["Grafana k6", "JMeter", "Locust", "Taurus", "OWASP ZAP"],
  },
  {
    id: "frontend",
    icon: "layout",
    name: { pt: "Frontend", en: "Frontend" },
    items: [
      "React",
      "React Native",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Framer Motion",
      "Next.js", // [CONFIRMAR]
    ],
  },
  {
    id: "backend",
    icon: "server",
    name: { pt: "Backend & Fullstack", en: "Backend & Full Stack" },
    items: [
      "Python",
      "Java",
      "Go",
      "Node.js",
      "Django",
      "Flask",
      "FastAPI",
      "Spring",
      "PostgreSQL",
      { pt: "APIs REST", en: "REST APIs" },
      { pt: "Microsserviços", en: "Microservices" },
    ],
  },
  {
    id: "ai",
    icon: "brain",
    name: { pt: "IA, LLM & Dados", en: "AI, LLM & Data" },
    items: [
      "LLMs",
      "RAG",
      "Embeddings",
      "LLM-as-a-Judge",
      "RAGAS",
      "DeepEval",
      "spaCy",
      "Ollama",
      "ChromaDB",
      "PySpark",
      "pandas",
      "DuckDB",
      "LDA",
      "Big Data",
      { pt: "Benchmark de LLMs", en: "LLM benchmarking" },
      "LangChain", // [CONFIRMAR]
    ],
  },
  {
    id: "devops",
    icon: "git-branch",
    name: { pt: "DevOps & CI/CD", en: "DevOps & CI/CD" },
    items: [
      "Jenkins",
      "GitLab CI",
      "GitHub Actions",
      "Azure DevOps",
      "Docker",
      "Podman",
      "AWS (EC2)",
      "Git",
      "Gitflow",
    ],
  },
  {
    id: "uiux",
    icon: "pen-tool",
    name: { pt: "UI/UX", en: "UI/UX" },
    items: [
      { pt: "Design de interfaces", en: "Interface design" },
      { pt: "Design responsivo", en: "Responsive design" },
      { pt: "Prototipação", en: "Prototyping" },
      { pt: "Acessibilidade (WCAG)", en: "Accessibility (WCAG)" },
      "Figma", // [CONFIRMAR]
    ],
  },
];

/** Tecnologias exibidas nas faixas animadas (marquee). */
export const marqueeTechs = [
  "Playwright",
  "Pytest",
  "Cypress",
  "Selenium",
  "Appium",
  "k6",
  "JMeter",
  "OWASP ZAP",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Python",
  "Django",
  "FastAPI",
  "Spring",
  "PostgreSQL",
  "LLMs",
  "RAG",
  "RAGAS",
  "DeepEval",
  "spaCy",
  "PySpark",
  "Docker",
  "Jenkins",
  "GitLab CI",
  "GitHub Actions",
  "AWS",
];
