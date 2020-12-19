import { mainFn } from "@compas/stdlib";

mainFn(import.meta, (logger) => {
  logger.info({ hello: "worlds" });
});
