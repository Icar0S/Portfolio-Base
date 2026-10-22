import bdfImage from "@/assets/images/big-data-fortaleza.webp";
import certCJovem from "@/assets/images/cert-capacita-brasil-c-jovem.webp";
import certCtAi from "@/assets/images/cert-istqb-ct-ai.webp";
import certCtfl from "@/assets/images/cert-istqb-ctfl.webp";
import byndImage from "@/assets/images/bynd.webp";
import fndeImage from "@/assets/images/fnde-antonieta-de-barros.webp";
import pinkImage from "@/assets/images/pinkapp.webp";
import type { Localized } from "@/lib/i18n";
import type { TimelineGroup, TimelineItem } from "./types";

/** Ordem e títulos dos grupos da linha do tempo. */
export const timelineGroups: { id: TimelineGroup; label: Localized }[] = [
  { id: "work", label: { pt: "Experiência profissional", en: "Professional experience" } },
  { id: "education", label: { pt: "Formação acadêmica", en: "Education" } },
  { id: "extra", label: { pt: "Certificações e atividades", en: "Certifications & activities" } },
];

/** Linha do tempo (do mais recente para o mais antigo dentro de cada grupo). */
export const timeline: TimelineItem[] = [
  /* ---------------------------- Experiência ---------------------------- */
  {
    // [CONFIRMAR] ano de início no Instituto Atlântico e cidade/modalidade (o Lattes não informa).
    id: "atlantico",
    group: "work",
    icon: "shield-check",
    title: { pt: "Analista de Qualidade de Software", en: "Software Quality Analyst" },
    org: { pt: "Instituto Atlântico", en: "Instituto Atlântico" },
    period: { pt: "2026 — Atual", en: "2026 — Present" },
    highlights: [
      {
        // [PREENCHER] principais entregas no Instituto Atlântico.
        pt: "Atuação em engenharia de qualidade e testes de software.",
        en: "Software quality engineering and testing.",
      },
    ],
  },
  {
    id: "cagece",
    group: "work",
    icon: "droplets",
    title: { pt: "Analista de Sistemas — Qualidade de Software", en: "Systems Analyst — Software Quality" },
    org: {
      pt: "Companhia de Água e Esgoto do Ceará (CAGECE)",
      en: "Ceará Water and Sewage Company (CAGECE)",
    },
    // [CONFIRMAR] ano de saída da CAGECE.
    period: { pt: "2025 — 2026", en: "2025 — 2026" },
    location: { pt: "Fortaleza/CE", en: "Fortaleza, Brazil" },
    highlights: [
      {
        pt: "**Time de Qualidade do ERP Protheus:** conduzi a transição de validações manuais ad hoc para um programa de qualidade contínua multicamada — automação de UI com TIR e de API com Playwright, relatórios Allure e pipelines Jenkins (pipeline-as-code). Resultado: mais de 30 rotinas críticas de folha de pagamento e mais de 1.300 testes de API automatizados.",
        en: "**Protheus ERP quality team:** led the transition from ad-hoc manual validation to a multi-layer continuous quality programme — UI automation with TIR, API testing with Playwright, Allure reporting and Jenkins pipeline-as-code. Outcome: 30+ critical payroll routines and 1,300+ automated API tests.",
      },
      {
        pt: "**Time de IA:** arquitetura de testes do assistente RAG institucional, com oráculos híbridos — similaridade semântica por cosseno (spaCy, limiar 0,85) combinada a guardrails determinísticos. 53 casos de teste com 96,22% de aprovação em três meses de CI e detecção de regressões reais após atualizações regulatórias.",
        en: "**AI team:** designed the test architecture for the organisation's RAG assistant, based on hybrid oracles — cosine semantic similarity (spaCy, 0.85 threshold) combined with deterministic guardrails. 53 test cases reaching a 96.22% pass rate over three months of CI, catching real regressions after regulatory updates.",
      },
      {
        pt: "**Governança de qualidade:** Gitflow para ativos de teste, Board de Qualidade e quarantine lane para gestão de flakiness e dívida técnica de teste.",
        en: "**Quality governance:** Gitflow for test assets, a dedicated Quality Board and a quarantine lane to manage flakiness and test technical debt.",
      },
    ],
    tags: ["TIR", "Playwright", "Allure", "Jenkins", "spaCy", "RAG", "Gitflow"],
    projects: ["erp-protheus", "arquitetura-testes-rag"],
  },
  {
    id: "great",
    group: "work",
    icon: "users",
    title: { pt: "Líder de QA / Analista de QA", en: "QA Lead / QA Analyst" },
    org: {
      pt: "GREat — Universidade Federal do Ceará (UFC)",
      en: "GREat — Federal University of Ceará (UFC)",
    },
    period: { pt: "2022 — Jun. 2025", en: "2022 — Jun. 2025" },
    location: { pt: "Fortaleza/CE · Híbrido", en: "Fortaleza, Brazil · Hybrid" },
    highlights: [
      {
        pt: "Liderança do time de QA do projeto **Antonieta de Barros (FNDE)**: estruturação da automação E2E com Playwright e de testes de API com Pytest, integrados a pipelines de CI/CD no GitLab CI.",
        en: "Led the QA team of the **Antonieta de Barros (FNDE)** project: set up E2E automation with Playwright and API testing with Pytest, integrated into GitLab CI/CD pipelines.",
      },
      {
        pt: "Processo de testes da plataforma **Big Data Fortaleza (Iplanfor)**: testes funcionais e exploratórios, unitários e de integração (JUnit 5, Testcontainers/Docker), de API (Postman), de carga (JMeter, Locust) e de segurança (OWASP ZAP).",
        en: "Testing process for the **Big Data Fortaleza (Iplanfor)** platform: functional and exploratory testing, unit and integration testing (JUnit 5, Testcontainers/Docker), API testing (Postman), load testing (JMeter, Locust) and security testing (OWASP ZAP).",
      },
      {
        pt: "Atuação complementar como **desenvolvedor full stack júnior**: React no front-end, Spring com PostgreSQL no back-end e microsserviços em Go e Python na AWS (EC2).",
        en: "Additional work as a **junior full stack developer**: React on the front end, Spring with PostgreSQL on the back end, and Go/Python microservices on AWS (EC2).",
      },
    ],
    tags: [
      "Playwright",
      "Pytest",
      "GitLab CI",
      "JUnit 5",
      "Postman",
      "JMeter",
      "Locust",
      "OWASP ZAP",
      "React",
      "Spring",
      "Go",
    ],
    media: [
      {
        image: fndeImage,
        alt: {
          pt: "Página inicial da Plataforma Antonieta de Barros, de governança de dados do FNDE",
          en: "Home page of the Antonieta de Barros Platform, FNDE's data governance platform",
        },
        caption: { pt: "Plataforma Antonieta de Barros · FNDE", en: "Antonieta de Barros Platform · FNDE" },
      },
      {
        image: bdfImage,
        alt: {
          pt: "Página inicial da plataforma Big Data Fortaleza, de suporte a políticas públicas baseadas em dados",
          en: "Home page of the Big Data Fortaleza platform, which supports data-driven public policy",
        },
        caption: { pt: "Big Data Fortaleza · Iplanfor", en: "Big Data Fortaleza · Iplanfor" },
      },
    ],
    projects: ["antonieta-de-barros", "big-data-fortaleza"],
  },
  {
    id: "etice",
    group: "work",
    icon: "code",
    title: { pt: "Estagiário de Desenvolvimento", en: "Development Intern" },
    org: {
      pt: "Etice — Empresa de Tecnologia da Informação do Ceará",
      en: "Etice — Ceará State Information Technology Company",
    },
    period: { pt: "2023 — 2024", en: "2023 — 2024" },
    location: { pt: "Fortaleza/CE", en: "Fortaleza, Brazil" },
    highlights: [
      {
        pt: "Desenvolvimento web com **Django e PostgreSQL**, autenticação via Google e dashboards analíticos construídos com pandas e Plotly.",
        en: "Web development with **Django and PostgreSQL**, Google-based authentication and analytical dashboards built with pandas and Plotly.",
      },
    ],
    tags: ["Django", "PostgreSQL", "Google OAuth", "pandas", "Plotly"],
    projects: ["dashboards-django"],
  },
  {
    id: "pinkapp",
    group: "work",
    icon: "bug",
    title: { pt: "Analista de QA Júnior", en: "Junior QA Analyst" },
    org: { pt: "PinkApp", en: "PinkApp" },
    period: { pt: "2021 — 2022", en: "2021 — 2022" },
    location: { pt: "Remoto", en: "Remote" },
    highlights: [
      {
        pt: "Automação de testes web com **Selenium**, testes de carga com **JMeter/Taurus** e testes manuais dentro de metodologia ágil.",
        en: "Web test automation with **Selenium**, load testing with **JMeter/Taurus** and manual testing within an agile process.",
      },
    ],
    tags: ["Selenium", "JMeter", "Taurus", "Agile"],
    media: [
      {
        image: pinkImage,
        alt: {
          pt: "Página inicial da Pink, plataforma que reúne conversas de chat em um só lugar",
          en: "Home page of Pink, a platform that brings chat conversations together in one place",
        },
        caption: { pt: "Pink · plataforma de comunicação", en: "Pink · communication platform" },
      },
    ],
  },
  {
    id: "bynd",
    group: "work",
    icon: "smartphone",
    title: { pt: "Estagiário de QA", en: "QA Intern" },
    org: { pt: "Bynd — Serviços de Tecnologia Ltda.", en: "Bynd — Technology Services" },
    period: { pt: "2019 — 2021", en: "2019 — 2021" },
    location: { pt: "Remoto", en: "Remote" },
    highlights: [
      {
        pt: "Criação dos **primeiros testes automatizados da empresa com Appium**, além de baterias de testes manuais e relatórios de defeitos.",
        en: "Built the **company's first automated test suite with Appium**, alongside manual test cycles and defect reporting.",
      },
    ],
    tags: ["Appium", "Mobile"],
    media: [
      {
        image: byndImage,
        alt: {
          pt: "Página inicial da Bynd Caronas, aplicativo de caronas corporativas",
          en: "Home page of Bynd Caronas, a corporate carpooling app",
        },
        caption: {
          pt: "Bynd Caronas · app de caronas corporativas",
          en: "Bynd Caronas · corporate carpooling app",
        },
      },
    ],
  },

  /* ----------------------------- Formação ----------------------------- */
  {
    id: "phd",
    group: "education",
    icon: "graduation-cap",
    title: { pt: "Doutorado em Ciência da Computação", en: "PhD in Computer Science" },
    org: {
      pt: "Universidade Estadual do Ceará (UECE) · GESAD",
      en: "State University of Ceará (UECE) · GESAD",
    },
    period: { pt: "2026 — 2029 (em curso)", en: "2026 — 2029 (ongoing)" },
    highlights: [
      {
        pt: "**Tese:** teste e garantia de qualidade de sistemas baseados em LLM com RAG — um protocolo de testes com ênfase na qualidade do corpus e da recuperação, apoiado em mineração de literatura cinzenta e evidências empíricas.",
        en: "**Thesis:** testing and quality assurance of LLM-based systems with RAG — a testing protocol focused on corpus and retrieval quality, grounded in grey-literature mining and empirical evidence.",
      },
      {
        pt: "Orientador: Prof. Dr. Ismayle S. Santos · Coorientadora: Profa. Dra. Rossana M. C. Andrade.",
        en: "Advisor: Prof. Dr. Ismayle S. Santos · Co-advisor: Prof. Dr. Rossana M. C. Andrade.",
      },
    ],
  },
  {
    id: "msc",
    group: "education",
    icon: "microscope",
    title: { pt: "Mestrado em Ciência da Computação", en: "MSc in Computer Science" },
    org: {
      pt: "Universidade Estadual do Ceará (UECE) · GESAD",
      en: "State University of Ceará (UECE) · GESAD",
    },
    period: { pt: "Mar. 2024 — Mar. 2026", en: "Mar. 2024 — Mar. 2026" },
    highlights: [
      {
        pt: "**Dissertação:** teste de sistemas Big Data e qualidade de dados, por meio de uma revisão multivocal que triangula literatura branca, literatura cinzenta e prática industrial — com publicações no SBQS 2024, ICEIS 2025 e LNBIP.",
        en: "**Dissertation:** testing Big Data systems and data quality through a multivocal review that triangulates white literature, grey literature and industrial practice — published at SBQS 2024, ICEIS 2025 and LNBIP.",
      },
      {
        pt: "Desenvolvimento do **SmartDataTest**, plataforma assistida por LLMs e RAG que gera regras de qualidade de dados e código PySpark.",
        en: "Built **SmartDataTest**, an LLM- and RAG-assisted platform that generates data quality rules and PySpark code.",
      },
    ],
    projects: ["smartdatatest"],
  },
  {
    id: "postgrad",
    group: "education",
    icon: "book-open",
    title: {
      pt: "Pós-graduação Lato Sensu em Desenvolvimento Full Stack (360h)",
      en: "Postgraduate Specialisation in Full Stack Development (360h)",
    },
    org: {
      pt: "Centro Universitário União das Américas — Descomplica",
      en: "Centro Universitário União das Américas — Descomplica",
    },
    period: { pt: "Ago. 2023 — Mar. 2024", en: "Aug. 2023 — Mar. 2024" },
    highlights: [
      {
        pt: "Disciplinas de front-end e back-end (do intermediário ao avançado), cloud na AWS, banco de dados, interface de software e refatoração.",
        en: "Courses on front-end and back-end (intermediate to advanced), AWS cloud, databases, software interfaces and refactoring.",
      },
    ],
  },
  {
    id: "bsc",
    group: "education",
    icon: "graduation-cap",
    title: { pt: "Bacharelado em Engenharia da Computação", en: "BSc in Computer Engineering" },
    org: { pt: "Instituto Federal do Ceará (IFCE)", en: "Federal Institute of Ceará (IFCE)" },
    period: { pt: "2017 — 2023", en: "2017 — 2023" },
    highlights: [],
  },

  /* ---------------------- Certificações e atividades ---------------------- */
  {
    id: "istqb-ct-ai",
    group: "extra",
    icon: "brain",
    title: {
      pt: "ISTQB® Certified Tester — AI Testing (CT-AI)",
      en: "ISTQB® Certified Tester — AI Testing (CT-AI)",
    },
    org: { pt: "BSTQB® · ISTQB®", en: "BSTQB® · ISTQB®" },
    period: { pt: "Out. 2026", en: "Oct. 2026" },
    highlights: [
      {
        pt: "Certificação internacional em **teste de sistemas baseados em IA**: características de qualidade de IA, teste de sistemas de aprendizado de máquina e uso de IA no teste de software.",
        en: "International certification in **testing AI-based systems**: AI quality characteristics, testing machine learning systems and using AI for software testing.",
      },
    ],
    credential: "26-CT-AI-16299-BR",
    documents: [
      { label: { pt: "Certificado (PDF)", en: "Certificate (PDF)" }, href: "/certificados/istqb-ct-ai.pdf" },
    ],
    media: [
      {
        image: certCtAi,
        alt: {
          pt: "Certificado ISTQB Certified Tester AI Testing (CT-AI) emitido pelo BSTQB para Icaro Santos de Oliveira",
          en: "ISTQB Certified Tester AI Testing (CT-AI) certificate issued by BSTQB to Icaro Santos de Oliveira",
        },
        caption: { pt: "CT-AI · válido mundialmente", en: "CT-AI · valid worldwide" },
        document: true,
      },
    ],
  },
  {
    id: "istqb-ctfl",
    group: "extra",
    icon: "award",
    title: {
      pt: "ISTQB® Certified Tester — Foundation Level (CTFL)",
      en: "ISTQB® Certified Tester — Foundation Level (CTFL)",
    },
    org: { pt: "BSTQB® · ISTQB®", en: "BSTQB® · ISTQB®" },
    period: { pt: "Mar. 2025", en: "Mar. 2025" },
    highlights: [
      {
        pt: "Certificação de base em teste de software reconhecida internacionalmente.",
        en: "Internationally recognised foundation certification in software testing.",
      },
    ],
    credential: "25-CTFL-13972-BR",
    documents: [
      { label: { pt: "Certificado (PDF)", en: "Certificate (PDF)" }, href: "/certificados/istqb-ctfl.pdf" },
    ],
    media: [
      {
        image: certCtfl,
        alt: {
          pt: "Certificado ISTQB Certified Tester Foundation Level (CTFL) emitido pelo BSTQB para Icaro Santos de Oliveira",
          en: "ISTQB Certified Tester Foundation Level (CTFL) certificate issued by BSTQB to Icaro Santos de Oliveira",
        },
        caption: { pt: "CTFL · válido mundialmente", en: "CTFL · valid worldwide" },
        document: true,
      },
    ],
  },
  {
    id: "pibic",
    group: "extra",
    icon: "users",
    title: {
      pt: "Coorientação de Iniciação Científica e TCC",
      en: "Co-supervision of undergraduate research and capstone projects",
    },
    org: { pt: "UECE", en: "UECE" },
    period: { pt: "2026 — Atual", en: "2026 — Present" },
    highlights: [
      {
        pt: "Coorientação de trabalhos de iniciação científica e de conclusão de curso.",
        en: "Co-supervision of undergraduate research and capstone (final-year) projects.",
      },
      {
        pt: "Supervisão técnica de bolsista IC/PIBIC em projeto sobre qualidade de dados e de índices para sistemas RAG.",
        en: "Technical supervision of a PIBIC research fellow on data and index quality for RAG systems.",
      },
    ],
  },
  {
    id: "c-jovem",
    group: "extra",
    icon: "book-open",
    title: { pt: "Professor de Lógica de Programação", en: "Programming Logic Instructor" },
    org: {
      pt: "Residência em TIC 20 — Capacita Brasil / C-Jovem (UECE)",
      en: "ICT Residency 20 — Capacita Brasil / C-Jovem (UECE)",
    },
    period: { pt: "Jan. — Fev. 2025", en: "Jan. — Feb. 2025" },
    location: { pt: "Fortaleza/CE", en: "Fortaleza, Brazil" },
    highlights: [
      {
        pt: "Aulas de **lógica de programação** (48 h) no programa de residência em TIC Capacita Brasil/C-Jovem, executado pela UECE e pelo Instituto Atlântico, com coordenação da Softex e apoio do MCTI.",
        en: "Taught **programming logic** (48 h) in the Capacita Brasil/C-Jovem ICT residency programme, run by UECE and Instituto Atlântico, coordinated by Softex and supported by Brazil's Ministry of Science and Technology.",
      },
    ],
    documents: [
      {
        label: { pt: "Certificado", en: "Certificate" },
        href: "/certificados/capacita-brasil-c-jovem.webp",
      },
    ],
    media: [
      {
        image: certCJovem,
        alt: {
          pt: "Certificado do Programa Residência em TIC 20 — Capacita Brasil/C-Jovem atestando a atuação como professor de Lógica de Programação",
          en: "Certificate from the ICT Residency 20 — Capacita Brasil/C-Jovem programme for teaching Programming Logic",
        },
        caption: { pt: "Capacita Brasil / C-Jovem · 48 h", en: "Capacita Brasil / C-Jovem · 48 h" },
      },
    ],
  },
];
