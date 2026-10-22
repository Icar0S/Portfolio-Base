import type { Localized } from "@/lib/i18n";
import type { Artifact, Publication, PublicationType } from "./types";

export const publicationGroups: { id: PublicationType; label: Localized }[] = [
  { id: "journal", label: { pt: "Periódicos", en: "Journals" } },
  { id: "chapter", label: { pt: "Capítulos de livro", en: "Book chapters" } },
  { id: "conference", label: { pt: "Conferências e simpósios", en: "Conferences & symposia" } },
];

/** Nome do autor destacado na lista de autores. */
export const authorName = "Í. S. de Oliveira";

export const publications: Publication[] = [
  {
    id: "jss-2026",
    type: "journal",
    title: {
      pt: "Big Data Testing: A Multivocal Literature Review Bridging Academic Research and Industry Practice",
      en: "Big Data Testing: A Multivocal Literature Review Bridging Academic Research and Industry Practice",
    },
    authors: "Í. S. de Oliveira, I. S. Santos, J. M. de L. Alves, N. N. A. da Silva, R. M. C. Andrade",
    venue: {
      pt: "Journal of Systems and Software (JSS), Elsevier",
      en: "Journal of Systems and Software (JSS), Elsevier",
    },
    year: "2026",
    status: { pt: "Em avaliação", en: "Under review" },
    note: { pt: "Submetido, em avaliação.", en: "Submitted, under review." },
  },
  {
    id: "lnbip-bdf",
    type: "chapter",
    title: {
      pt: "Big Data Fortaleza Platform: Testing Process",
      en: "Big Data Fortaleza Platform: Testing Process",
    },
    authors:
      "A. K. B. Cavalcante, Í. S. de Oliveira, V. T. Oliveira, P. A. M. Oliveira, T. P. Nogueira, I. S. Santos, R. M. C. Andrade",
    venue: {
      pt: "Lecture Notes in Business Information Processing (LNBIP), Springer",
      en: "Lecture Notes in Business Information Processing (LNBIP), Springer",
    },
    year: "2025",
    status: { pt: "No prelo", en: "To appear" },
    note: {
      pt: "Versão estendida do artigo do ICEIS 2025.",
      en: "Extended version of the ICEIS 2025 paper.",
    },
    project: "big-data-fortaleza",
  },
  {
    id: "sast-2026",
    type: "conference",
    title: {
      pt: "Relato de Experiência: Arquitetura de Testes e Validação Semântica para um Sistema RAG no Setor Público",
      en: "Experience Report: Test Architecture and Semantic Validation for a RAG System in the Public Sector",
    },
    authors: "Í. S. de Oliveira, F. F. Rodrigues de Oliveira, P. H. M. Maia, I. S. Santos",
    venue: {
      pt: "11th Brazilian Symposium on Systematic and Automated Software Testing (SAST 2026), CBSoft, São Paulo/SP — ACM",
      en: "11th Brazilian Symposium on Systematic and Automated Software Testing (SAST 2026), CBSoft, São Paulo, Brazil — ACM",
    },
    year: "2026",
    status: { pt: "Apresentado", en: "Presented" },
    note: {
      pt: "Selo Artifacts Available — artefato aberto (Apache 2.0).",
      en: "Artifacts Available badge — open artefact (Apache 2.0). In Portuguese.",
    },
    doi: "10.5281/zenodo.21837636",
    project: "arquitetura-testes-rag",
  },
  {
    id: "vem-2026",
    type: "conference",
    title: {
      pt: "Da Validação Manual à Qualidade Contínua: Um Relato de Evolução de Testes Automatizados em um ERP Legado",
      en: "From Manual Validation to Continuous Quality: An Experience Report on the Evolution of Automated Testing in a Legacy ERP",
    },
    authors: "Í. S. de Oliveira, F. F. Rodrigues de Oliveira, I. S. Santos",
    venue: {
      pt: "14th Workshop on Software Visualization, Evolution and Maintenance (VEM 2026), CBSoft, São Paulo/SP",
      en: "14th Workshop on Software Visualization, Evolution and Maintenance (VEM 2026), CBSoft, São Paulo, Brazil",
    },
    year: "2026",
    status: { pt: "Apresentado", en: "Presented" },
    note: { pt: "", en: "In Portuguese." },
    project: "erp-protheus",
  },
  {
    id: "ise-2026",
    type: "conference",
    title: {
      pt: "“Will I Be Replaced?” Revisited: An Exploratory Replication on AI Tool Perceptions with Software Professionals in Brazil",
      en: "“Will I Be Replaced?” Revisited: An Exploratory Replication on AI Tool Perceptions with Software Professionals in Brazil",
    },
    authors: "Í. S. de Oliveira, F. F. Rodrigues de Oliveira, P. H. M. Maia, I. S. Santos",
    venue: {
      pt: "5th Brazilian Workshop on Intelligent Software Engineering (ISE 2026), CBSoft, São Paulo/SP — ACM",
      en: "5th Brazilian Workshop on Intelligent Software Engineering (ISE 2026), CBSoft, São Paulo, Brazil — ACM",
    },
    year: "2026",
    status: { pt: "Apresentado", en: "Presented" },
    note: { pt: "Pacote de replicação disponível.", en: "Replication package available." },
    doi: "10.5281/zenodo.20947923",
  },
  {
    id: "iceis-2025",
    type: "conference",
    title: {
      pt: "Big Data Fortaleza Platform: Quality Improvement with Testing Process",
      en: "Big Data Fortaleza Platform: Quality Improvement with Testing Process",
    },
    authors:
      "A. K. B. Cavalcante, Í. S. de Oliveira, V. T. Oliveira, P. A. M. Oliveira, T. P. Nogueira, I. S. Santos, R. M. C. Andrade",
    venue: {
      pt: "Proceedings of the 27th International Conference on Enterprise Information Systems (ICEIS 2025), vol. 2, pp. 227–236, SciTePress",
      en: "Proceedings of the 27th International Conference on Enterprise Information Systems (ICEIS 2025), vol. 2, pp. 227–236, SciTePress",
    },
    year: "2025",
    status: { pt: "Publicado", en: "Published" },
    doi: "10.5220/0013290500003929",
    project: "big-data-fortaleza",
  },
  {
    id: "sbqs-2024",
    type: "conference",
    title: {
      pt: "Quality of Big Data Systems: a Systematic Review of Practices, Methods and Tools",
      en: "Quality of Big Data Systems: a Systematic Review of Practices, Methods and Tools",
    },
    authors: "Í. S. de Oliveira, J. M. de L. Alves, S. C. Alcântara, I. S. Santos, R. M. C. Andrade",
    venue: {
      pt: "Anais do XXIII Simpósio Brasileiro de Qualidade de Software (SBQS 2024), pp. 22–31, SBC",
      en: "Proceedings of the 23rd Brazilian Symposium on Software Quality (SBQS 2024), pp. 22–31, SBC",
    },
    year: "2024",
    status: { pt: "Publicado", en: "Published" },
  },
];

export const researchAreas: Localized[] = [
  { pt: "Teste de sistemas LLM/RAG", en: "Testing LLM/RAG systems" },
  { pt: "Oráculos semânticos", en: "Semantic oracles" },
  { pt: "Qualidade de dados", en: "Data quality" },
  { pt: "Big Data testing", en: "Big Data testing" },
  { pt: "Revisão multivocal (MLR/MSR)", en: "Multivocal reviews (MLR/MSR)" },
  { pt: "CI/CD e regressão semântica", en: "CI/CD and semantic regression" },
  { pt: "SE4AI", en: "SE4AI" },
  { pt: "Teste de sistemas de IA", en: "Testing AI systems" },
  { pt: "Automação de testes", en: "Test automation" },
  { pt: "IA aplicada à Engenharia de Software", en: "AI for Software Engineering" },
];

export const artifacts: Artifact[] = [
  {
    id: "rag-architecture",
    icon: "git-branch",
    title: { pt: "Arquitetura de testes para sistema RAG", en: "Test architecture for a RAG system" },
    description: {
      pt: "Implementação de referência aberta (Apache 2.0).",
      en: "Open reference implementation (Apache 2.0).",
    },
    doi: "10.5281/zenodo.21837636",
    repo: "https://github.com/Icar0S/Evaluating-Answer-Quality-RAG-System",
  },
  {
    id: "ai-perceptions",
    icon: "database",
    title: {
      pt: "Pacote de replicação — percepções sobre ferramentas de IA",
      en: "Replication package — AI tool perceptions",
    },
    description: {
      pt: "Instrumento, dados e matriz de codificação.",
      en: "Instrument, dataset and coding matrix.",
    },
    doi: "10.5281/zenodo.20947923",
  },
];

/** Supervisão de pesquisa (também aparece na linha do tempo). */
export const academicActivity = {
  title: {
    pt: "Coorientação de Iniciação Científica e TCC",
    en: "Co-supervision of undergraduate research and capstone projects",
  },
  org: "UECE",
  period: { pt: "2026 — Atual", en: "2026 — Present" },
  description: {
    pt: "Coorienta trabalhos de IC e de conclusão de curso, incluindo um projeto PIBIC sobre qualidade de dados e de índices para sistemas RAG.",
    en: "Co-supervises undergraduate research and capstone projects, including a PIBIC project on data and index quality for RAG systems.",
  },
} satisfies { title: Localized; org: string; period: Localized; description: Localized };

export const doiUrl = (doi: string) => `https://doi.org/${doi}`;
