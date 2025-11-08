import ImageResponse from "@takumi-rs/image-response";
import { ImageResponse as NextOgImageResponse } from "next/og";
import { createElement } from "react";
import { objectKeys } from "ts-extras";
import * as z from "zod/mini";
import { variants } from "~/lib/const";

export const dynamic = "force-dynamic";

const providers = {
  takumi: takumiProvider,
  "next-og": nextOgProvider,
} as const;

const paramsSchema = z.object({
  provider: z.enum(objectKeys(providers)),
  variant: z.enum(objectKeys(variants)),
  width: z.int().check(z.positive(), z.lte(1920)),
  height: z.int().check(z.positive(), z.lte(1080)),
});

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { provider, variant, width, height } = paramsSchema.parse({
    provider: searchParams.get("provider"),
    variant: searchParams.get("variant"),
    width: Number(searchParams.get("width")),
    height: Number(searchParams.get("height")),
  });

  return providers[provider](variant, width, height);
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
  _variant: keyof typeof variants,
  width: number,
  height: number,
) {
  return new NextOgImageResponse(createElement(variants[_variant]), {
    width,
    height,
  });
}
