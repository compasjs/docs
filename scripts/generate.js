import { App } from "@compas/code-gen";
import { mainFn } from "@compas/stdlib";
import { extendWithContent } from "../gen/content.js";
import { extendWithDocParser } from "../gen/doc-parser.js";

mainFn(import.meta, main);

/**
 * @type {CliWatchOptions}
 */
export const cliWatchOptions = {
  ignoredPatterns: ["src", "out", "content"],
};

async function main() {
  const app = new App({ verbose: true });

  extendWithContent(app);
  extendWithDocParser(app);

  await app.generate({
    enabledGenerators: ["type", "validator"],
    isNode: true,
    throwingValidators: false,
    outputDirectory: "./src/generated",
  });
}
