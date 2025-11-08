export const defaultWidth = 800;
export const defaultHeight = 400;

export const providers = {
  takumi: {
    title: "Takumi",
    url: "https://takumi.kane.tw/docs",
  },
  "next-og": {
    title: "next/og (satori + resvg)",
    url: "https://nextjs.org/docs/app/api-reference/functions/image-response",
  },
} as const;

export const templates = {
  "hello-world": "Hello World",
  vercel: "Vercel",
  tailwind: "Tailwind",
} as const;
