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
    <article className="overflow-hidden rounded-md border border-border">
      <div className="flex items-baseline justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 items-baseline gap-2">
          <a
            href={meta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-base font-medium underline-offset-4 hover:underline"
          >
            {meta.name}
          </a>
          {meta.engine !== meta.name && (
            <span className="truncate text-base text-muted-foreground">{meta.engine}</span>
          )}
        </div>
        <span className="shrink-0 text-sm text-muted-foreground">{meta.format}</span>
      </div>

      <div className="border-y border-border">
        {image?.error ? (
          <div className="grid place-items-center px-6 text-center" style={{ aspectRatio }}>
            <div className="space-y-1">
              <p className="text-base">Render failed</p>
              <p className="text-base text-muted-foreground">{image.error}</p>
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
          <Skeleton className="w-full rounded-none bg-muted/50" style={{ aspectRatio }} />
        )}
      </div>

      <div className="flex items-baseline justify-between px-4 py-3 font-mono text-sm text-muted-foreground tabular-nums">
        <span className={isFastest ? "text-foreground" : ""}>
          {duration != null ? `${duration.toFixed(1)} ms` : "…"}
          {isFastest && " · fastest"}
        </span>
        <span>{image?.filesize ?? "…"}</span>
        <span>
          {defaultWidth}×{defaultHeight}
        </span>
      </div>
    </article>
  );
}
