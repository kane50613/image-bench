"use client";

import {
  defaultHeight,
  defaultWidth,
  providers,
  type templates,
} from "~/lib/const";
import { useImage } from "~/lib/use-image";
import { Card, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function ImageCard({
  template,
  provider,
}: {
  template: keyof typeof templates;
  provider: keyof typeof providers;
}) {
  const aspectRatio = defaultWidth / defaultHeight;
  const image = useImage(provider, template, defaultWidth, defaultHeight);

  return (
    <Card className="gap-2 py-2">
      <CardTitle className="font-mono px-4 py-1 sm:text-lg">
        {providers[provider]}
        <span className="text-xs sm:text-sm text-muted-foreground float-right h-full content-center">
          {template}
        </span>
      </CardTitle>
      {image?.src && (
        // biome-ignore lint/performance/noImgElement: We want raw image
        <img
          src={image.src}
          alt={template}
          className="border-y"
          width={defaultWidth}
          height={defaultHeight}
        />
      )}
      {!image?.src && (
        <Skeleton
          className="border-y rounded-none my-px"
          style={{ aspectRatio }}
        />
      )}
      <div className="grid grid-cols-3 text-sm px-4">
        <div>
          <p className="text-muted-foreground">Duration</p>
          <p className="font-mono">
            {image?.duration ? `${image.duration}ms` : "-"}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Resolution</p>
          <p className="font-mono">
            {defaultWidth}x{defaultHeight}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Filesize</p>
          <p className="font-mono">{image?.filesize ?? "-"}</p>
        </div>
      </div>
    </Card>
  );
}
