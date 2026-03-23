import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  outputFileTracingIncludes: {
    "/*": [
      "node_modules/@takumi-rs/core-darwin-x64/**/*",
      "node_modules/@takumi-rs/core-darwin-arm64/**/*",
      "node_modules/@takumi-rs/core-linux-arm64-gnu/**/*",
      "node_modules/@takumi-rs/core-linux-arm64-musl/**/*",
      "node_modules/@takumi-rs/core-win32-arm64-msvc/**/*",
      "node_modules/@takumi-rs/core-linux-x64-gnu/**/*",
      "node_modules/@takumi-rs/core-linux-x64-musl/**/*",
      "node_modules/@takumi-rs/core-win32-x64-msvc/**/*",
    ],
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
