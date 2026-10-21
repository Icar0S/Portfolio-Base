import type { APIRequestContext } from "@playwright/test";
import { expect, test } from "./fixtures";

const SITE = "https://icar0s.github.io/Portfolio-Base/";

async function sitemapPaths(request: APIRequestContext) {
  const xml = await (await request.get("sitemap.xml")).text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]!.replace(SITE, ""));
}

test.describe("Projetos", () => {
  test("filtros mostram só os projetos da categoria", async ({ page }) => {
    await page.goto("./");
    const section = page.locator("#projetos");
    await section.scrollIntoViewIfNeeded();
    const cards = section.locator("[data-categories]");
    const total = await cards.count();
    expect(total).toBeGreaterThanOrEqual(6);

    const filters = section.getByRole("group", { name: "Filtrar projetos por categoria" });
    for (const [label, category] of [
      ["QA & Automação", "qa"],
      ["IA & LLM", "ia"],
      ["Fullstack", "fullstack"],
      ["UI/UX", "uiux"],
    ] as const) {
      await filters.getByRole("button", { name: label }).click();
      await expect(filters.getByRole("button", { name: label })).toHaveAttribute("aria-pressed", "true");
      const expected = section.locator(`[data-categories~="${category}"]`);
      await expect(cards).toHaveCount(await expected.count());
      expect(await expected.count()).toBeGreaterThan(0);
      await expect(section.getByRole("status")).toContainText(String(await expected.count()));
    }

    await filters.getByRole("button", { name: "Todos" }).click();
    await expect(cards).toHaveCount(total);
  });

  test("card leva à página de detalhe e o link de volta retorna à seção", async ({ page }) => {
    await page.goto("./");
    await page
      .locator("#projetos")
      .getByRole("link", { name: /Ver detalhes.*DOM-Heal/ })
      .click();
    await expect(page).toHaveURL(/\/projetos\/dom-heal\/$/);
    await expect(page.getByRole("heading", { level: 1, name: "DOM-Heal" })).toBeVisible();

    await page.getByRole("link", { name: "Voltar aos projetos" }).first().click();
    await expect(page).toHaveURL(/\/Portfolio-Base\/#projetos$/);
    await expect(page.locator("#projetos h2")).toBeInViewport();
  });

  test("todas as páginas de detalhe (PT e EN) renderizam com seções e navegação", async ({
    page,
    request,
  }) => {
    const paths = (await sitemapPaths(request)).filter((path) => /(projetos|projects)\//.test(path));
    expect(paths.length).toBeGreaterThanOrEqual(2);
    for (const path of paths) {
      await page.goto(path);
      const isEnglish = path.startsWith("en/");
      await expect(page.locator("html")).toHaveAttribute("lang", isEnglish ? "en" : "pt-BR");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator("main section h2").first()).toBeAttached();
      await expect(
        page.getByRole("navigation", { name: isEnglish ? "Project navigation" : "Navegação entre projetos" }),
      ).toBeAttached();
    }
  });

  test("projeto anterior/próximo navega entre os detalhes", async ({ page }) => {
    await page.goto("projetos/smartdatatest/");
    const pager = page.getByRole("navigation", { name: "Navegação entre projetos" });
    await pager.getByRole("link", { name: /Próximo projeto/ }).click();
    await expect(page).not.toHaveURL(/smartdatatest/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
