import { createElement } from "react";
import ImageResponse from "takumi-js/response";
import { handleRender, noStoreHeaders, type ProviderFn, templates } from "../../shared";
import { loadFonts } from "../fonts";

// Separate edge function from next-og so each WASM bundle stays under
// Vercel's edge function size limit.
export const runtime = "edge";
export const dynamic = "force-dynamic";

const fetchCache = new Map();

export async function GET(request: Request) {
  const fonts = await loadFonts();

  const takumiWasmProvider: ProviderFn = (template, width, height) =>
    new ImageResponse(createElement(templates[template]), {
      width,
      height,
      format: "png",
      headers: noStoreHeaders,
      fonts,
      emoji: "twemoji",
      resourcesOptions: {
        cache: fetchCache,
      },
    });

  return handleRender(request, { "takumi-wasm": takumiWasmProvider });
}
