import { objectKeys } from "ts-extras";
import { ImageCards } from "~/components/image-card";
import { templates } from "~/lib/const";

export default async function Home({ params }: PageProps<"/t/[template]">) {
  const template = (await params).template as keyof typeof templates;

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
      <ImageCards template={template} />
    </main>
  );
}

export function generateStaticParams() {
  return objectKeys(templates).map((template) => ({
    template,
  }));
}
