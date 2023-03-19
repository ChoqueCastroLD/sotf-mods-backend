import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { getMod, getMods, getModDownloadVersion, addDownload } from "../services/mods.ts";
import { render } from "../util/render.ts";

export const router = new Router();

router.get("/mods", async (context) => {
  const mods = await getMods();
  context.response.body = await render("mods", {
    mods,
  });
});

router.get("/mods/:user_slug/:mod_slug", async (context) => {
    if (context.params.mod_slug.endsWith(".json")) {
        const modSlug = context.params.mod_slug.replace(".json", "");
        const mod = await getMod(modSlug, context.params.user_slug);
        context.response.body = {
            "author_name": "A mod by " + mod.user.name,
            "author_url": "https://sotf-mods.com/profile/" + mod.user.slug,
            "provider_name": "Find the best mods for Sons of The Forest at SOTF-Mods.com",
            "provider_url": `https://sotf-mods.com/mods/${mod.user.slug}/${mod.slug}`,
            "type": "photo",
        };
    } else {
        const mod = await getMod(context.params.mod_slug, context.params.user_slug);
        context.response.body = await render("mod", {
            mod,
        });
    }
});

router.get("/mods/:user_slug/:mod_slug/download/:version", async (context) => {
    const modVersion = await getModDownloadVersion(context.params.mod_slug, context.params.user_slug, context.params.version);
    if (!modVersion) {
        context.response.status = 404;
        context.response.body = "Download url not found. Contact mod developer.";
        return;
    }
    addDownload(modVersion.id, context.request.ip, context.request.headers.get("user-agent") ?? "")
        .then(() => {
            console.log("Download added to mod version id " + modVersion.id);
        })
        .catch((err) => {
            console.error(err);
        });
    context.response.redirect(modVersion.downloadUrl);
});

router.get("/upload", async (context) => {
    context.response.body = await render("upload", {});
});

router.get("/search", async (context) => {
    context.response.body = await render("upload", {});
});
