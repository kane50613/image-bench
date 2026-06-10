export const defaultWidth = 800;
export const defaultHeight = 400;

export type ImageFormat = "PNG" | "WebP Lossy 75%" | "WebP Lossless";
export type ProviderEngine = "Satori + Sharp" | "Satori (WASM)" | "Takumi" | "Takumi (WASM)";

export type ProviderMeta = {
  /** Short display name of the library */
  name: string;
  /** URL to the library's documentation */
  url: string;
  /** Rendering engine used under the hood */
  engine: ProviderEngine;
  /** Output format of the generated image */
  format: ImageFormat;
  /** Render route serving this provider */
  endpoint: string;
};

export const providers = {
  "next-og": {
    name: "next",
    url: "https://www.npmjs.com/package/next",
    engine: "Satori + Sharp",
    format: "PNG",
    endpoint: "/render",
  },
  takumi: {
    name: "Takumi",
    url: "https://takumi.kane.tw/docs",
    engine: "Takumi",
    format: "PNG",
    endpoint: "/render",
  },
  "takumi-webp": {
    name: "Takumi",
    url: "https://takumi.kane.tw/docs",
    engine: "Takumi",
    format: "WebP Lossless",
    endpoint: "/render",
  },
  "next-og-edge": {
    name: "next",
    url: "https://www.npmjs.com/package/next",
    engine: "Satori (WASM)",
    format: "PNG",
    endpoint: "/render/edge/next-og",
  },
  "takumi-wasm": {
    name: "Takumi",
    url: "https://takumi.kane.tw/docs",
    engine: "Takumi (WASM)",
    format: "PNG",
    endpoint: "/render/edge/takumi",
  },
} as const satisfies Record<string, ProviderMeta>;

export type RuntimeKey = "fluid" | "edge";

export type RuntimeMeta = {
  label: string;
  providers: readonly (keyof typeof providers)[];
};

export const runtimes = {
  fluid: {
    label: "Fluid Compute",
    providers: ["next-og", "takumi", "takumi-webp"],
  },
  edge: {
    label: "Vercel Edge",
    providers: ["next-og-edge", "takumi-wasm"],
  },
} as const satisfies Record<RuntimeKey, RuntimeMeta>;

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
