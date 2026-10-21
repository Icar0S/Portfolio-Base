const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test.beforeEach(async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
});

test("primary navigation reaches the requested sections", async ({ page, isMobile }) => {
  const menu = page.getByRole("button", { name: "Menu" });
  if (isMobile) await menu.click();
  await page.getByRole("link", { name: "Projetos", exact: true }).first().click();
  await expect(page).toHaveURL(/#projetos$/);
  await expect(page.getByRole("heading", { name: "Projetos com propósito." })).toBeVisible();

  if (isMobile) await menu.click();
  await page.getByRole("link", { name: "Pesquisa", exact: true }).click();
  await expect(page).toHaveURL(/#pesquisa$/);
  await expect(page.getByRole("heading", { name: /Testar sistemas inteligentes/ })).toBeVisible();
});

test("all in-page links resolve and no link uses an empty or placeholder URL", async ({ page }) => {
  const links = page.locator("a");
  const count = await links.count();

  for (let index = 0; index < count; index += 1) {
    const link = links.nth(index);
    const href = await link.getAttribute("href");
    expect(href, `Link ${index} should have a destination`).toBeTruthy();
    expect(href, `Link ${index} must not use a placeholder href`).not.toBe("#");
    if (href.startsWith("#")) {
      await expect(page.locator(href)).toHaveCount(1);
    }
  }
});

test("mobile navigation opens, navigates, and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile menu behavior is covered on the mobile project.");
  const menu = page.getByRole("button", { name: "Menu" });

  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("link", { name: "Habilidades", exact: true }).click();
  await expect(page).toHaveURL(/#habilidades$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("layout remains within the viewport on mobile", async ({ page, isMobile }) => {
  test.skip(!isMobile, "This assertion targets the mobile viewport.");
  const dimensions = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
  }));
  expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
});

test("layout has no horizontal overflow at common viewport sizes", async ({ page, isMobile }) => {
  test.skip(isMobile, "Responsive breakpoints are covered on the desktop browser project.");
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.documentWidth, `Horizontal overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewportWidth);
  }
});

test("theme control switches between dark and light themes", async ({ page }) => {
  const menu = page.getByRole("button", { name: "Menu" });
  if (await menu.isVisible()) await menu.click();
  const themeToggle = page.getByRole("button", { name: /Ativar tema|theme/ });
  const initialTheme = await page.locator("html").getAttribute("data-theme");

  await themeToggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", initialTheme === "dark" ? "light" : "dark");
});

test("page meets axe WCAG 2.1 AA checks", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "domcontentloaded" });
  const menu = page.getByRole("button", { name: "Menu" });
  if (await menu.isVisible()) await menu.click();
  const themeToggle = page.getByRole("button", { name: /Ativar tema|theme/ });
  const initialTheme = await page.locator("html").getAttribute("data-theme");
  const themes = [initialTheme, initialTheme === "dark" ? "light" : "dark"];

  for (const [index, theme] of themes.entries()) {
    if (index > 0) await themeToggle.click();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations, `Accessibility violations in ${theme} theme`).toEqual([]);
  }
});

test("language switcher opens the translated page and returns to Portuguese", async ({ page }) => {
  const menu = page.getByRole("button", { name: "Menu" });
  if (await menu.isVisible()) await menu.click();
  await page.getByRole("link", { name: "Switch language to English" }).click();
  await expect(page).toHaveURL(/index-en\.html$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: /Quality in every line/ })).toBeVisible();

  const englishMenu = page.getByRole("button", { name: "Menu" });
  if (await englishMenu.isVisible()) await englishMenu.click();
  await page.getByRole("link", { name: "Switch language to Portuguese" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
});

test("English page uses English metadata and passes axe WCAG 2.1 AA", async ({ page }) => {
  await page.goto("/index-en.html", { waitUntil: "domcontentloaded" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page).toHaveTitle(/Software quality, testing and research/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
