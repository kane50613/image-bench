import { HelloWorld } from "./variants/hello-world";
import { Tailwind } from "./variants/tailwind";
import { Vercel } from "./variants/vercel";

export const defaultWidth = 800;
export const defaultHeight = 400;

export const providers = {
  takumi: "Takumi",
  "next-og": "next/og (satori + resvg)",
} as const;

export const variants = {
  "hello-world": HelloWorld,
  vercel: Vercel,
  tailwind: Tailwind,
} as const;
