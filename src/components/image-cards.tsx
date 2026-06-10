"use client";

import { RotateCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { objectKeys } from "ts-extras";
import { useBench } from "~/lib/bench-context";
import { runtimes, templates } from "~/lib/const";
import { HistoryTable } from "./history-table";
import { ImageCard } from "./image-card";

export function ImageCards({ template }: { template: keyof typeof templates }) {
  const { history, refresh, runtime, setRuntime } = useBench();
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const providerKeys = runtimes[runtime].providers;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsSticky(!entry.isIntersecting), {
      threshold: 0,
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="sticky top-0 z-20 pointer-events-none">
        <div className="relative space-y-3 border-b border-gray-100 bg-white py-3 md:border-b-0 md:bg-transparent dark:border-white/10 dark:bg-[#0d0d0d] dark:md:bg-transparent">
          <div ref={sentinelRef} className="absolute -top-px h-px w-full" />
          <div
            className={`absolute inset-0 bg-white md:bg-white/85 md:backdrop-blur-xl md:mask-[linear-gradient(to_bottom,black_55%,transparent)] transition-opacity duration-300 dark:bg-[#0d0d0d] dark:md:bg-[#0d0d0d]/85 ${
              isSticky ? "opacity-100" : "opacity-100 md:opacity-0"
            }`}
          />
          <div className="relative grid gap-3 pointer-events-auto lg:grid-cols-[minmax(0,1fr)_auto_auto]">
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex w-max min-w-full gap-1 rounded-full bg-gray-100 p-1 dark:bg-white/5">
                {objectKeys(templates).map((templateKey) => (
                  <Link
                    key={templateKey}
                    href={`/t/${templateKey}`}
                    className={`flex h-9 shrink-0 items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-200 ${
                      templateKey === template
                        ? "bg-white text-gray-900 dark:bg-white/15 dark:text-white"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    {templates[templateKey]}
                  </Link>
                ))}
              </div>
            </div>

            <div className="inline-flex gap-1 self-start rounded-full bg-gray-100 p-1 dark:bg-white/5">
              {objectKeys(runtimes).map((runtimeKey) => (
                <button
                  key={runtimeKey}
                  type="button"
                  onClick={() => setRuntime(runtimeKey)}
                  className={`flex h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-200 ${
                    runtimeKey === runtime
                      ? "bg-white text-gray-900 dark:bg-white/15 dark:text-white"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {runtimes[runtimeKey].label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="flex h-11 min-w-24 items-center justify-center gap-2 rounded-full bg-gray-900 px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              onClick={refresh}
              title="Re-run benchmark"
            >
              <RotateCw className="size-3.5" />
              Rerun
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {providerKeys.map((providerKey) => (
          <ImageCard key={providerKey} provider={providerKey} template={template} />
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Run history</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{history.length} saved</p>
        </div>
        <HistoryTable />
      </div>
    </div>
  );
}
