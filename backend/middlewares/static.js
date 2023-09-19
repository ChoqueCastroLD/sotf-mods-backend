import send from "koa-send";
import path from "path";

export const staticAssetsMiddleware = async function (context, next) {
  if (!context.request.url.startsWith("/static")) {
    return await next();
  }
  const filePath = context.request.url.replace("/static", "");
  const path_string = path.join(process.cwd(), "/frontend/static");
  return await send(context, filePath, {
    root: path_string.toString(),
  });
}
