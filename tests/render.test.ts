import { providers, templates } from "../src/app/render/route";
import { test, describe } from "bun:test";

for (const templateName of Object.keys(templates) as Array<keyof typeof templates>) {
  describe(templateName, () => {
    for (const [providerName, providerFn] of Object.entries(providers)) {
      test(providerName, async () => {
        const response = providerFn(templateName, 1200, 630);
        await response.arrayBuffer();
      });
    }
  });
}
