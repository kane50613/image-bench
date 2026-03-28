import { objectKeys } from "ts-extras";
import { ImageCards } from "~/components/image-cards";
import { BenchProvider } from "~/lib/bench-context";
import { templates } from "~/lib/const";

export default async function TemplatePage({ params }: PageProps<"/t/[template]">) {
  const template = (await params).template as keyof typeof templates;

  return (
    <BenchProvider template={template}>
      <main className="min-h-dvh bg-zinc-950 text-zinc-50">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <div className="absolute inset-y-0 left-[-12%] w-152 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(255,255,255,0))] blur-3xl" />
          <div className="absolute right-[-10%] top-24 h-112 w-md rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.16),rgba(16,185,129,0))] blur-3xl" />
        </div>

        <section className="border-b border-white/10">
          <div className="mx-auto flex max-w-7xl items-end justify-between gap-4 px-4 py-5 md:px-6">
            <h1 className="text-2xl font-semibold tracking-[-0.05em] text-zinc-50 md:text-3xl">
              image-bench
            </h1>
            <a
              href="https://github.com/kane50613/image-bench/blob/master/src/app/render/route.tsx"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 bg-white/3 px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-zinc-300 transition-all duration-300 hover:border-emerald-400/40 hover:text-zinc-100 active:translate-y-px"
            >
              Source
            </a>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-6">
          <ImageCards template={template} />
        </div>
      </main>
    </BenchProvider>
  );
}

export function generateStaticParams() {
  return objectKeys(templates).map((template) => ({ template }));
}
