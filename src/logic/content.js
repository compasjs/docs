import { lstatSync, readdirSync, readFileSync } from "fs";
import { join, join as pathJoin } from "path";
import matter from "gray-matter";

let _cachedRead = undefined;

const isNil = (value) => value === null || value === undefined;

export async function getContent() {
  const contentDir = pathJoin(process.cwd(), "src/content");

  if (!isNil(_cachedRead) && process.env.NODE_ENV === "production") {
    return _cachedRead;
  }

  const content = {};
  const pages = [];

  processDirectoryRecursiveSync(contentDir, (file) => {
    const contentString = readFileSync(file, "utf8");
    const { data, content: fileContents } = matter(contentString);

    // Path parts from src/content/
    const pathParts = file.substring(contentDir.length + 1).split("/");
    if (pathParts[pathParts.length - 1] === "index.md") {
      pathParts.pop();
    }

    let currentContent = content;
    for (const path of pathParts) {
      currentContent[path] = currentContent[path] ?? {};
      currentContent = currentContent[path];
    }

    currentContent["$page"] = {
      pathParts,
      data,
      content: fileContents,
    };

    pages.push({
      params: {
        slug: pathParts,
      },
    });
  });

  _cachedRead = { content, pages };
  return _cachedRead;
}

/**
 * @param {string} dir
 * @param {Function} cb
 */
export function processDirectoryRecursiveSync(dir, cb) {
  for (const file of readdirSync(dir, { encoding: "utf8" })) {
    if (file === "node_modules") {
      continue;
    }
    if (file[0] === ".") {
      continue;
    }

    const newPath = join(dir, file);
    const stat = lstatSync(newPath);
    if (stat.isDirectory()) {
      processDirectoryRecursiveSync(newPath, cb);
    } else if (stat.isFile()) {
      cb(newPath);
    }
  }
}
