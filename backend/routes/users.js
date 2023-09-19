import Router from "@koa/router";
import { render } from "../util/render.js";
import { getModsFromUser } from "../services/mods.js";
import { getProfileBySlug } from "../services/users.js";
import { protectedRoute } from "../middlewares/auth.js";

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

router.get("/user/upload", protectedRoute, async (context) => {
    context.response.body = await render("user/upload", {
        user: context.state.user,
    });
});
