export const defaultWidth = 800;
export const defaultHeight = 400;

export type ImageFormat = "PNG" | "WebP Lossy 75%" | "WebP Lossless";
export type ProviderEngine =
  | "Satori + Sharp"
  | "Takumi Node.js"
  | "Takumi WASM";

export type ProviderMeta = {
  /** Short display name of the library */
  name: string;
  /** URL to the library's documentation */
  url: string;
  /** Rendering engine used under the hood */
  engine: ProviderEngine;
  /** Output format of the generated image */
  format: ImageFormat;
};

export const providers = {
  "next-og": {
    name: "next@canary",
    url: "https://www.npmjs.com/package/next",
    engine: "Satori + Sharp",
    format: "PNG",
  },
  takumi: {
    name: "Takumi",
    url: "https://takumi.kane.tw/docs",
    engine: "Takumi Node.js",
    format: "PNG",
  },
  "takumi-webp-75": {
    name: "Takumi",
    url: "https://takumi.kane.tw/docs",
    engine: "Takumi Node.js",
    format: "WebP Lossy 75%",
  },
  "takumi-webp": {
    name: "Takumi",
    url: "https://takumi.kane.tw/docs",
    engine: "Takumi Node.js",
    format: "WebP Lossless",
  },
  "takumi-wasm": {
    name: "Takumi",
    url: "https://takumi.kane.tw/docs",
    engine: "Takumi WASM",
    format: "PNG",
  },
  "takumi-wasm-webp": {
    name: "Takumi",
    url: "https://takumi.kane.tw/docs",
    engine: "Takumi WASM",
    format: "WebP Lossless",
  },
} as const satisfies Record<string, ProviderMeta>;

export const templates = {
  "hello-world": "Hello World",
  vercel: "Vercel",
  rauchg: "rauchg",
  tailwind: "Tailwind",
  gradients: "Gradients",
  docs: "Docs",
  ecommerce: "Ecommerce",
  social: "Social Post",
  analytics: "Analytics Dashboard",
} as const;
