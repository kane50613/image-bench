"use client";

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
  const runtimeQuery = runtime === "fluid" ? "" : `?runtime=${runtime}`;

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
    <div className="flex w-full flex-col gap-8">
      <div className="sticky top-0 z-20">
        <div ref={sentinelRef} className="absolute -top-px h-px w-full" />
        <div
          className={`-mx-4 flex flex-col gap-2 bg-background px-4 py-3 transition-colors duration-200 md:-mx-6 md:px-6 ${
            isSticky ? "border-b border-border" : "border-b border-transparent"
          }`}
        >
          <div className="-mx-4 overflow-x-auto px-4 no-scrollbar md:-mx-6 md:px-6">
            <div className="flex w-max min-w-full gap-4">
              {objectKeys(templates).map((templateKey) => (
                <Link
                  key={templateKey}
                  href={`/t/${templateKey}${runtimeQuery}`}
                  className={`shrink-0 py-1.5 text-base transition-colors duration-200 ${
                    templateKey === template
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {templates[templateKey]}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-4">
              {objectKeys(runtimes).map((runtimeKey) => (
                <button
                  key={runtimeKey}
                  type="button"
                  onClick={() => setRuntime(runtimeKey)}
                  className={`py-1.5 text-base transition-colors duration-200 ${
                    runtimeKey === runtime
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {runtimes[runtimeKey].label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="rounded-md border border-border px-3 py-1.5 text-base text-muted-foreground transition-colors duration-200 hover:border-input hover:text-foreground"
              onClick={refresh}
              title="Re-run benchmark"
            >
              Rerun
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {providerKeys.map((providerKey) => (
          <ImageCard key={providerKey} provider={providerKey} template={template} />
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <p className="text-base text-muted-foreground">History</p>
          <p className="text-base text-muted-foreground">{history.length} saved</p>
        </div>
        <HistoryTable />
      </div>
    </div>
  );
}
