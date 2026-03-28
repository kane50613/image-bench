import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["takumi-js"],
  turbopack: {
    root: import.meta.dirname,
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
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
