import { expect, test } from "./fixtures";

const SITE = "https://icar0s.github.io/Portfolio-Base/";
const PLACEHOLDER = /\[(INSERIR|PREENCHER|CONFIRMAR)|INSERIR LINK/i;

test.describe("Links", () => {
  test("nenhum link vazio, com placeholder ou quebrado em todas as páginas", async ({
    page,
    request,
    baseURL,
  }) => {
    const xml = await (await request.get("sitemap.xml")).text();
    const pages = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]!.replace(SITE, ""));
    expect(pages.length).toBeGreaterThan(2);

    const origin = new URL(baseURL!).origin;
    const status = new Map<string, number>();
    const html = new Map<string, string>();

    for (const path of pages) {
      await page.goto(path);
      await expect(page.locator("a:not([href])")).toHaveCount(0);
      const links = await page.$$eval("a[href]", (anchors) =>
        anchors.map((anchor) => ({
          raw: anchor.getAttribute("href") ?? "",
          resolved: (anchor as HTMLAnchorElement).href,
          text: anchor.textContent?.trim() ?? "",
        })),
      );

      for (const link of links) {
        const where = `"${link.raw}" (${link.text || "sem texto"}) em /${path}`;
        expect(link.raw.trim(), where).not.toBe("");
        expect(link.raw, where).not.toBe("#");
        expect(link.raw, where).not.toMatch(PLACEHOLDER);

        const url = new URL(link.resolved);
        if (url.protocol === "mailto:") {
          expect(url.pathname, where).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i);
          continue;
        }
        if (url.origin !== origin) {
          expect(url.protocol, where).toBe("https:");
          continue;
        }

        const key = `${url.origin}${url.pathname}`;
        if (!status.has(key)) {
          const response = await request.get(key);
          status.set(key, response.status());
          if ((response.headers()["content-type"] ?? "").includes("text/html"))
            html.set(key, await response.text());
        }
        expect(status.get(key), where).toBe(200);

        if (url.hash) {
          const id = decodeURIComponent(url.hash.slice(1));
          expect(html.get(key) ?? "", `âncora #${id} inexistente: ${where}`).toContain(`id="${id}"`);
        }
      }
    }
  });
});
