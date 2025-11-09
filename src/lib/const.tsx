export const defaultWidth = 800;
export const defaultHeight = 400;

export const providers = {
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
  "next-og": {
    title: (
      <span>
        next/og{" "}
        <span className="text-xs sm:text-sm text-muted-foreground font-medium">
          (satori + resvg)
        </span>
      </span>
    ),
    url: "https://nextjs.org/docs/app/api-reference/functions/image-response",
  },
} as const;

export const templates = {
  "hello-world": "Hello World",
  vercel: "Vercel",
  rauchg: "rauchg",
  tailwind: "Tailwind",
} as const;
