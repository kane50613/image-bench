import { Suspense } from "react";
import { objectKeys } from "ts-extras";
import { ImageCards } from "~/components/image-cards";
import { BenchProvider } from "~/lib/bench-context";
import { templates } from "~/lib/const";

export default async function TemplatePage({ params }: PageProps<"/t/[template]">) {
  const template = (await params).template as keyof typeof templates;

  return (
    <main className="min-h-dvh">
      <header className="mx-auto flex max-w-5xl items-baseline justify-between gap-4 px-4 pt-8 pb-6 md:px-6 md:pt-10">
        <h1 className="text-base font-medium">image-bench</h1>
        <a
          href="https://github.com/kane50613/image-bench/blob/master/src/app/render/route.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-sm text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
        >
          Source
        </a>
      </header>

      <div className="mx-auto max-w-5xl px-4 pb-16 md:px-6">
        {/* useSearchParams in BenchProvider needs a Suspense boundary for SSG */}
        <Suspense>
          <BenchProvider template={template}>
            <ImageCards template={template} />
          </BenchProvider>
        </Suspense>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return objectKeys(templates).map((template) => ({ template }));
}
