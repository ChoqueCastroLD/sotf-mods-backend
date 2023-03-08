// deno-lint-ignore-file
import "./util/env.ts";
import { Application, Router, isHttpError } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { staticAssetsMiddleware } from "./middlewares/static.ts";
import logger from "https://deno.land/x/oak_logger@1.0.0/mod.ts";
import { router } from "./routes/router.ts";

export async function startServer(port = 8000) {
  const app = new Application();

  app.use(async (context, next) => {
    try {
      await next();
    } catch (err) {
      console.error(err);
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

  app.use(router.routes());

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.addEventListener('listen', () => {
    console.log(`Server started on port ${port}`);
  });

  await app.listen({
    port,
  });
}