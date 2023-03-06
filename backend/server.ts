// deno-lint-ignore-file
import "./util/env.ts";
import { Application, Router  } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { renderFileAsync } from "https://deno.land/x/pug_async@1.0.2/mod.ts";
import * as path from "https://deno.land/std@0.178.0/path/mod.ts";
import { getMod, getMods } from "./services/mods.ts";
import { staticAssetsMiddleware } from "./middlewares/static.ts";

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

  app.use(staticAssetsMiddleware);

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
    .get("/mod/:user_slug/:mod_slug/download", async (context) => {
      const mod = await getMod(context.params.mod_slug, context.params.user_slug);
      context.response.body = "tba"
    })
    .get("/profile/:user_slug", async (context) => {
      context.response.body = "to be implemented";
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