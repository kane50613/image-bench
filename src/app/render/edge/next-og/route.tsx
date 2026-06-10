import { ImageResponse as VercelImageResponse } from "next/og";
import { createElement } from "react";
import { handleRender, noStoreHeaders, type ProviderFn, templates } from "../../shared";
import { loadFonts } from "../fonts";

// Separate edge function from takumi so each WASM bundle stays under
// Vercel's edge function size limit.
export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const fonts = await loadFonts();

  const nextOgEdgeProvider: ProviderFn = (template, width, height) =>
    new VercelImageResponse(createElement(templates[template]), {
      width,
      height,
      headers: noStoreHeaders,
      fonts,
      emoji: "twemoji",
    });

  return handleRender(request, { "next-og-edge": nextOgEdgeProvider });
}
