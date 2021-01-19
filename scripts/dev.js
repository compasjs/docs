import { newEventFromEvent } from "@compas/insight";
import { getApp } from "@compas/server";
import { environment, isProduction, isStaging, mainFn } from "@compas/stdlib";
import {
  annotateItemWithContents,
  getContentStructure,
  setMarkedOptions,
} from "../src/content.js";
import { renderPage } from "../src/renderer.js";
import { renderSitemap } from "../src/sitemap.js";

mainFn(import.meta, main);

/**
 * @type {CliWatchOptions}
 */
export const cliWatchOptions = {
  ignoredPatterns: ["out"],
};

/**
 *
 * @param {Logger} logger
 * @returns {Promise<void>}
 */
async function main(logger) {
  const app = getApp({});
  const port = environment.PORT || 3000;
  const devServerCname = `http://localhost:${port}`;

  setMarkedOptions();

  app.use(async (ctx, next) => {
    if (!ctx.path.endsWith(".html") && !ctx.path.endsWith(".xml")) {
      ctx.status = 404;
      ctx.body = "";
      return next();
    }

    // Strip prefixed / and trailing .html
    const path = ctx.path.substring(1, ctx.path.length - 5);
    const structure = await getContentStructure(newEventFromEvent(ctx.event));

    for (const item of structure) {
      if (item.contentPath === path) {
        await annotateItemWithContents(newEventFromEvent(ctx.event), item);
        ctx.body = await renderPage(
          newEventFromEvent(ctx.event),
          devServerCname,
          structure,
          item,
        );

        return next();
      }
    }

    if (ctx.path === "/sitemap.xml") {
      ctx.body = await renderSitemap(
        newEventFromEvent(ctx.event),
        devServerCname,
        structure,
      );
      ctx.response.set("content-type", "text/xml");

      return next();
    }

    ctx.status = 404;
    ctx.body = "";

    return next();
  });

  app.listen(port, () => {
    logger.info({
      msg: "Listening",
      port,
      isStaging: isStaging(),
      isProduction: isProduction(),
    });
  });
}
