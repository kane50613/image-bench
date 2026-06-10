import { Suspense } from "react";
import { objectKeys } from "ts-extras";
import { ImageCards } from "~/components/image-cards";
import { BenchProvider } from "~/lib/bench-context";
import { templates } from "~/lib/const";

export default async function TemplatePage({ params }: PageProps<"/t/[template]">) {
  const template = (await params).template as keyof typeof templates;

  return (
    <main className="min-h-dvh bg-white text-gray-900 dark:bg-[#0d0d0d] dark:text-gray-100">
      <section className="border-b border-gray-100 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 md:px-6">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">image-bench</h1>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              Image generation benchmark
            </p>
          </div>
          <a
            href="https://github.com/kane50613/image-bench/blob/master/src/app/render/route.tsx"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900 dark:border-white/15 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Source
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
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
