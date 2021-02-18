import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { mainFn, pathJoin, spawn } from "@compas/stdlib";
import { syncJSDocFromRepo } from "../src/doc-parser/index.js";
import { syncJSDocBasedToc } from "../src/doc-parser/toc.js";

const compasDirectory = pathJoin(process.cwd(), "../compas/");
const targetDirectory = pathJoin(process.cwd(), "./content");

mainFn(import.meta, main);

/**
 * Sync some documentation files from Compas repo to this docs repo.
 * Requires the Compas repository to be checked out at `../compas`
 *
 * @param {Logger} logger
 * @returns {Promise<void>}
 */
async function main(logger) {
  checkCompasDirectoryExists(logger);
  await copyFile(logger, "contributing.md");
  await copyFile(logger, "changelog.md");

  await syncJSDocFromRepo(logger);
  await syncJSDocBasedToc();

  await spawn("yarn", ["compas", "lint"]);
}

function checkCompasDirectoryExists(logger) {
  if (!existsSync(compasDirectory)) {
    logger.error(
      `Make sure to have the Compas source directory at '${compasDirectory}'.`,
    );
    process.exit(1);
  }
}

async function copyFile(logger, file) {
  const path = pathJoin(compasDirectory, file);
  if (!existsSync(path)) {
    logger.error(`Could not find '${file}' at '${path}'.`);
    process.exit(1);
  }

  await writeFile(pathJoin(targetDirectory, file), await readFile(path));
}
