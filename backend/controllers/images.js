export default {
  downloadImagePreview: async (ctx) => {
    const filename = ctx.params.filename;

    const IMAGE_DOWNLOAD_ENDPOINT = process.env.IMAGE_DOWNLOAD_ENDPOINT + "";

    const response = await fetch(`${IMAGE_DOWNLOAD_ENDPOINT}/${filename}/preview`);
    
    if (!response.ok) {
        ctx.response.status = response.status;
        ctx.response.body = "Mod image preview not found";
        return;
    }

    ctx.set("Cache-Control", "public, max-age=31536000");
    ctx.response.body = await response.arrayBuffer();
  },
  downloadImage: async (ctx) => {
    const filename = ctx.params.filename;

    const IMAGE_DOWNLOAD_ENDPOINT = process.env.IMAGE_DOWNLOAD_ENDPOINT + "";

    const response = await fetch(`${IMAGE_DOWNLOAD_ENDPOINT}/${filename}`);
    
    if (!response.ok) {
        ctx.response.status = response.status;
        ctx.response.body = "Mod image not found";
        return;
    }

    ctx.set("Cache-Control", "public, max-age=31536000");
    ctx.response.body = await response.arrayBuffer();
  },
}
