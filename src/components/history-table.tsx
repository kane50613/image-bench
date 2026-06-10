"use client";

import { objectKeys } from "ts-extras";
import { useBench } from "~/lib/bench-context";
import { providers, runtimes } from "~/lib/const";

export function HistoryTable() {
  const { history } = useBench();

  if (history.length === 0) {
    return (
      <p className="border-t border-border py-6 text-sm text-muted-foreground">
        No saved runs yet. Results are recorded here after each completed run.
      </p>
    );
  }

  // Only show columns for providers that appear in saved runs
  const usedProviders = objectKeys(providers).filter((providerKey) =>
    history.some((entry) => entry.durations[providerKey] != null),
  );

  return (
    <div className="overflow-x-auto no-scrollbar">
      <table className="min-w-full border-collapse whitespace-nowrap text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="py-2.5 pr-4 font-normal">Run</th>
            <th className="py-2.5 pr-4 font-normal">Template</th>
            <th className="py-2.5 pr-4 font-normal">Runtime</th>
            {usedProviders.map((providerKey) => (
              <th key={providerKey} className="py-2.5 pr-4 font-normal">
                {providers[providerKey].name}
                <span className="text-muted-foreground/60">
                  {" "}
                  · {providers[providerKey].engine} · {providers[providerKey].format}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
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
              <tr key={entry.id} className="text-muted-foreground">
                <td className="py-2.5 pr-4 font-mono text-xs tabular-nums">#{entry.id}</td>
                <td className="py-2.5 pr-4">{entry.template}</td>
                <td className="py-2.5 pr-4">{runtimes[entry.runtime].label}</td>
                {usedProviders.map((providerKey) => {
                  const duration = entry.durations[providerKey];

                  return (
                    <td key={providerKey} className="py-2.5 pr-4 font-mono text-xs tabular-nums">
                      {duration == null ? (
                        "—"
                      ) : (
                        <span className={providerKey === fastestProvider ? "text-foreground" : ""}>
                          {duration.toFixed(1)}
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
