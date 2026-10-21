// Gera a imagem Open Graph (public/og-image.png, 1200x630) e os ícones do site
// (src/app/icon.png e src/app/apple-icon.png) renderizando HTML no Chromium do Playwright.
// Uso: npm run og   (precisa de internet para baixar as fontes do Google Fonts)
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const photo = await readFile(path.join(root, "src/assets/images/profile.webp"));
const photoUrl = `data:image/webp;base64,${photo.toString("base64")}`;

const fonts =
  '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@500&family=Syne:wght@700;800&display=block" rel="stylesheet">';

const baseCss = `
  * { margin: 0; box-sizing: border-box; }
  body { background: #08070a; color: #f4f0e9; font-family: "DM Sans", sans-serif; }
  .gold { background: linear-gradient(108deg, #f0bd76 0%, #e0a95e 42%, #c99a5e 70%, #a7ded9 130%);
          -webkit-background-clip: text; background-clip: text; color: transparent; }
`;

const ogHtml = `<!doctype html><html><head><meta charset="utf-8">${fonts}<style>
  ${baseCss}
  .canvas { position: relative; width: 1200px; height: 630px; overflow: hidden;
    background:
      radial-gradient(ellipse 60% 70% at 18% 0%, rgba(224,169,94,0.22), transparent 70%),
      radial-gradient(ellipse 45% 60% at 100% 60%, rgba(127,199,196,0.12), transparent 70%),
      #08070a; }
  .grid { position: absolute; inset: 0; opacity: .9;
    background-image: linear-gradient(rgba(224,169,94,0.06) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(224,169,94,0.06) 1px, transparent 1px);
    background-size: 64px 64px;
    -webkit-mask-image: linear-gradient(transparent, #000 20%, #000 80%, transparent); }
  .content { position: absolute; left: 80px; top: 70px; width: 680px; }
  .logo { font-family: Syne; font-weight: 800; font-size: 34px; letter-spacing: -0.02em; }
  .logo span { color: #e0a95e; }
  .eyebrow { margin-top: 54px; display: flex; align-items: center; gap: 14px; font-family: "JetBrains Mono";
    font-size: 15px; letter-spacing: .22em; text-transform: uppercase; color: #e0a95e; }
  .eyebrow::before { content: ""; width: 36px; height: 1px; background: rgba(224,169,94,.6); }
  h1 { margin-top: 20px; font-family: Syne; font-weight: 800; font-size: 98px; line-height: .92; letter-spacing: -0.03em; }
  .role { margin-top: 26px; font-family: Syne; font-weight: 700; font-size: 28px; white-space: nowrap; letter-spacing: -0.01em; }
  .meta { margin-top: 14px; font-size: 20px; color: #8f8779; }
  .url { position: absolute; left: 80px; bottom: 44px; font-family: "JetBrains Mono"; font-size: 16px;
    letter-spacing: .08em; color: #b8afa1; }
  .photo { position: absolute; right: 86px; top: 76px; width: 344px; height: 430px; border-radius: 32px;
    overflow: hidden; border: 1px solid rgba(224,169,94,.28); box-shadow: 0 30px 80px -20px rgba(0,0,0,.9); }
  .photo img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .photo::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, #08070a 0%, transparent 45%); }
  .glow { position: absolute; right: 40px; top: 40px; width: 440px; height: 500px;
    background: radial-gradient(circle at 50% 35%, rgba(224,169,94,.35), transparent 65%); filter: blur(30px); }
  .chip { position: absolute; padding: 9px 16px; border-radius: 999px; font-family: "JetBrains Mono"; font-size: 15px;
    color: #f0bd76; background: rgba(30,28,36,.92); border: 1px solid rgba(224,169,94,.28); }
</style></head><body><div class="canvas">
  <div class="grid"></div>
  <div class="glow"></div>
  <div class="content">
    <div class="logo">IS<span>.</span></div>
    <div class="eyebrow">QA · Fullstack · UI/UX · IA</div>
    <h1>Ícaro<br>Santos</h1>
    <div class="role gold">QA Engineer e Desenvolvedor Fullstack</div>
    <div class="meta">Testes, LLM + RAG e produtos web confiáveis</div>
  </div>
  <div class="url">icar0s.github.io/Portfolio-Base</div>
  <div class="photo"><img src="${photoUrl}" alt=""></div>
  <div class="chip" style="right:392px; top:118px">Playwright</div>
  <div class="chip" style="right:52px; top:200px">LLM + RAG</div>
  <div class="chip" style="right:380px; top:420px">UI/UX</div>
  <div class="chip" style="right:46px; top:470px">Fullstack</div>
</div></body></html>`;

const iconHtml = (size) => `<!doctype html><html><head><meta charset="utf-8">${fonts}<style>
  ${baseCss}
  body { background: transparent; }
  .icon { width: ${size}px; height: ${size}px; border-radius: ${Math.round(size * 0.22)}px; display: flex;
    align-items: center; justify-content: center; font-family: Syne; font-weight: 800;
    font-size: ${Math.round(size * 0.44)}px; letter-spacing: -0.04em;
    background: radial-gradient(circle at 30% 20%, #2a2116, #0e0d12 70%); border: ${Math.max(1, Math.round(size / 64))}px solid rgba(224,169,94,.35); }
  .icon span:last-child { color: #e0a95e; }
</style></head><body><div class="icon"><span class="gold">IS</span><span>.</span></div></body></html>`;

const browser = await chromium.launch();

async function render(html, width, height, file, transparent = false) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, file), omitBackground: transparent });
  await page.close();
  console.log(`gerado: ${file}`);
}

await render(ogHtml, 1200, 630, "public/og-image.png");
await render(iconHtml(192), 192, 192, "src/app/icon.png", true);
await render(iconHtml(180), 180, 180, "src/app/apple-icon.png");
await browser.close();
