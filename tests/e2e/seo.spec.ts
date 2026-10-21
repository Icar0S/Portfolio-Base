import { test as base } from "@playwright/test";
import { expect, test } from "./fixtures";

test.describe("SEO e arquivos estáticos", () => {
  test("metadados da home (PT)", async ({ page }) => {
    await page.goto("./");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /QA Engineer/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://icar0s.github.io/Portfolio-Base/",
    );
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      "href",
      "https://icar0s.github.io/Portfolio-Base/en/",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://icar0s.github.io/Portfolio-Base/og-image.png",
    );
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "pt_BR");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator('link[rel="icon"]').first()).toHaveAttribute("href", /icon\.png/);
  });

  test("metadados de uma página de projeto (EN)", async ({ page }) => {
    await page.goto("en/projects/smartdatatest/");
    await expect(page).toHaveTitle(/SmartDataTest/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://icar0s.github.io/Portfolio-Base/en/projects/smartdatatest/",
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
  });

  test("sitemap, robots, imagem OG, base de conhecimento e .nojekyll são publicados", async ({ request }) => {
    for (const path of [
      "sitemap.xml",
      "robots.txt",
      "og-image.png",
      "kb/pt.json",
      "kb/en.json",
      ".nojekyll",
    ]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
    }
    const robots = await (await request.get("robots.txt")).text();
    expect(robots).toContain("Sitemap: https://icar0s.github.io/Portfolio-Base/sitemap.xml");

    const knowledge = (await (await request.get("kb/pt.json")).json()) as { title: string; href: string }[];
    expect(knowledge.length).toBeGreaterThan(40);
    expect(knowledge.every((chunk) => chunk.title && chunk.href.startsWith("/"))).toBe(true);
  });

  test("página 404 personalizada", async ({ page }) => {
    const response = await page.goto("pagina-que-nao-existe/");
    expect(response?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page.getByRole("heading", { level: 1, name: "404" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Voltar ao início/ })).toHaveAttribute(
      "href",
      "/Portfolio-Base/",
    );
  });
});

base.describe("Preloader", () => {
  base("aparece na primeira visita e não se repete na mesma sessão", async ({ page }) => {
    await page.goto("./");
    const preloader = page.locator("#preloader");
    await expect(preloader).toBeVisible();
    await expect(preloader).toContainText("Carregando");
    await expect(preloader).toBeHidden({ timeout: 8_000 });
    await expect(page.locator("html")).not.toHaveClass(/is-loading/);

    await page.goto("en/");
    await expect(page.locator("html")).toHaveClass(/no-preloader/);
    await expect(page.locator("#preloader")).toBeHidden();
  });

  base("não aparece com movimento reduzido", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("./");
    await expect(page.locator("#preloader")).toBeHidden();
    await expect(page.getByRole("heading", { level: 1, name: "Ícaro Santos" })).toBeVisible();
  });
});
