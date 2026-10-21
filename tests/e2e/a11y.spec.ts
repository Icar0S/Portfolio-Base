import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import { expect, revealAll, test } from "./fixtures";

const WCAG = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

async function audit(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(WCAG).analyze();
  return results.violations.map(
    (violation) =>
      `${violation.id} (${violation.impact}): ${violation.help}\n  ${violation.nodes
        .slice(0, 3)
        .map((node) => node.target.join(" "))
        .join("\n  ")}`,
  );
}

const pages = [
  "./",
  "en/",
  "projetos/smartdatatest/",
  "projetos/adotspets/",
  "projetos/arquitetura-testes-rag/",
  "en/projects/dom-heal/",
  "pagina-que-nao-existe/",
];

test.describe("Acessibilidade (axe-core, WCAG 2.1 AA)", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  for (const path of pages) {
    test(`sem violações em /${path === "./" ? "" : path}`, async ({ page }) => {
      await page.goto(path);
      await revealAll(page);
      expect(await audit(page)).toEqual([]);
    });
  }

  test("sem violações com o assistente aberto", async ({ page }) => {
    await page.goto("./");
    await page.getByRole("button", { name: "Abrir o assistente Portfolio AI" }).click();
    const dialog = page.getByRole("dialog", { name: "Portfolio AI" });
    await dialog.getByRole("button", { name: "O que é o SmartDataTest?" }).click();
    await expect(dialog.getByRole("log").getByRole("link").first()).toBeVisible({ timeout: 15_000 });
    await page.waitForTimeout(800); // espera o fade-in do painel terminar
    expect(await audit(page)).toEqual([]);
  });

  test("sem violações com o menu mobile aberto", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("./");
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
    await page.waitForTimeout(1200); // espera o fade-in dos itens do menu
    expect(await audit(page)).toEqual([]);
  });

  test("o link de pular para o conteúdo é o primeiro foco", async ({ page }) => {
    await page.goto("./");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Pular para o conteúdo" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
  });
});
