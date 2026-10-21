// Ajustes no `out/` depois do `next build` (rodado automaticamente pelo npm como "postbuild").
//
// 1. Contorna um bug do export estático do Next.js no Windows: os arquivos de prefetch por
//    segmento deveriam se chamar `__next.<segmentos separados por ponto>.txt`, mas o Next usa
//    `path.relative` (que no Windows devolve "\") e acaba gravando pastas aninhadas. O navegador
//    pede o nome "achatado" e recebe 404. No Linux (GitHub Actions) não há nada a corrigir.
// 2. Garante o `.nojekyll` na raiz publicada.
import { cp, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(directory, entry.name);
      return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
    }),
  );
  return files.flat();
}

let flattened = 0;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of await listFiles(fullPath)) {
        const flatName = path.relative(directory, file).split(path.sep).join(".");
        await cp(file, path.join(directory, flatName));
        flattened += 1;
      }
      await rm(fullPath, { recursive: true, force: true });
    } else {
      await walk(fullPath);
    }
  }
}

try {
  await stat(outDir);
} catch {
  console.error("postbuild: pasta out/ não encontrada — rode `next build` antes.");
  process.exit(1);
}

await walk(outDir);
await writeFile(path.join(outDir, ".nojekyll"), "");
console.log(
  flattened > 0
    ? `postbuild: ${flattened} arquivos de prefetch renomeados (correção para Windows).`
    : "postbuild: nada a corrigir.",
);
