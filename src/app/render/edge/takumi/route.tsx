import { googleFontSubsets } from "@takumi-rs/helpers";
import { fromJsx } from "@takumi-rs/helpers/jsx";
import { createElement } from "react";
import ImageResponse, { type ImageResponseOptions } from "takumi-js/response";
import { handleRender, noStoreHeaders, type ProviderFn, templates } from "../../shared";

// No fonts bundled into the function: googleFontSubsets fetches only the glyphs
// each template uses from fonts.gstatic.com, keeping the edge bundle small.
export const runtime = "edge";
export const dynamic = "force-dynamic";

const fetchCache = new Map();
const cssCache = new Map<string, string>();

const fontFamilies = [
  { family: "Geist", weight: [400, 700] },
  { family: "Geist Mono", weight: [400, 700] },
];

export async function GET(request: Request) {
  const provider =
    (format: "png" | "webp"): ProviderFn =>
    async (template, width, height) => {
      const { node, stylesheets } = await fromJsx(createElement(templates[template]));
      const fonts = await googleFontSubsets(node, fontFamilies, { cache: cssCache });

      return new ImageResponse(node, {
        width,
        height,
        format,
        stylesheets,
        fonts,
        headers: noStoreHeaders,
        resourcesOptions: { cache: fetchCache },
      } as ImageResponseOptions);
    };

  return handleRender(request, {
    "takumi-wasm": provider("png"),
    "takumi-wasm-webp": provider("webp"),
  });
}
