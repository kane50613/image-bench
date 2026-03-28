import { bench, group, run, summary } from "mitata";
import { providers, templates } from "../../src/app/render/route";

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
