import ImageResponse, { type ImageResponseOptions } from "takumi-js/response";
import { handleRender, noStoreHeaders, type ProviderFn, templates } from "../../shared";
import { loadFonts } from "../fonts";

// Separate edge function from next-og so each WASM bundle stays under
// Vercel's edge function size limit.
export const runtime = "edge";
export const dynamic = "force-dynamic";

const fetchCache = new Map();

export async function GET(request: Request) {
  const fonts = await loadFonts();

  const provider =
    (format: "png" | "webp"): ProviderFn =>
    (template, width, height) =>
      new ImageResponse(templates[template](), {
        width,
        height,
        format,
        headers: noStoreHeaders,
        fonts,
        images: {
          fetchCache: fetchCache,
        },
      } as ImageResponseOptions);

  return handleRender(request, {
    "takumi-wasm": provider("png"),
    "takumi-wasm-webp": provider("webp"),
  });
}
