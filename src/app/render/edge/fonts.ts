// Bundled as edge function assets; fetching /fonts/... from our own origin
// breaks when deployment protection or bot challenge intercepts the
// cookie-less server-side request.
const fontFiles = [
  {
    name: "Geist",
    url: new URL("../../../../public/fonts/geist/Geist-Regular.ttf", import.meta.url),
    weight: 400 as const,
  },
  {
    name: "Geist",
    url: new URL("../../../../public/fonts/geist/Geist-Bold.ttf", import.meta.url),
    weight: 700 as const,
  },
];

export type Font = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: "normal";
};

let fontsPromise: Promise<Font[]> | null = null;

export function loadFonts() {
  fontsPromise ??= Promise.all(
    fontFiles.map(async ({ name, url, weight }) => ({
      name,
      data: await fetch(url).then((res) => res.arrayBuffer()),
      weight,
      style: "normal" as const,
    })),
  );
  return fontsPromise;
}
