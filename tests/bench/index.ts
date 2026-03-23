import init from "@takumi-rs/wasm";
import module from "@takumi-rs/wasm/takumi_wasm_bg.wasm";
import { bench, group, run, summary } from "mitata";
import { providers, templates } from "../../src/app/render/route";

await init({
  module_or_path: module,
});

for (const templateName of Object.keys(templates) as Array<keyof typeof templates>) {
  summary(() => {
    group(templateName, () => {
      for (const [providerName, providerFn] of Object.entries(providers)) {
        bench(providerName, async () => {
          const response = providerFn(templateName, 1200, 630);
          await response.arrayBuffer();
        });
      }
    });
  });
}

await run();
