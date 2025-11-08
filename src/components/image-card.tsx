"use client";

import {
  defaultHeight,
  defaultWidth,
  providers,
  type variants,
} from "~/lib/const";
import { useImage } from "~/lib/use-image";
import { Card, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function ImageCard({
  variant,
  provider,
}: {
  variant: keyof typeof variants;
  provider: keyof typeof providers;
}) {
  const aspectRatio = defaultWidth / defaultHeight;
  const { src, duration, filesize, invalidate } = useImage(
    provider,
    variant,
    defaultWidth,
    defaultHeight,
  );

  return (
    <Card className="gap-2 py-2">
      <CardTitle className="font-mono px-4 text-lg">
        {providers[provider]}
        <span className="text-sm text-muted-foreground float-end h-full content-center">
          {variant}
        </span>
      </CardTitle>
      {src && (
        // biome-ignore lint/performance/noImgElement: We want raw image
        <img
          src={src}
          alt={variant}
          className="border-y"
          width={defaultWidth}
          height={defaultHeight}
        />
      )}
      {!src && (
        <Skeleton
          className="border-y rounded-none my-px"
          style={{ aspectRatio }}
        />
      )}
      <div className="grid grid-cols-3 text-sm px-4">
        <div>
          <p className="text-muted-foreground">Duration</p>
          <p className="font-mono">{duration ? `${duration}ms` : "-"}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Resolution</p>
          <p className="font-mono">
            {defaultWidth}x{defaultHeight}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Filesize</p>
          <p className="font-mono">{filesize ?? "-"}</p>
        </div>
      </div>
    </Card>
  );
}
