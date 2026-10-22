// Servidor estático que imita o GitHub Pages: publica `out/` em /Portfolio-Base/,
// redireciona pastas para a versão com barra final, comprime texto com gzip
// e responde 404.html quando não acha o arquivo.
// Uso: npm run build && npm start   (PORT=4173 por padrão)
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createGzip } from "node:zlib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/Portfolio-Base";
const port = Number(process.env.PORT ?? 4173);
const host = process.env.HOST ?? "127.0.0.1";

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

async function fileInfo(filePath) {
  try {
    return await stat(filePath);
  } catch {
    return null;
  }
}

const compressible = /^(text\/|application\/(json|xml)|image\/svg)/;

function send(request, response, filePath, status = 200) {
  const type = types[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
  const immutable = filePath.includes(`${path.sep}_next${path.sep}static${path.sep}`);
  const gzip = compressible.test(type) && /gzip/.test(request.headers["accept-encoding"] ?? "");
  response.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": immutable ? "public, max-age=31536000, immutable" : "no-cache",
    Vary: "Accept-Encoding",
    ...(gzip ? { "Content-Encoding": "gzip" } : {}),
  });
  const stream = createReadStream(filePath);
  (gzip ? stream.pipe(createGzip()) : stream).pipe(response);
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host}`);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === "/" || pathname === basePath) {
    response.writeHead(301, { Location: `${basePath}/` });
    response.end();
    return;
  }

  if (!pathname.startsWith(`${basePath}/`)) {
    send(request, response, path.join(root, "404.html"), 404);
    return;
  }

  pathname = pathname.slice(basePath.length);
  const target = path.join(root, pathname);
  if (!target.startsWith(root)) {
    response.writeHead(403);
    response.end();
    return;
  }

  const info = await fileInfo(target);
  if (info?.isDirectory()) {
    if (!pathname.endsWith("/")) {
      response.writeHead(301, { Location: `${basePath}${pathname}/${url.search}` });
      response.end();
      return;
    }
    const index = path.join(target, "index.html");
    if (await fileInfo(index)) {
      send(request, response, index);
      return;
    }
  } else if (info?.isFile()) {
    send(request, response, target);
    return;
  }

  send(request, response, path.join(root, "404.html"), 404);
});

server.listen(port, host, () => {
  console.log(`Servindo ${root} em http://${host}:${port}${basePath}/`);
});
