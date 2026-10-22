import profilePhoto from "@/assets/images/profile.webp";
import type { Localized } from "@/lib/i18n";
import type { IconName, Language, Stat } from "./types";

/**
 * Dados pessoais e textos de apresentação.
 * Trechos entre **asteriscos duplos** aparecem em destaque (negrito claro).
 */
export const profile = {
  name: "Ícaro Santos de Oliveira",
  displayName: "Ícaro Santos",
  firstName: "Ícaro",
  lastName: "Santos",
  monogram: "IS",

  photo: {
    image: profilePhoto,
    alt: {
      pt: "Retrato de Ícaro Santos de Oliveira em estúdio, de óculos e camisa escura",
      en: "Studio portrait of Ícaro Santos de Oliveira wearing glasses and a dark shirt",
    },
  },

  /** Palavras que alternam no hero ("Sou …"). */
  roles: [
    { pt: "QA Engineer Sênior", en: "Senior QA Engineer" },
    { pt: "Desenvolvedor Fullstack", en: "Full Stack Developer" },
    { pt: "Desenvolvedor Frontend", en: "Frontend Developer" },
    { pt: "UI/UX Designer", en: "UI/UX Designer" },
    { pt: "Pesquisador em IA", en: "AI Researcher" },
  ] satisfies Localized[],

  headline: {
    pt: "QA Engineer, desenvolvedor fullstack e pesquisador em IA",
    en: "QA Engineer, full stack developer and AI researcher",
  },

  intro: {
    pt: "Construo e testo **aplicações web**, **automações de teste** e **sistemas com LLM e RAG** — unindo design, código e qualidade para entregar produtos confiáveis.",
    en: "I build and test **web applications**, **test automation** and **LLM & RAG systems** — bringing design, code and quality together to ship reliable products.",
  },

  availability: {
    pt: "Disponível para projetos e oportunidades",
    en: "Open to projects & opportunities",
  },

  location: { pt: "Fortaleza, CE · Brasil", en: "Fortaleza, CE · Brazil" },

  email: "icarooliveira.santos23@gmail.com",
  academicEmail: "icaro.santos@aluno.uece.br",

  social: {
    github: { href: "https://github.com/icar0s", label: "github.com/icar0s" },
    linkedin: {
      href: "https://www.linkedin.com/in/icaro-santos-oliveira/",
      label: "in/icaro-santos-oliveira",
    },
    lattes: {
      href: "https://lattes.cnpq.br/4886446557733068",
      label: "lattes.cnpq.br/4886446557733068",
    },
  },

  /** Currículos em PDF dentro de `public/`. */
  cv: { pt: "/cv-icaro-santos.pdf", en: "/cv-icaro-santos-en.pdf" } satisfies Localized,

  /** Chips flutuantes ao redor da foto. */
  heroChips: ["Playwright", "LLM + RAG", "UI/UX", "Fullstack"],

  about: {
    title: {
      pt: "Qualidade, código e design no mesmo lugar",
      en: "Quality, code and design in one place",
    },
    paragraphs: [
      {
        pt: "Sou **Analista de Qualidade de Software no Instituto Atlântico**, com mais de seis anos de experiência em Engenharia de Qualidade e Testes de Software, e **doutorando em Ciência da Computação na UECE**, onde pesquiso o teste e a garantia de qualidade de sistemas baseados em **LLM e RAG**. Transito entre frontend, backend, automação de testes e UI/UX — e uso essa visão completa para construir produtos que funcionam bem, parecem bem e não quebram em produção.",
        en: "I'm a **Software Quality Analyst at Instituto Atlântico**, with 6+ years of experience in software quality engineering and testing, and a **PhD student in Computer Science at UECE**, researching testing and quality assurance of **LLM- and RAG-based systems**. I move across frontend, backend, test automation and UI/UX — and use that end-to-end view to build products that work well, look good and don't break in production.",
      },
      {
        pt: "Sou **mestre em Ciência da Computação** pela UECE, engenheiro da computação pelo IFCE, pós-graduado em Desenvolvimento Fullstack, **membro do GESAD** e **certificado ISTQB® CTFL e CT-AI (AI Testing)**. Passei pela equipe de Qualidade da CAGECE e pelo projeto Antonieta de Barros (FNDE/GREat), onde liderei o time de QA e estruturei a automação E2E (Playwright) e de API (Pytest) integrada a pipelines de CI/CD. Também cooriento trabalhos de iniciação científica e de conclusão de curso.",
        en: "I hold an **MSc in Computer Science** from UECE, a BSc in Computer Engineering from IFCE and a postgraduate degree in Full Stack Development; I'm a **member of GESAD** and **ISTQB® CTFL and CT-AI (AI Testing) certified**. I worked on CAGECE's Quality team and on the Antonieta de Barros project (FNDE/GREat), where I led the QA team and set up E2E (Playwright) and API (Pytest) automation integrated into CI/CD pipelines. I also co-supervise undergraduate research and capstone projects.",
      },
    ] satisfies Localized[],
    pillars: [
      {
        title: { pt: "Qualidade por design", en: "Quality by design" },
        text: {
          pt: "Testes pensados desde a arquitetura, automação E2E e pipelines de CI confiáveis.",
          en: "Tests planned from the architecture up, E2E automation and reliable CI pipelines.",
        },
      },
      {
        title: { pt: "Código de produção", en: "Production-grade code" },
        text: {
          pt: "Aplicações web fullstack, componentizadas, acessíveis e performáticas.",
          en: "Component-driven, accessible and fast full stack web applications.",
        },
      },
      {
        title: { pt: "Pesquisa aplicada em IA", en: "Applied AI research" },
        text: {
          pt: "Avaliação e testes de sistemas com LLM e RAG, do laboratório para a indústria.",
          en: "Evaluating and testing LLM and RAG systems, from the lab to industry.",
        },
      },
    ] satisfies { title: Localized; text: Localized }[],
    facts: [
      { icon: "globe", label: { pt: "Fortaleza, CE · Brasil", en: "Fortaleza, CE · Brazil" } },
      { icon: "award", label: { pt: "ISTQB® CTFL · CT-AI", en: "ISTQB® CTFL · CT-AI" } },
      {
        icon: "graduation-cap",
        label: { pt: "Doutorando · UECE · GESAD", en: "PhD student · UECE · GESAD" },
      },
    ] satisfies { icon: IconName; label: Localized }[],
  },

  /** Faixa de números da seção Sobre (animação de contagem). */
  stats: [
    { value: 6, suffix: "+", label: { pt: "Anos de experiência", en: "Years of experience" } },
    { value: 7, label: { pt: "Publicações científicas", en: "Scientific publications" } },
    { value: 1300, suffix: "+", label: { pt: "Testes de API automatizados", en: "Automated API tests" } },
    {
      value: 30,
      suffix: "+",
      label: { pt: "Rotinas críticas automatizadas", en: "Critical routines automated" },
    },
    // "Tecnologias" é calculado a partir de skills.ts (ver About).
  ] satisfies Stat[],

  languages: [
    { name: { pt: "Português", en: "Portuguese" }, level: { pt: "nativo", en: "native" }, score: 5 },
    { name: { pt: "Inglês", en: "English" }, level: { pt: "avançado", en: "advanced" }, score: 4 },
    { name: { pt: "Espanhol", en: "Spanish" }, level: { pt: "intermediário", en: "intermediate" }, score: 3 },
  ] satisfies Language[],
};
