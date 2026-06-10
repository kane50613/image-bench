"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { type RuntimeKey, runtimes, type templates } from "~/lib/const";

// ── types ────────────────────────────────────────────────────────────────────

export type HistoryEntry = {
  id: number;
  template: string;
  runtime: RuntimeKey;
  durations: Record<string, number>;
};

type BenchState = {
  template: keyof typeof templates;
  runtime: RuntimeKey;
  refreshKey: number;
  durations: Record<string, number>;
  fastestProvider: string | null;
  isComplete: boolean;
  history: HistoryEntry[];
  refresh: () => void;
  setRuntime: (runtime: RuntimeKey) => void;
  recordDuration: (provider: string, durationMs: string) => void;
};

// ── context ──────────────────────────────────────────────────────────────────

const BenchContext = createContext<BenchState | null>(null);

export function useBench() {
  const ctx = useContext(BenchContext);
  if (!ctx) throw new Error("useBench must be used inside <BenchProvider>");
  return ctx;
}

// ── module-level history cache (survives client-side navigations) ─────────────

let globalHistory: HistoryEntry[] = [];

// ── provider ─────────────────────────────────────────────────────────────────

export function BenchProvider({
  template,
  children,
}: {
  template: keyof typeof templates;
  children: React.ReactNode;
}) {
  const [runtime, setRuntimeState] = useState<RuntimeKey>("fluid");
  const [refreshKey, setRefreshKey] = useState(0);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<HistoryEntry[]>(globalHistory);

  const prevTemplateRef = useRef(template);
  const recordedRunRef = useRef<string | null>(null);

  // Reset durations when template changes
  useEffect(() => {
    if (prevTemplateRef.current !== template) {
      prevTemplateRef.current = template;
      setDurations({});
    }
  }, [template]);

  // Record completed run to history
  useEffect(() => {
    const runtimeProviders = runtimes[runtime].providers;
    const loadedCount = Object.keys(durations).length;
    const isComplete = loadedCount > 0 && loadedCount === runtimeProviders.length;
    const runKey = `${runtime}-${template}-${refreshKey}`;

    if (isComplete && recordedRunRef.current !== runKey) {
      setHistory((prev) => {
        const nextId = prev.length > 0 ? Math.max(...prev.map((e) => e.id)) + 1 : 1;
        const entry: HistoryEntry = {
          id: nextId,
          template,
          runtime,
          durations: { ...durations },
        };
        const next = [entry, ...prev];
        globalHistory = next;
        return next;
      });
      recordedRunRef.current = runKey;
    }
  }, [durations, template, runtime, refreshKey]);

  // Fastest provider (only after all loaded)
  const runtimeProviders = runtimes[runtime].providers;
  const loadedCount = Object.keys(durations).length;
  const isComplete = loadedCount > 0 && loadedCount === runtimeProviders.length;

  let fastestProvider: string | null = null;
  if (isComplete) {
    let min = Infinity;
    for (const [p, d] of Object.entries(durations)) {
      if (d < min) {
        min = d;
        fastestProvider = p;
      }
    }
  }

  const refresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
    setDurations({});
  }, []);

  const setRuntime = useCallback((next: RuntimeKey) => {
    setRuntimeState(next);
    setDurations({});
  }, []);

  const recordDuration = useCallback((provider: string, durationStr: string) => {
    const d = parseFloat(durationStr);
    if (!Number.isNaN(d)) {
      setDurations((prev) => ({ ...prev, [provider]: d }));
    }
  }, []);

  return (
    <BenchContext.Provider
      value={{
        template,
        runtime,
        refreshKey,
        durations,
        fastestProvider,
        isComplete,
        history,
        refresh,
        setRuntime,
        recordDuration,
      }}
    >
      {children}
    </BenchContext.Provider>
  );
}
