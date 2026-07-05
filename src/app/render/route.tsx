import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse as VercelImageResponse } from "next/og";
import { createElement } from "react";
import ImageResponse from "takumi-js/response";
import { handleRender, noStoreHeaders, templates } from "./shared";

export const dynamic = "force-dynamic";

export { templates };

export const providers = {
  takumi: takumiProvider,
  "takumi-webp": takumiWebpProvider,
  "next-og": nextOgProvider,
} as const;

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

export function GET(request: Request) {
  return handleRender(request, providers);
}

const fetchCache = new Map();

function takumiProvider(template: keyof typeof templates, width: number, height: number) {
  return new ImageResponse(createElement(templates[template]), {
    width,
    height,
    format: "png",
    headers: noStoreHeaders,
    fonts,
    emoji: "twemoji",
    images: {
      fetchCache: fetchCache,
    },
  });
}

function takumiWebpProvider(template: keyof typeof templates, width: number, height: number) {
  return new ImageResponse(createElement(templates[template]), {
    width,
    height,
    format: "webp",
    quality: 100,
    headers: noStoreHeaders,
    fonts,
    emoji: "twemoji",
    images: {
      fetchCache: fetchCache,
    },
  });
}

function nextOgProvider(template: keyof typeof templates, width: number, height: number) {
  return new VercelImageResponse(createElement(templates[template]), {
    width,
    height,
    headers: noStoreHeaders,
    fonts,
    emoji: "twemoji",
  });
}
