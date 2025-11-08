"use client";

import { parseAsStringEnum, useQueryState } from "nuqs";
import { objectKeys } from "ts-extras";
import { ImageCard } from "~/components/image-card";
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "~/components/ui/button-group";
import { templates } from "~/lib/const";

export default function Home() {
  const [template, setTemplate] = useQueryState<keyof typeof templates>(
    "template",
    parseAsStringEnum(objectKeys(templates)).withDefault("hello-world"),
  );

  return (
    <main className="flex flex-col items-center justify-center container mx-auto px-4">
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <h1 className="text-4xl sm:text-6xl font-bold">Image Bench</h1>
        <p className="text-lg sm:text-xl text-muted-foreground">
          Figure out how fast the image generation can be. Check the{" "}
          <a
            href="https://github.com/kane50613/image-bench/blob/master/src/app/render/route.tsx"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary underline-offset-4 font-medium"
          >
            source
          </a>{" "}
          to see how it measures.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <ImageCard provider="next-og" template={template} />
        <ImageCard provider="takumi" template={template} />
      </div>
      <ButtonGroup className="my-8">
        {objectKeys(templates).map((template) => (
          <Button
            key={template}
            variant="outline"
            onClick={() => setTemplate(template)}
          >
            {template}
          </Button>
        ))}
      </ButtonGroup>
    </main>
  );
}
