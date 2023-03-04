import "./util/env.ts";
import { Application, Router, send  } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { renderFile } from "https://deno.land/x/pug/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import { Options, LocalsObject } from "https://cdn.esm.sh/v56/pug@3.0.2/deno/pug.bundle.js";
import { getMod, getMods } from "./services/mods.ts";


function renderPug(template_name: string, data: Options & LocalsObject) {
  const filepath = path.join(Deno.cwd(), "frontend", `${template_name}.pug`);
  console.log(filepath);
  const result = renderFile(filepath, data);
  console.log(result);
  return result;
}

export async function startServer() {
  /**
   * Initialize.
   */

  const app = new Application();
  const router = new Router();

  app.use(async (context, next) => {
    console.log({pathname: context.request.url.pathname});
    if (!context.request.url.pathname.startsWith("/static")) {
      console.log('calling next');
      
      return await next();
    }
    const filePath = context.request.url.pathname.replace("/static", "");
    await send(context, filePath, {
      root: path.join(Deno.cwd(), "/frontend/static"),
    });
  });

  /**
   * Setup routes.
   */
  router
    .get("/how-to-mod", (context) => {
      context.response.body = renderPug("how-to-mod", {});
    })
    .get("/upload", (context) => {
      context.response.body = renderPug("upload", {});
    })
    .get("/", async (context) => {
      console.log('next')
      const mods = await getMods();
      console.log({mods});
      
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
  /**
   * Setup middleware.
   */

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.addEventListener('listen', () => {
    console.log('Server started on port 8000');
  });
  await app.listen({
    port: parseInt(Deno.env.get("PORT")),
  });
}