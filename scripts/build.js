import { existsSync } from "fs";
import { mkdir, readFile, rm, writeFile } from "fs/promises";
import {
  eventStart,
  eventStop,
  newEvent,
  newEventFromEvent,
  mainFn,
  pathJoin,
} from "@compas/stdlib";
import {
  annotateItemWithContents,
  getContentStructure,
  setMarkedOptions,
} from "../src/content.js";
import { renderPage } from "../src/renderer.js";
import { renderSitemap } from "../src/sitemap.js";

mainFn(import.meta, main);

const outputDirectory = pathJoin(process.cwd(), "/out");

async function main(logger) {
  const event = newEvent(logger);

  const cname = await readCnameFile(newEventFromEvent(event));
  await prepareOutputDirectory(newEventFromEvent(event));

  const files = await getContentStructure(newEventFromEvent(event));
  setMarkedOptions();

  await Promise.all(
    files.map((it) => annotateItemWithContents(newEventFromEvent(event), it)),
  );

  await Promise.all(
    files.map(async (it) => {
      const src = await renderPage(newEventFromEvent(event), cname, files, it);

      // Ensure directory exists before writing the file
      const partialPath = pathJoin(
        outputDirectory,
        it.contentPath.split("/").slice(0, -1).join("/"),
      );
      await mkdir(partialPath, { recursive: true });

      await writeFile(pathJoin(outputDirectory, `${it.contentPath}.html`), src);
    }),
  );

  await writeFile(
    pathJoin(outputDirectory, "sitemap.xml"),
    renderSitemap(newEventFromEvent(event), cname, files),
  );
}

/**
 * Read the CNAME file
 *
 * @param {InsightEvent} event
 * @returns {Promise<string>}
 */
async function readCnameFile(event) {
  eventStart(event, "build.readCnameFile");

  const contents = await readFile(pathJoin(process.cwd(), "/CNAME"), "utf-8");
  const result = `https://${contents.trim()}`;

  eventStop(event);

  return result;
}

/**
 * Clear old files, create CNAME and .nojekyll files
 *
 * @param {InsightEvent} event
 * @returns {Promise<void>}
 */
async function prepareOutputDirectory(event) {
  eventStart(event, "build.prepareOutputDirectory");

  if (existsSync(outputDirectory)) {
    await rm(outputDirectory, { recursive: true });
  }
  await mkdir(outputDirectory, { recursive: true });

  await writeFile(pathJoin(outputDirectory, "/.nojekyll"), "", "utf-8");
  await writeFile(
    pathJoin(outputDirectory, "/CNAME"),
    await readFile(pathJoin(process.cwd(), "/CNAME")),
    "utf-8",
  );

  eventStop(event);
}
