import { readFile } from "node:fs/promises";
import { join } from "node:path";
import ImageResponse from "@takumi-rs/image-response";
import { ImageResponse as VercelImageResponse } from "next/og";
import nstr from "nstr";
import { createElement } from "react";
import { objectKeys } from "ts-extras";
import * as z from "zod/mini";
import { AnalyticsDashboard } from "~/lib/templates/analytics";
import Docs from "~/lib/templates/docs";
import { Ecommerce } from "~/lib/templates/ecommerce";
import { Gradients } from "~/lib/templates/gradients";
import { HelloWorld } from "~/lib/templates/hello-world";
import { Rauchg } from "~/lib/templates/rauchg";
import { SocialPost } from "~/lib/templates/social";
import { Tailwind } from "~/lib/templates/tailwind";
import { Vercel } from "~/lib/templates/vercel";

export const dynamic = "force-dynamic";

export const providers = {
  takumi: takumiProvider,
  "takumi-webp": takumiWebpProvider,
  "next-og": nextOgProvider,
} as const;

export const templates = {
  "hello-world": HelloWorld,
  vercel: Vercel,
  tailwind: Tailwind,
  rauchg: Rauchg,
  gradients: Gradients,
  docs: Docs,
  ecommerce: Ecommerce,
  social: SocialPost,
  analytics: AnalyticsDashboard,
} as const;

const headers = {
  "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
  Pragma: "no-cache",
  Expires: "0",
} as const;

const paramsSchema = z.object({
  provider: z.enum(objectKeys(providers)),
  template: z.enum(objectKeys(templates)),
  width: z.int().check(z.positive(), z.lte(1920)),
  height: z.int().check(z.positive(), z.lte(1080)),
});

const fonts = await Promise.all(
  [
    {
      name: "Geist",
      fileName: "Geist-Regular.ttf",
      weight: 400 as const,
    },
    {
      name: "Geist",
      fileName: "Geist-Bold.ttf",
      weight: 700 as const,
    },
    {
      name: "Geist Mono",
      fileName: "GeistMono-Regular.ttf",
      weight: 400 as const,
    },
    {
      name: "Geist Mono",
      fileName: "GeistMono-Bold.ttf",
      weight: 700 as const,
    },
  ].map(async ({ name, fileName, weight }) => ({
    name,
    data: await readFile(join(process.cwd(), "public", "fonts", "geist", fileName)),
    weight,
    style: "normal" as const,
  })),
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { provider, template, width, height } = paramsSchema.parse({
    provider: searchParams.get("provider"),
    template: searchParams.get("template"),
    width: Number(searchParams.get("width")),
    height: Number(searchParams.get("height")),
  });

  const start = performance.now();

  const response = providers[provider](template, width, height);
  const headers = response.headers;

  const buffer = await response.arrayBuffer();

  const end = performance.now();

  headers.set("X-Duration", nstr(end - start, { maxDecimals: 1 }));
  headers.set("X-provider", provider);

  return new Response(buffer, { headers });
}

function takumiProvider(template: keyof typeof templates, width: number, height: number) {
  return new ImageResponse(createElement(templates[template]), {
    width,
    height,
    format: "png",
    headers,
    fonts,
    emoji: "twemoji",
  });
}

function takumiWebpProvider(template: keyof typeof templates, width: number, height: number) {
  return new ImageResponse(createElement(templates[template]), {
    width,
    height,
    format: "webp",
    quality: 100,
    headers,
    fonts,
    emoji: "twemoji",
  });
}

function nextOgProvider(template: keyof typeof templates, width: number, height: number) {
  return new VercelImageResponse(createElement(templates[template]), {
    width,
    height,
    headers,
    fonts,
    emoji: "twemoji",
  });
}
