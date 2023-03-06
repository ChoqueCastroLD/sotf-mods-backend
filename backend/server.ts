// deno-lint-ignore-file
import "./util/env.ts";
import { Application, Router, isHttpError } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { renderFileAsync } from "https://deno.land/x/pug_async@1.0.2/mod.ts";
import * as path from "https://deno.land/std@0.178.0/path/mod.ts";
import { getMod, getMods, getModDownloadVersion } from "./services/mods.ts";
import { items } from "./util/items.ts";
import { staticAssetsMiddleware } from "./middlewares/static.ts";
import logger from "https://deno.land/x/oak_logger@1.0.0/mod.ts";

// todo: delete this later
let cache_mods: any[] = [];
function updateModsCache() {
  console.log('getting mods for cache');
  getMods().then((mods) => {
    console.log('got mods '+mods.length+' for cache');
    cache_mods = mods;
  }).catch((err) => {
    console.error(err);
  });
}
updateModsCache();
setInterval(updateModsCache, 1000 * 60 * 5); // 5 minutes
// --------------------

async function renderPug(template_name: string, data: any) {
  const filepath = path.join(Deno.cwd(), "frontend", `${template_name}.pug`);
  return await renderFileAsync(filepath, data) as string;
}

export async function startServer() {
  const app = new Application();
  const router = new Router();

  app.use(async (context, next) => {
    try {
      await next();
    } catch (err) {
      if (isHttpError(err)) {
        context.response.status = err.status;
      } else {
        context.response.status = 500;
      }
      context.response.body = "Something went wrong, please try again later. If this problem persists, please contact the developer. with the following error: " + err.message;
    }
  });

  app.use(staticAssetsMiddleware);
  app.use(logger.logger);
  app.use(logger.responseTime);

  router
    .get("/how-to-mod", async (context) => {
      context.response.body = await renderPug("how-to-mod", {});
    })
    .get("/upload", async (context) => {
      context.response.body = await renderPug("upload", {});
    })
    .get("/", async (context) => {
      context.response.body = await renderPug("index", {
        mods: cache_mods,
      });
    })
    .get("/mod/:user_slug/:mod_slug", async (context) => {
      const mod = await getMod(context.params.mod_slug, context.params.user_slug);
      context.response.body = await renderPug("mod", {
        mod,
      });
    })
    .get("/mod/:user_slug/:mod_slug/download/:version", async (context) => {
      const downloadURL = await getModDownloadVersion(context.params.mod_slug, context.params.user_slug, context.params.version);
      if (!downloadURL) {
        context.response.status = 404;
        context.response.body = "Download url not found. Contact mod developer.";
        return;
      }
      context.response.redirect(downloadURL);
    })
    .get("/profile/:user_slug", async (context) => {
      context.response.body = "to be implemented";
    })
    .get("/tools/items", async (context) => {
      context.response.body = await renderPug("items", {
        items,
      });
    })

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.addEventListener('listen', () => {
    console.log(`Server started on port ${Deno.env.get("PORT")}`);
  });

  await app.listen({
    port: parseInt(Deno.env.get("PORT")),
  });
}