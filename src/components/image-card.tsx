"use client";

import { useEffect } from "react";
import { useBench } from "~/lib/bench-context";
import {
  defaultHeight,
  defaultWidth,
  type ImageFormat,
  providers,
  templates,
} from "~/lib/const";
import { useImage } from "~/lib/use-image";
import { Skeleton } from "./ui/skeleton";

const FORMAT_STYLES: Record<ImageFormat, string> = {
  PNG: "border-sky-400/25 bg-sky-400/10 text-sky-200",
  "WebP Lossy 75%": "border-amber-400/25 bg-amber-400/10 text-amber-200",
  "WebP Lossless": "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
};

export function ImageCard({
  template,
  provider,
}: {
  template: keyof typeof templates;
  provider: keyof typeof providers;
}) {
  const { refreshKey, fastestProvider, recordDuration, durations } = useBench();
  const meta = providers[provider];
  const image = useImage(
    provider,
    template,
    defaultWidth,
    defaultHeight,
    refreshKey,
  );
  const isFastest = provider === fastestProvider;
  const duration = durations[provider];
  const aspectRatio = defaultWidth / defaultHeight;

  useEffect(() => {
    if (image?.duration && image.error == null) {
      recordDuration(provider, image.duration);
    }
  }, [image?.duration, image?.error, provider, recordDuration]);

  return (
    <article
      className={`group overflow-hidden border bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 ${
        isFastest
          ? "border-emerald-400/45"
          : "border-white/10 hover:border-white/16"
      }`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <a
              href={meta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-[0.95rem] font-medium tracking-[-0.02em] text-zinc-50 transition-colors duration-300 hover:text-white"
            >
              {meta.name}
            </a>
            {isFastest && (
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-emerald-300">
                Fastest
              </span>
            )}
          </div>
          <p className="mt-1 truncate text-[0.95rem] text-zinc-300">
            {meta.engine}
          </p>
        </div>

        <span
          className={`shrink-0 border px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] ${FORMAT_STYLES[meta.format]}`}
        >
          {meta.format}
        </span>
      </div>

      <div className="relative bg-zinc-950">
        {image?.error ? (
          <div
            className="grid place-items-center px-6 text-center"
            style={{ aspectRatio }}
          >
            <div className="space-y-2">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-zinc-600">
                Render failed
              </p>
              <p className="text-sm text-zinc-400">{image.error}</p>
            </div>
          </div>
        ) : image?.src ? (
          // biome-ignore lint/performance/noImgElement: benchmark output uses direct object URLs
          <img
            src={image.src}
            alt={templates[template]}
            className="aspect-[2/1] w-full object-cover"
            width={defaultWidth}
            height={defaultHeight}
          />
        ) : (
          <Skeleton
            className="w-full rounded-none bg-white/[0.04]"
            style={{ aspectRatio }}
          />
        )}
      </div>

      <div className="grid gap-px border-t border-white/10 bg-white/10 grid-cols-3">
        <div className="bg-zinc-950/90 px-4 py-3">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-zinc-500">
            Duration
          </p>
          <p className="mt-2 text-base tracking-[-0.03em] text-zinc-50">
            {duration != null ? `${duration.toFixed(1)} ms` : "Pending"}
          </p>
        </div>
        <div className="bg-zinc-950/90 px-4 py-3">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-zinc-500">
            File size
          </p>
          <p className="mt-2 text-base tracking-[-0.03em] text-zinc-50">
            {image?.filesize ?? "—"}
          </p>
        </div>
        <div className="bg-zinc-950/90 px-4 py-3">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-zinc-500">
            Frame
          </p>
          <p className="mt-2 text-base tracking-[-0.03em] text-zinc-50">
            {defaultWidth} x {defaultHeight}
          </p>
        </div>
      </div>
    </article>
  );
}
