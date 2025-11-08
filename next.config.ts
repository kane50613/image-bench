import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  serverExternalPackages: ["@takumi-rs/core"],
  typedRoutes: true,
};

export default nextConfig;
