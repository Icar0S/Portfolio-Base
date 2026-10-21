import { expect, revealAll, test } from "./fixtures";

async function horizontalOverflow(page: import("@playwright/test").Page) {
  return page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
}

test.describe("Responsividade", () => {
  test("sem rolagem horizontal de 320px a 1440px", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "A varredura de larguras roda no projeto desktop.");
    test.setTimeout(300_000);
    for (const width of [320, 360, 375, 414, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ["./", "projetos/smartdatatest/"]) {
        await page.goto(path);
        await revealAll(page);
        expect(await horizontalOverflow(page), `overflow em ${width}px (/${path})`).toBeLessThanOrEqual(0);
      }
    }
  });

  test("sem rolagem horizontal no dispositivo emulado", async ({ page }) => {
    await page.goto("./");
    await revealAll(page);
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
  });

  test("captura de tela da home e de um projeto", async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const [name, path] of [
      ["home", "./"],
      ["projeto", "projetos/smartdatatest/"],
    ] as const) {
      await page.goto(path);
      await revealAll(page);
      const file = testInfo.outputPath(`${name}-${testInfo.project.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      await testInfo.attach(`${name}-${testInfo.project.name}`, { path: file, contentType: "image/png" });
    }
  });
});
