import { expect, test } from "./fixtures";

const isWide = (width: number | undefined) => (width ?? 0) >= 1024;

test.describe("Navegação", () => {
  test("carrega a home sem erros no console", async ({ page, consoleErrors }) => {
    await page.goto("./");
    await expect(page).toHaveTitle(/Ícaro Santos/);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page.getByRole("heading", { level: 1, name: "Ícaro Santos" })).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
    await page.waitForLoadState("networkidle");
    expect(consoleErrors).toEqual([]);
  });

  test("links da navbar rolam até cada seção e atualizam a URL", async ({ page }) => {
    test.skip(!isWide(page.viewportSize()?.width), "Abaixo de 1024px a navegação fica no menu.");
    await page.goto("./");
    const nav = page.getByRole("navigation", { name: "Navegação principal" });
    const sections = [
      ["Sobre", "sobre"],
      ["Habilidades", "habilidades"],
      ["Trajetória", "trajetoria"],
      ["Projetos", "projetos"],
      ["Pesquisa", "pesquisa"],
      ["Contato", "contato"],
    ] as const;
    for (const [label, id] of sections) {
      await nav.getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`#${id} h2`).first()).toBeInViewport();
    }
    // O link da seção ativa fica marcado.
    await expect(nav.getByRole("link", { name: "Contato", exact: true })).toHaveAttribute(
      "aria-current",
      "location",
    );
  });

  test("menu mobile abre, navega, fecha com Esc e devolve o foco", async ({ page }) => {
    test.skip(isWide(page.viewportSize()?.width), "O menu hambúrguer só existe abaixo de 1024px.");
    await page.goto("./");
    const toggle = page.getByRole("button", { name: "Abrir menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();

    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await menu.getByRole("link", { name: /Habilidades/ }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(/#habilidades$/);
    await expect(page.locator("#habilidades h2")).toBeInViewport();

    await toggle.click();
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(toggle).toBeFocused();
  });

  test("troca de idioma leva à versão em inglês e volta", async ({ page }) => {
    await page.goto("./");
    await page.getByRole("link", { name: "Read in English" }).first().click();
    await expect(page).toHaveURL(/\/Portfolio-Base\/en\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 2, name: "The tools behind my work" })).toBeAttached();
    await page.getByRole("link", { name: "Ler em português" }).first().click();
    await expect(page).toHaveURL(/\/Portfolio-Base\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  });

  test("botões do hero levam às seções e ao currículo em PDF", async ({ page, request }) => {
    await page.goto("./");
    const cv = page.getByRole("link", { name: /Baixar CV/ });
    const href = await cv.getAttribute("href");
    expect(href).toBe("/Portfolio-Base/cv-icaro-santos.pdf");
    const response = await request.get(href!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");

    await page.getByRole("link", { name: "Ver projetos" }).click();
    await expect(page).toHaveURL(/#projetos$/);
    await expect(page.locator("#projetos h2")).toBeInViewport();
  });

  test("abas de habilidades funcionam com o teclado", async ({ page }) => {
    await page.goto("./");
    const tablist = page.getByRole("tablist", { name: "Categorias de habilidades" });
    const tabs = tablist.getByRole("tab");
    const panel = page.getByRole("tabpanel");

    await tabs.first().focus();
    await page.keyboard.press("ArrowDown");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.nth(1)).toBeFocused();
    await expect(panel).toHaveAttribute("aria-labelledby", (await tabs.nth(1).getAttribute("id"))!);

    await page.keyboard.press("End");
    await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("Home");
    await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
    await expect(panel.getByRole("listitem").first()).toBeVisible();
  });
});
