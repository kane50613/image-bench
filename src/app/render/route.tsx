import ImageResponse from "@takumi-rs/image-response";
import { ImageResponse as NextOgImageResponse } from "next/og";
import nstr from "nstr";
import { createElement } from "react";
import { objectKeys } from "ts-extras";
import * as z from "zod/mini";
import { HelloWorld } from "~/lib/variants/hello-world";
import { Tailwind } from "~/lib/variants/tailwind";
import { Vercel } from "~/lib/variants/vercel";

export const dynamic = "force-dynamic";

const providers = {
  takumi: takumiProvider,
  "next-og": nextOgProvider,
} as const;

const variants = {
  "hello-world": HelloWorld,
  vercel: Vercel,
  tailwind: Tailwind,
} as const;

const paramsSchema = z.object({
  provider: z.enum(objectKeys(providers)),
  variant: z.enum(objectKeys(variants)),
  width: z.int().check(z.positive(), z.lte(1920)),
  height: z.int().check(z.positive(), z.lte(1080)),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { provider, variant, width, height } = paramsSchema.parse({
    provider: searchParams.get("provider"),
    variant: searchParams.get("variant"),
    width: Number(searchParams.get("width")),
    height: Number(searchParams.get("height")),
  });

  const start = performance.now();

  const buffer = await providers[provider](
    variant,
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
  variant: keyof typeof variants,
  width: number,
  height: number,
) {
  return new ImageResponse(createElement(variants[variant]), {
    width,
    height,
  });
}

function nextOgProvider(
  variant: keyof typeof variants,
  width: number,
  height: number,
) {
  return new NextOgImageResponse(createElement(variants[variant]), {
    width,
    height,
  });
}
