import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { NextConfig } from "next";

const takumiCoreEntryPath = import.meta.resolve("@takumi-rs/core");
const { optionalDependencies } = JSON.parse(
  readFileSync(join(dirname(takumiCoreEntryPath), "package.json"), "utf8"),
) as { optionalDependencies?: Record<string, string> };

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  outputFileTracingIncludes: {
    "/*": Object.keys(optionalDependencies ?? {}).map((pkg) => `./node_modules/${pkg}/**/*`),
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
