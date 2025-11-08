"use client";

import Link from "next/link";
import { objectKeys } from "ts-extras";
import { defaultHeight, defaultWidth, providers, templates } from "~/lib/const";
import { useImage } from "~/lib/use-image";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Card, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { RefreshCcw } from "lucide-react";

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
      <CardTitle className="px-4 py-1 sm:text-lg">
        <a
          href={providers[provider].url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {providers[provider].title}
        </a>
        <span className="text-xs sm:text-sm text-muted-foreground float-right h-full content-center font-mono font-normal">
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

export function ImageCards({ template }: { template: keyof typeof templates }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <ImageCard provider="next-og" template={template} />
        <ImageCard provider="takumi" template={template} />
      </div>
      <ButtonGroup className="my-8">
        {objectKeys(templates).map((t) => (
          <Button
            key={t}
            variant={t === template ? "default" : "outline"}
            className="border"
            asChild
          >
            <Link href={`/t/${t}`}>{templates[t]}</Link>
          </Button>
        ))}
        <Button variant="outline" onClick={() => location.reload()}>
          <RefreshCcw />
        </Button>
      </ButtonGroup>
    </>
  );
}
