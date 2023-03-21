import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { render } from "../util/render.ts";
import { getModsFromUser } from "../services/mods.ts";
import { getProfileBySlug } from "../services/users.ts";

export const router = new Router();

router.get("/user/login", async (context) => {
    context.response.body = await render("user/login", {});
});

router.get("/user/register", async (context) => {
    context.response.body = await render("user/register", {});
});

router.get("/profile/:user_slug", async (context) => {
    const slug = context.params.user_slug;
    const userProfile = await getProfileBySlug(slug);
    const mods = await getModsFromUser(slug);
    context.response.body = await render("profile", {
        user: context.state.user,
        userProfile,
        mods,
    });
});

router.get("/user/mods", async (context) => {
    context.response.body = await render("user/mods", {
        user: context.state.user,
    });
});

router.get("/mod-ideas", async (context) => {
    context.response.body = await render("mod-ideas", {
        user: context.state.user,
    });
});
