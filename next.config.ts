import type { NextConfig } from "next";

// O site é publicado em https://icar0s.github.io/Portfolio-Base/, então todas as
// rotas e assets precisam do prefixo do repositório.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/Portfolio-Base";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  poweredByHeader: false,
  reactStrictMode: true,
  // Necessário para o 404 próprio (src/app/global-not-found.tsx) com dois root layouts.
  experimental: { globalNotFound: true },
};

export default nextConfig;
