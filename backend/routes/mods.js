import Router from "@koa/router";
import semver from "semver";
import { getMod, getModDownloadVersion, addDownload } from "../services/mods.js";
import { render } from "../util/render.js";


export const router = new Router();

router.get("/mods", async (context) => {
    context.response.body = await render("mods", {
        user: context.state.user,
    });
});

router.get("/mods/:user_slug/:mod_slug", async (context) => {
    if (context.params.mod_slug.endsWith(".json")) {
        const modSlug = context.params.mod_slug.replace(".json", "");
        const mod = await getMod(modSlug, context.params.user_slug, context.state.user);

        context.response.body = {
            "author_name": "A mod by " + mod.user.name,
            "author_url": "https://sotf-mods.com/profile/" + mod.user.slug,
            "provider_name": "Find the best mods for Sons of The Forest at SOTF-Mods.com",
            "provider_url": `https://sotf-mods.com/mods/${mod.user.slug}/${mod.slug}`,
            "type": "photo",
        };
    } else {
        const mod = await getMod(context.params.mod_slug, context.params.user_slug, context.state.user);
        if (mod.latest_version) {
            mod.next_version = semver.inc(mod.latest_version && mod.latest_version.version, "patch");
        }
        context.response.body = await render("mod", {
            user: context.state.user,
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

    const MOD_DOWNLOAD_ENDPOINT = process.env.MOD_DOWNLOAD_ENDPOINT + "";

    const response = await fetch(`${MOD_DOWNLOAD_ENDPOINT}/${modVersion.filename}`);

    if (!response.ok) {
        context.response.status = response.status;
        context.response.body = "Download failed. Mod version not found.";
        return;
    }

    addDownload(modVersion.id, context.request.ip, context.request.headers["user-agent"] ?? "")
        .then(() => {
            console.log("Download added to mod version id " + modVersion.id);
        })
        .catch((err) => {
            console.error(err);
        });

    context.set("Content-Disposition", `attachment; filename=${modVersion.filename}`);
    context.response.body = await response.arrayBuffer();
});

router.get("/mods/upload", async (context) => {
    context.response.body = await render("upload", {
        user: context.state.user,
    });
});
