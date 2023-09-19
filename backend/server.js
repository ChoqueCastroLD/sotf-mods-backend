import "./util/env.js";
import Koa from "koa";
import { HttpError } from "koa";
import logger from "koa-logger";
import cors from "@koa/cors";
import bodyParser from "@koa/bodyparser";
import { staticAssetsMiddleware } from "./middlewares/static.js";
import { router } from "./routes/router.js";

export async function startServer(port = 8000) {
  const app = new Koa();
  
  app.use(cors());
  app.use(bodyParser());

  app.use(async (context, next) => {
    try {
      await next();
    } catch (err) {
      console.log(err);
      if (err instanceof HttpError) {
        context.response.status = err.status;
      } else {
        context.response.status = 500;
      }
      context.response.body = "Something went wrong, please try again later. If this problem persists, please contact the developer. with the following error: " + err.message;
    }
  });

  app.use(staticAssetsMiddleware);
  app.use(logger());

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen({
    port,
  });
}