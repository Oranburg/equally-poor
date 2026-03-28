import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/equally-poor",
  assetPrefix: "/equally-poor/",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
