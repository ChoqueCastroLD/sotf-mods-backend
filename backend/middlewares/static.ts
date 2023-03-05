import { send, Middleware } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import * as path from "https://deno.land/std@0.178.0/path/mod.ts";

export const staticAssetsMiddleware: Middleware = async function (context, next) {
    if (!context.request.url.pathname.startsWith("/static")) {
      return await next();
    }
    const filePath = context.request.url.pathname.replace("/static", "");
    return await send(context, filePath, {
      root: path.join(Deno.cwd(), "/frontend/static"),
    });
  }