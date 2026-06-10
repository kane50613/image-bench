const fontFiles = [
  { name: "Geist", fileName: "Geist-Regular.ttf", weight: 400 as const },
  { name: "Geist", fileName: "Geist-Bold.ttf", weight: 700 as const },
  { name: "Geist Mono", fileName: "GeistMono-Regular.ttf", weight: 400 as const },
  { name: "Geist Mono", fileName: "GeistMono-Bold.ttf", weight: 700 as const },
];

export type Font = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: "normal";
};

// Edge runtime has no filesystem; fetch fonts from the deployment's static
// assets once and reuse across invocations.
let fontsPromise: Promise<Font[]> | null = null;

export function loadFonts(origin: string) {
  fontsPromise ??= Promise.all(
    fontFiles.map(async ({ name, fileName, weight }) => ({
      name,
      data: await fetch(new URL(`/fonts/geist/${fileName}`, origin)).then((res) =>
        res.arrayBuffer(),
      ),
      weight,
      style: "normal" as const,
    })),
  );
  return fontsPromise;
}
