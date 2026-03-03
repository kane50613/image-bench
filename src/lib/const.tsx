export const defaultWidth = 800;
export const defaultHeight = 400;

export const providers = {
  "vercel-og": {
    title: (
      <span>
        @vercel/og{" "}
        <span className="text-xs sm:text-sm text-muted-foreground font-medium">
          (satori + resvg)
        </span>
      </span>
    ),
    url: "https://www.npmjs.com/package/@vercel/og",
  },
  "vercel-og-sharp": {
    title: (
      <span>
        @vercel/og{" "}
        <span className="text-xs sm:text-sm text-muted-foreground font-medium">
          (satori + sharp)
        </span>
      </span>
    ),
    url: "https://www.npmjs.com/package/@vercel/og",
  },
  takumi: {
    title: "Takumi",
    url: "https://takumi.kane.tw/docs",
  },
  "takumi-webp": {
    title: (
      <span>
        Takumi{" "}
        <span className="text-xs sm:text-sm text-muted-foreground font-medium">
          WebP
        </span>
      </span>
    ),
    url: "https://takumi.kane.tw/docs",
  },
  "takumi-wasm": {
    title: (
      <span>
        Takumi{" "}
        <span className="text-xs sm:text-sm text-muted-foreground font-medium">
          WASM
        </span>
      </span>
    ),
    url: "https://takumi.kane.tw/docs",
  },
  "takumi-wasm-webp": {
    title: (
      <span>
        Takumi{" "}
        <span className="text-xs sm:text-sm text-muted-foreground font-medium">
          WASM WebP
        </span>
      </span>
    ),
    url: "https://takumi.kane.tw/docs",
  },
} as const;

export const templates = {
  "hello-world": "Hello World",
  vercel: "Vercel",
  rauchg: "rauchg",
  tailwind: "Tailwind",
  gradients: "Gradients",
  docs: "Docs",
} as const;
