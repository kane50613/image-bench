import ImageResponse from "@takumi-rs/image-response";
import { ImageResponse as NextOgImageResponse } from "next/og";
import nstr from "nstr";
import { createElement } from "react";
import { objectKeys } from "ts-extras";
import * as z from "zod/mini";
import { HelloWorld } from "~/lib/templates/hello-world";
import { Tailwind } from "~/lib/templates/tailwind";
import { Vercel } from "~/lib/templates/vercel";

export const dynamic = "force-dynamic";

const providers = {
  takumi: takumiProvider,
  "next-og": nextOgProvider,
} as const;

const templates = {
  "hello-world": HelloWorld,
  vercel: Vercel,
  tailwind: Tailwind,
} as const;

const paramsSchema = z.object({
  provider: z.enum(objectKeys(providers)),
  template: z.enum(objectKeys(templates)),
  width: z.int().check(z.positive(), z.lte(1920)),
  height: z.int().check(z.positive(), z.lte(1080)),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { provider, template, width, height } = paramsSchema.parse({
    provider: searchParams.get("provider"),
    template: searchParams.get("template"),
    width: Number(searchParams.get("width")),
    height: Number(searchParams.get("height")),
  });

  const start = performance.now();

  const buffer = await providers[provider](
    template,
    width,
    height,
  ).arrayBuffer();

  const end = performance.now();

  return new Response(buffer, {
    headers: {
      "Content-Type": "image/png",
      "X-Duration": nstr(end - start, { maxDecimals: 1 }),
      "X-provider": provider,
    },
  });
}

function takumiProvider(
  template: keyof typeof templates,
  width: number,
  height: number,
) {
  return new ImageResponse(createElement(templates[template]), {
    width,
    height,
  });
}

function nextOgProvider(
  template: keyof typeof templates,
  width: number,
  height: number,
) {
  return new NextOgImageResponse(createElement(templates[template]), {
    width,
    height,
  });
}
