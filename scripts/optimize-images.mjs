// Converte as imagens originais de `assets/` em WebP otimizados em `src/assets/images/`.
// Uso: npm run images
//
// Para trocar uma imagem, substitua o arquivo de origem em `assets/` (mantendo o nome)
// e rode o script de novo. Os arquivos gerados são importados pelos dados em `src/data`.
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = (file) => path.join(root, "assets", file);
const output = path.join(root, "src", "assets", "images");

/**
 * Cada entrada descreve um arquivo de saída.
 * - crop: recorte em pixels da imagem original (antes do resize)
 * - width/height: tamanho final; com os dois definidos, a imagem é recortada (cover)
 */
const jobs = [
  // Retrato do hero (4:5), recortado a partir do topo da foto de estúdio.
  {
    from: "Icaro Santos (58).jpg",
    to: "profile.webp",
    crop: { left: 0, top: 0, width: 3008, height: 3760 },
    width: 800,
    height: 1000,
    quality: 80,
  },
  // Capturas das plataformas e empresas.
  { from: "fnde-ADB.jpeg", to: "fnde-antonieta-de-barros.webp", width: 1280, quality: 80 },
  // Remove o banner de cookies da parte de baixo da captura.
  {
    from: "bdf.jpeg",
    to: "big-data-fortaleza.webp",
    crop: { left: 0, top: 0, width: 1600, height: 664 },
    width: 1280,
    quality: 80,
  },
  // Remove o botão flutuante de WhatsApp do canto inferior.
  {
    from: "bynd.jpeg",
    to: "bynd.webp",
    crop: { left: 0, top: 0, width: 1600, height: 680 },
    width: 1280,
    quality: 80,
  },
  { from: "pink app.jpeg", to: "pinkapp.webp", width: 1280, quality: 80 },
  { from: "smartdatatest-home.png", to: "smartdatatest.webp", width: 1600, height: 1000, quality: 78 },
  { from: "adotspets-login.png", to: "adotspets-login.webp", width: 1280, quality: 80 },
  { from: "adotspets-adotar.png", to: "adotspets-adotar.webp", width: 1280, quality: 80 },
  { from: "adotspets-divulgar.png", to: "adotspets-divulgar.webp", width: 1280, quality: 80 },
  { from: "adotspets-dashboards.png", to: "adotspets-dashboards.webp", width: 1280, quality: 80 },
  { from: "logo-idapt-ofc.png", to: "adotspets-logo.webp", width: 400, quality: 85 },
  { from: "dashboards-web-home.png", to: "dashboards-web-home.webp", width: 1280, quality: 80 },
  { from: "dashboards-web-charts.png", to: "dashboards-web-charts.webp", width: 1193, quality: 80 },
  { from: "dashboards-web-admin.png", to: "dashboards-web-admin.webp", width: 1280, quality: 80 },
];

await mkdir(output, { recursive: true });

for (const job of jobs) {
  let pipeline = sharp(source(job.from)).rotate();
  if (job.crop) pipeline = pipeline.extract(job.crop);
  pipeline = pipeline.resize({
    width: job.width,
    height: job.height,
    fit: job.height ? "cover" : "inside",
    position: "top",
    withoutEnlargement: true,
  });
  const target = path.join(output, job.to);
  const info = await pipeline.webp({ quality: job.quality, effort: 6 }).toFile(target);
  const { size } = await stat(target);
  console.log(`${job.to.padEnd(34)} ${info.width}x${info.height}  ${(size / 1024).toFixed(1)} KB`);
}
