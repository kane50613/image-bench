import nstr from "nstr";
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

export const noStoreHeaders = {
  "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
  Pragma: "no-cache",
  Expires: "0",
} as const;

export type ProviderFn = (
  template: keyof typeof templates,
  width: number,
  height: number,
) => Response;

const paramsSchema = z.object({
  template: z.enum(objectKeys(templates)),
  width: z.int().check(z.positive(), z.lte(1920)),
  height: z.int().check(z.positive(), z.lte(1080)),
});

export async function handleRender(request: Request, providers: Record<string, ProviderFn>) {
  const { searchParams } = new URL(request.url);

  const providerKey = searchParams.get("provider") ?? "";
  const provider = providers[providerKey];
  if (!provider) {
    return new Response(`Unknown provider: ${providerKey}`, { status: 400 });
  }

  const { template, width, height } = paramsSchema.parse({
    template: searchParams.get("template"),
    width: Number(searchParams.get("width")),
    height: Number(searchParams.get("height")),
  });

  const start = performance.now();

  const response = provider(template, width, height);
  const headers = response.headers;

  const buffer = await response.arrayBuffer();

  const end = performance.now();

  headers.set("X-Duration", nstr(end - start, { maxDecimals: 1 }));
  headers.set("X-Provider", providerKey);

  return new Response(buffer, { headers });
}
