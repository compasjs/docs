import { existsSync } from "fs";

/**
 * Quick check if Compas is checked out at ../compas
 *
 * @returns {boolean}
 */
export function hasCompasDirectoryAvailable() {
  return (
    existsSync("../compas") &&
    existsSync("../compas/packages") &&
    existsSync("../compas/packages/stdlib")
  );
}
