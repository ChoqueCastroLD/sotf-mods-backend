import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";


export default {
  downloadImagePreview: async (ctx: Context) => {
    const filename = ctx.params.filename;

    const IMAGE_DOWNLOAD_ENDPOINT = Deno.env.get("IMAGE_DOWNLOAD_ENDPOINT") + "";

    const response = await fetch(`${IMAGE_DOWNLOAD_ENDPOINT}/${filename}/preview`);
    
    if (!response.ok) {
        ctx.response.status = response.status;
        ctx.response.body = "Mod image preview not found";
        return;
    }

    ctx.response.headers.set("Cache-Control", "public, max-age=31536000");
    ctx.response.body = await response.arrayBuffer();
  },
  downloadImage: async (ctx: Context) => {
    const filename = ctx.params.filename;

    const IMAGE_DOWNLOAD_ENDPOINT = Deno.env.get("IMAGE_DOWNLOAD_ENDPOINT") + "";

    const response = await fetch(`${IMAGE_DOWNLOAD_ENDPOINT}/${filename}`);
    
    if (!response.ok) {
        ctx.response.status = response.status;
        ctx.response.body = "Mod image not found";
        return;
    }

    ctx.response.headers.set("Cache-Control", "public, max-age=31536000");
    ctx.response.body = await response.arrayBuffer();
  },
}
