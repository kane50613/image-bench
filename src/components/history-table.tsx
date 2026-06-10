"use client";

import { objectKeys } from "ts-extras";
import { useBench } from "~/lib/bench-context";
import { providers, runtimes } from "~/lib/const";

export function HistoryTable() {
  const { history } = useBench();

  if (history.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 px-6 py-10 text-center dark:border-white/15">
        <p className="text-sm font-medium">No saved runs</p>
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
          Run the benchmark once and the results grid will start building a comparison history here.
        </p>
      </div>
    );
  }

  // Only show columns for providers that appear in saved runs
  const usedProviders = objectKeys(providers).filter((providerKey) =>
    history.some((entry) => entry.durations[providerKey] != null),
  );

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white no-scrollbar dark:border-white/10 dark:bg-white/5">
      <table className="min-w-full border-collapse whitespace-nowrap text-left text-sm">
        <thead className="border-b border-gray-100 dark:border-white/10">
          <tr className="text-xs font-medium text-gray-500 dark:text-gray-400">
            <th className="px-5 py-3.5 font-medium">Run</th>
            <th className="px-5 py-3.5 font-medium">Template</th>
            <th className="px-5 py-3.5 font-medium">Runtime</th>
            {usedProviders.map((providerKey) => (
              <th key={providerKey} className="px-5 py-3.5 font-medium">
                <span className="block text-gray-700 dark:text-gray-200">
                  {providers[providerKey].name}
                </span>
                <span className="mt-0.5 block font-normal text-gray-400 dark:text-gray-500">
                  {providers[providerKey].engine} · {providers[providerKey].format}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-white/10">
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
                className="text-gray-600 transition-colors duration-200 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
              >
                <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white">
                  #{entry.id}
                </td>
                <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">{entry.template}</td>
                <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">
                  {runtimes[entry.runtime].label}
                </td>
                {usedProviders.map((providerKey) => {
                  const duration = entry.durations[providerKey];

                  return (
                    <td key={providerKey} className="px-5 py-3.5">
                      {duration == null ? (
                        <span className="text-gray-300 dark:text-gray-600">—</span>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-2 ${
                            providerKey === fastestProvider
                              ? "font-medium text-gray-900 dark:text-white"
                              : ""
                          }`}
                        >
                          <span>{duration.toFixed(1)}</span>
                          {providerKey === fastestProvider && (
                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
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
