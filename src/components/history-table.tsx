"use client";

import { objectKeys } from "ts-extras";
import { useBench } from "~/lib/bench-context";
import { providers } from "~/lib/const";

export function HistoryTable() {
  const { history } = useBench();

  if (history.length === 0) {
    return (
      <div className="border border-dashed border-white/10 px-6 py-10 text-center">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-zinc-600">
          No saved runs
        </p>
        <p className="mt-3 text-sm text-zinc-400">
          Run the benchmark once and the results grid will start building a comparison history here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-white/10 bg-white/[0.03] no-scrollbar">
      <table className="min-w-full border-collapse whitespace-nowrap text-left text-sm">
        <thead className="border-b border-white/10">
          <tr className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-zinc-500">
            <th className="px-4 py-4 font-medium">Run</th>
            <th className="px-4 py-4 font-medium">Template</th>
            {objectKeys(providers).map((providerKey) => (
              <th key={providerKey} className="px-4 py-4 font-medium">
                <span className="block text-zinc-400">{providers[providerKey].name}</span>
                <span className="mt-1 block normal-case tracking-normal text-zinc-600">
                  {providers[providerKey].format}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {history.map((entry) => {
            let fastestProvider: string | null = null;
            let fastestDuration = Number.POSITIVE_INFINITY;

            for (const [providerKey, value] of Object.entries(entry.durations)) {
              if (value < fastestDuration) {
                fastestDuration = value;
                fastestProvider = providerKey;
              }
            }

            return (
              <tr
                key={entry.id}
                className="border-b border-white/10 text-zinc-300 transition-colors duration-300 hover:bg-white/[0.03]"
              >
                <td className="px-4 py-4 font-medium text-zinc-100">#{entry.id}</td>
                <td className="px-4 py-4 text-zinc-500">{entry.template}</td>
                {objectKeys(providers).map((providerKey) => {
                  const duration = entry.durations[providerKey];

                  return (
                    <td key={providerKey} className="px-4 py-4">
                      {duration == null ? (
                        <span className="text-zinc-600">—</span>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-2 ${
                            providerKey === fastestProvider ? "text-emerald-300" : "text-zinc-300"
                          }`}
                        >
                          <span>{duration.toFixed(1)}</span>
                          {providerKey === fastestProvider && (
                            <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em]">
                              Fastest
                            </span>
                          )}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
