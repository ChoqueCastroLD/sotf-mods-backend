// deno-lint-ignore-file
import "./util/env.ts";
import { Application, Router  } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { renderFile } from "https://cdn.jsdelivr.net/gh/lumeland/pug@master/mod.ts";
import * as path from "https://deno.land/std@0.178.0/path/mod.ts";
import { getMod, getMods } from "./services/mods.ts";
import { staticAssetsMiddleware } from "./middlewares/static.ts";

function renderPug(template_name: string, data: any) {
  const filepath = path.join(Deno.cwd(), "frontend", `${template_name}.pug`);
  return renderFile(filepath, data) as string;
}

export async function startServer() {
  const app = new Application();
  const router = new Router();

  app.use(staticAssetsMiddleware);

  router
    .get("/how-to-mod", (context) => {
      context.response.body = renderPug("how-to-mod", {});
    })
    .get("/upload", (context) => {
      context.response.body = renderPug("upload", {});
    })
    .get("/", async (context) => {
      const mods = await getMods();
      context.response.body = renderPug("index", {
        mods,
      });
    })
    .get("/mod/:user_slug/:mod_slug", async (context) => {
      const mod = await getMod(context.params.mod_slug, context.params.user_slug);
      context.response.body = renderPug("mod", {
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