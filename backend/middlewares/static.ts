import { send, Middleware } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { Path } from "https://deno.land/x/path@v3.0.0/mod.ts";

export const staticAssetsMiddleware: Middleware = async function (context, next) {
  if (!context.request.url.pathname.startsWith("/static")) {
    return await next();
  }
  const filePath = context.request.url.pathname.replace("/static", "");
  const path_string = new Path(Deno.cwd() + "/frontend/static");
  return await send(context, filePath, {
    root: path_string.toString(),
  });
}
