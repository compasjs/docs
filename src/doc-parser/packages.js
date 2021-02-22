import { readFile } from "fs/promises";
import { eventStart, eventStop } from "@compas/insight";
import { pathJoin, processDirectoryRecursive } from "@compas/stdlib";
import { parseModule } from "meriyah";

/**
 * @typedef {Object<DocParserPackage, string[]>} DocParserCollectedFiles
 */

/**
 * @typedef {Object<
 *   string,
 *   { comments: DocParserJSComment[], source: *[]}
 *   >} DocParserParsedFileCollection
 */

/** @type {DocParserPackage[]} */
export const packages = [
  "insight",
  "stdlib",
  "cli",
  // "code-gen",
  "store",
  "server",
];

/**
 * The public symbols of a package
 *
 * @type {Object<DocParserPackage, string[]>}
 */
export const symbols = {
  insight: [
    "newLogger",
    "newEvent",
    "newEventFromEvent",
    "eventStart",
    "eventStop",
    "bytesToHumanReadable",
    "printProcessMemoryUsage",
  ],

  stdlib: [
    "mainFn",
    "filenameForModule",
    "dirnameForModule",
    "isProduction",
    "isStaging",
    "refreshEnvironmentCache",
    "isNil",
    "isPlainObject",
    "uuid",
    "noop",
    "merge",
    "streamToBuffer",
    "pathJoin",
    "exec",
    "spawn",
    "processDirectoryRecursive",
    "processDirectoryRecursiveSync",
    "flatten",
    "unFlatten",
    "getSecondsSinceEpoch",
  ],

  cli: ["test", "mainTestFn", "bench", "mainBenchFn"],

  store: [
    "newPostgresConnection",
    "setStoreQueries",
    "query",
    "isQueryPart",
    "stringifyQueryPart",
    "explainAnalyzeQuery",
    "newMigrateContext",
    "getMigrationsToBeApplied",
    "runMigrations",
    "addJobToQueue",
    "addRecurringJobToQueue",
    "newSessionStore",
    "newMinioClient",
    "ensureBucket",
    "removeBucket",
    "listObjects",
    "removeBucketAndObjectsInBucket",
    "createOrUpdateFile",
    "copyFile",
    "getFileStream",
    "syncDeletedFiles",
    "hostChildrenToParent",
    "updateFileGroupOrder",
    "createTestPostgresDatabase",
    "cleanupTestPostgresDatabase",
  ],

  server: [
    "getApp",
    "sendFile",
    "createBodyParsers",
    "session",
    "compose",
    "createTestAppAndClient",
    "closeTestApp",
  ],
};

/**
 * Recursively goes through the compas directories and returns all JS files.
 * Contains some hardcoded filters for things like test files.
 *
 * @param {Event} event
 * @returns {Promise<DocParserCollectedFiles>}
 */
export async function packageListFiles(event) {
  eventStart(event, "package.listFiles");

  const files = {};

  const processFn = (pkg) => (file) => {
    // Only support JS files
    if (!file.endsWith(".js")) {
      return;
    }

    // Skip test and bench files
    if (file.endsWith(".test.js") || file.endsWith(".bench.js")) {
      return;
    }

    // Ignore the root index file, specify the symbols manually
    if (file.endsWith(`/${pkg}/index.js`)) {
      return;
    }

    files[pkg].push(file);
  };

  for (const pkg of packages) {
    files[pkg] = [];
  }

  await Promise.all(
    packages.map((it) =>
      processDirectoryRecursive(
        pathJoin(process.cwd(), `../compas/packages/${it}`),
        processFn(it),
      ),
    ),
  );

  eventStop(event);

  return files;
}

/**
 * Throw the list of files through the JS Parser
 *
 * @param {Event} event
 * @param {DocParserCollectedFiles} collectedFiles
 * @returns {Promise<DocParserParsedFileCollection>}
 */
export async function packageParseFiles(event, collectedFiles) {
  eventStart(event, "package.parseFiles");

  const result = {};

  const fileHandler = (pkg) => async (file) => {
    const comments = [];
    const source = await readFile(file, "utf-8");
    const parseResult = parseModule(source, {
      onComment: comments,
      ranges: true,
      next: true,
      loc: true,
    });

    for (const cmt of comments) {
      cmt.range = {
        start: cmt.start,
        end: cmt.end,
        pkg,
        file,
        line: cmt.loc.start.line,
      };

      delete cmt.loc;
      delete cmt.start;
      delete cmt.end;
    }

    result[file] = {
      comments,
      source: parseResult.body,
    };
  };

  for (const pkg of packages) {
    const handler = fileHandler(pkg);

    // Create a copy for easier parallel processing
    const files = [...collectedFiles[pkg]];

    // Read files in parallel.
    // Parsing is synchronous, so no way to speed that up
    while (files.length > 0) {
      const fileSubset = files.splice(0, 5);
      await Promise.all(fileSubset.map((it) => handler(it)));
    }
  }

  eventStop(event);

  return result;
}
