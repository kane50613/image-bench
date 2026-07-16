import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@takumi-rs/core"],
  turbopack: {
    root: import.meta.dirname,
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
    useTypeScriptCli: true,
  },
  typedRoutes: true,
  reactStrictMode: false,
  redirects: () => [
    {
      source: "/",
      destination: "/t/hello-world",
      statusCode: 302,
    },
  ],
};

export default nextConfig;
