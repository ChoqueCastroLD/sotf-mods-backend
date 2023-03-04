import env from "./util/env.ts";
import { prisma } from "./services/prisma.ts";
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { renderFile } from "https://deno.land/x/pug/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import { Options,LocalsObject } from "https://cdn.esm.sh/v56/pug@3.0.2/deno/pug.bundle.js";
import { decorateMod, getMods } from "./services/mods.ts";

/**
 * Start server.
 */

export async function startServer() {
  /**
   * Initialize.
   */

  const app = new Application();
  const router = new Router();

  function renderPug(template_name: string, data: Options & LocalsObject) {
    const filepath = path.join(Deno.cwd(), "frontend", `${template_name}.pug`);
    return renderFile(filepath, data);
  }


  /**
   * Setup routes.
   */
  router
    .get("/how-to-mod", async (context) => {
      context.response.body = "hola";
    })
    .get("/", async (context) => {
      console.log('got request')
      const mods = await getMods();
      console.log(mods);
      context.response.body = await renderPug("index", {
        mods,
      });
    })
    .get("/mod/:user_slug/:mod_slug", async (context) => {
      const mod = await prisma.mod.findFirst({
        where: {
          slug: context.params.mod_slug,
          user: {
            slug: context.params.user_slug,
          }
        },
        include: {
          images: true,
          user: true,
          versions: true,
          _count: {
            select: {
              favorites: true,
            }
          }
        },
      });
      context.response.body = await renderPug("mod", {
        mod: await decorateMod(mod),
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
    port: parseInt(env.PORT) || 8000
  });
}