"use client";

import { RotateCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { objectKeys } from "ts-extras";
import { useBench } from "~/lib/bench-context";
import { providers, templates } from "~/lib/const";
import { HistoryTable } from "./history-table";
import { ImageCard } from "./image-card";

export function ImageCards({ template }: { template: keyof typeof templates }) {
  const { history, refresh } = useBench();
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const providerKeys = objectKeys(providers);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="sticky top-0 z-20 pointer-events-none">
        <div className="relative space-y-3 border-b border-white/10 bg-zinc-950 py-3 md:border-b-0 md:bg-transparent">
          <div ref={sentinelRef} className="absolute -top-px h-px w-full" />
          <div
            className={`absolute inset-0 bg-zinc-950 md:bg-zinc-950/84 md:backdrop-blur-xl md:[mask-image:linear-gradient(to_bottom,black_55%,transparent)] transition-opacity duration-300 ${
              isSticky ? "opacity-100" : "opacity-100 md:opacity-0"
            }`}
          />
          <div className="relative grid gap-3 pointer-events-auto lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="overflow-x-auto no-scrollbar">
              <div className="inline-flex min-w-full gap-px border border-white/10 bg-white/10 md:min-w-0">
                {objectKeys(templates).map((templateKey) => (
                  <Link
                    key={templateKey}
                    href={`/t/${templateKey}`}
                    className={`flex h-11 shrink-0 items-center border-r border-white/10 px-4 text-[0.92rem] tracking-[-0.02em] transition-all duration-300 last:border-r-0 active:translate-y-px ${
                      templateKey === template
                        ? "bg-zinc-100 text-zinc-950"
                        : "bg-zinc-950/90 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
                    }`}
                  >
                    {templates[templateKey]}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border border-emerald-400/25 bg-emerald-400/10">
              <button
                type="button"
                className="flex h-11 min-w-24 items-center justify-center gap-2 px-4 text-left font-mono text-[0.68rem] uppercase tracking-[0.22em] text-emerald-50 transition-all duration-300 hover:bg-emerald-400/8 active:translate-y-px"
                onClick={refresh}
                title="Re-run benchmark"
              >
                <RotateCw className="size-3.5" />
                Rerun
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {providerKeys.map((providerKey) => (
          <ImageCard
            key={providerKey}
            provider={providerKey}
            template={template}
          />
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-zinc-500">
            Run history
          </p>
          <div className="h-px flex-1 bg-white/10" />
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-zinc-600">
            {history.length} saved
          </p>
        </div>
        <HistoryTable />
      </div>
    </div>
  );
}
