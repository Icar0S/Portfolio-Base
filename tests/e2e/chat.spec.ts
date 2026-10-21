import { expect, test } from "./fixtures";

test.describe("Portfolio AI", () => {
  test("responde com trecho do site, cita a fonte e trata perguntas sem resposta", async ({ page }) => {
    await page.goto("./");
    const launcher = page.getByRole("button", { name: "Abrir o assistente Portfolio AI" });
    await launcher.click();

    const dialog = page.getByRole("dialog", { name: "Portfolio AI" });
    await expect(dialog).toBeVisible();
    const input = dialog.getByRole("textbox", { name: "Sua pergunta" });
    await expect(input).toBeFocused();

    const log = dialog.getByRole("log");
    await dialog.getByRole("button", { name: "O que é o SmartDataTest?" }).click();
    await expect(log).toContainText("Plataforma web que integra LLMs e RAG");
    await expect(log.getByRole("link", { name: /Projetos › SmartDataTest/ })).toBeVisible({
      timeout: 15_000,
    });

    await input.fill("Quais ferramentas de QA ele usa?");
    await dialog.getByRole("button", { name: "Enviar pergunta" }).click();
    await expect(log).toContainText("Playwright");

    await input.fill("Qual a pesquisa de doutorado dele?");
    await input.press("Enter");
    await expect(log).toContainText(/LLM/);

    await input.fill("receita de bolo de chocolate");
    await input.press("Enter");
    await expect(log).toContainText("Não encontrei isso no portfólio");
    await expect(log.getByRole("link", { name: "Ir para o contato" })).toBeVisible({ timeout: 15_000 });

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(launcher).toBeFocused();
  });

  test("mantém o foco do teclado dentro do painel", async ({ page }) => {
    await page.goto("./");
    await page.getByRole("button", { name: "Abrir o assistente Portfolio AI" }).click();
    const dialog = page.getByRole("dialog", { name: "Portfolio AI" });
    await expect(dialog).toBeVisible();
    for (let index = 0; index < 8; index += 1) {
      await page.keyboard.press("Tab");
      expect(await dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
    }
  });

  test("a citação leva até a seção de origem", async ({ page }) => {
    await page.goto("./");
    await page.getByRole("button", { name: "Abrir o assistente Portfolio AI" }).click();
    const dialog = page.getByRole("dialog", { name: "Portfolio AI" });
    await dialog.getByRole("textbox", { name: "Sua pergunta" }).fill("Como entrar em contato por e-mail?");
    await dialog.getByRole("button", { name: "Enviar pergunta" }).click();
    const source = dialog.getByRole("log").getByRole("link", { name: "Contato" });
    await expect(source).toBeVisible({ timeout: 15_000 });
    await source.click();
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/#contato$/);
    await expect(page.locator("#contato h2")).toBeInViewport();
  });
});
