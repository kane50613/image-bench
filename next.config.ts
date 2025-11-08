import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  serverExternalPackages: ["@takumi-rs/core"],
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
