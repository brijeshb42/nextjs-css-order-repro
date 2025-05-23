import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
    workerThreads: false,
    cpus: 3,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  ...(process.env.NODE_ENV === "production" && { distDir: "export", output: "export" }),
};

export default nextConfig;
