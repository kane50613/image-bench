import ImageResponse from "@takumi-rs/image-response";
import ImageResponseWasm from "@takumi-rs/image-response/wasm";
import module from "@takumi-rs/wasm/next";
import { ImageResponse as VercelImageResponse } from "next/og";
import { ImageResponse as VercelOgSharpImageResponse } from "@vercel/og-sharp"
import nstr from "nstr";
import { createElement } from "react";
import { objectKeys } from "ts-extras";
import * as z from "zod/mini";
import Docs from "~/lib/templates/docs";
import { Gradients } from "~/lib/templates/gradients";
import { HelloWorld } from "~/lib/templates/hello-world";
import { Rauchg } from "~/lib/templates/rauchg";
import { Tailwind } from "~/lib/templates/tailwind";
import { Vercel } from "~/lib/templates/vercel";

export const dynamic = "force-dynamic";

const providers = {
  takumi: takumiProvider,
  "takumi-webp": takumiWebpProvider,
  "vercel-og": vercelOgProvider,
  "vercel-og-sharp": vercelOgSharpProvider,
  "takumi-wasm": takumiWasmProvider,
  "takumi-wasm-webp": takumiWasmWebpProvider,
} as const;

const templates = {
  "hello-world": HelloWorld,
  vercel: Vercel,
  tailwind: Tailwind,
  rauchg: Rauchg,
  gradients: Gradients,
  docs: Docs,
} as const;

const paramsSchema = z.object({
  provider: z.enum(objectKeys(providers)),
  template: z.enum(objectKeys(templates)),
  width: z.int().check(z.positive(), z.lte(1920)),
  height: z.int().check(z.positive(), z.lte(1080)),
});

const fonts = [
  {
    name: "Geist",
    data: await fetch("https://takumi.kane.tw/fonts/Geist.woff2").then((r) =>
      r.arrayBuffer(),
    ),
  },
  {
    name: "Geist Mono",
    data: await fetch("https://takumi.kane.tw/fonts/GeistMono.woff2").then(
      (r) => r.arrayBuffer(),
    ),
  },
];

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

function takumiProvider(
  template: keyof typeof templates,
  width: number,
  height: number,
) {
  return new ImageResponse(createElement(templates[template]), {
    width,
    height,
    format: "png",
  });
}

function takumiWebpProvider(
  template: keyof typeof templates,
  width: number,
  height: number,
) {
  return new ImageResponse(createElement(templates[template]), {
    width,
    height,
    format: "webp",
  });
}

function vercelOgProvider(
  template: keyof typeof templates,
  width: number,
  height: number,
) {
  return new VercelImageResponse(createElement(templates[template]), {
    width,
    height,
  });
}

function vercelOgSharpProvider(
  template: keyof typeof templates,
  width: number,
  height: number,
) {
  return new VercelOgSharpImageResponse(createElement(templates[template]), {
    width,
    height,
  });
}

function takumiWasmProvider(
  template: keyof typeof templates,
  width: number,
  height: number,
) {
  return new ImageResponseWasm(createElement(templates[template]), {
    width,
    height,
    format: "png",
    module,
    fonts,
  });
}

function takumiWasmWebpProvider(
  template: keyof typeof templates,
  width: number,
  height: number,
) {
  return new ImageResponseWasm(createElement(templates[template]), {
    width,
    height,
    format: "webp",
    module,
    fonts,
  });
}
