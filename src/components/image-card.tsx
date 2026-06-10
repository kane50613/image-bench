"use client";

import { useEffect } from "react";
import { useBench } from "~/lib/bench-context";
import { defaultHeight, defaultWidth, providers, templates } from "~/lib/const";
import { useImage } from "~/lib/use-image";
import { Skeleton } from "./ui/skeleton";

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
    meta.endpoint,
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
      className={`group overflow-hidden rounded-2xl border bg-white transition-colors duration-200 dark:bg-white/5 ${
        isFastest
          ? "border-emerald-300 dark:border-emerald-500/40"
          : "border-gray-200 hover:border-gray-300 dark:border-white/10 dark:hover:border-white/20"
      }`}
    >
      <div className="flex items-start justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <a
              href={meta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-sm font-semibold text-gray-900 transition-colors duration-200 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
            >
              {meta.name}
            </a>
            {isFastest && (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                Fastest
              </span>
            )}
          </div>
          <p className="mt-0.5 truncate text-sm text-gray-500 dark:text-gray-400">{meta.engine}</p>
        </div>

        <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-white/10 dark:text-gray-300">
          {meta.format}
        </span>
      </div>

      <div className="relative bg-gray-50 dark:bg-black/20">
        {image?.error ? (
          <div className="grid place-items-center px-6 text-center" style={{ aspectRatio }}>
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Render failed</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{image.error}</p>
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
            className="w-full rounded-none bg-gray-100 dark:bg-white/10"
            style={{ aspectRatio }}
          />
        )}
      </div>

      <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 dark:divide-white/10 dark:border-white/10">
        <div className="px-5 py-3.5">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Duration</p>
          <p className="mt-1 text-sm font-semibold">
            {duration != null ? `${duration.toFixed(1)} ms` : "Pending"}
          </p>
        </div>
        <div className="px-5 py-3.5">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">File size</p>
          <p className="mt-1 text-sm font-semibold">{image?.filesize ?? "—"}</p>
        </div>
        <div className="px-5 py-3.5">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Frame</p>
          <p className="mt-1 text-sm font-semibold">
            {defaultWidth} × {defaultHeight}
          </p>
        </div>
      </div>
    </article>
  );
}
