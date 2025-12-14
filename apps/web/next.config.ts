import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@koma/core", "@koma/database", "@koma/metadata"],
  reactCompiler: true,
};

export default nextConfig;
