import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { render } from "../util/render.ts";
import { getModsFromUser } from "../services/mods.ts";
import { getProfileBySlug, registerUser, loginUser } from "../services/users.ts";

export const router = new Router();

router.get("/user/login", async (context) => {
    context.response.body = await render("user/login", {});
});

router.get("/user/register", async (context) => {
    context.response.body = await render("user/register", {});
});

router.post("/user/register", async (context) => {
    try {
        const { email, username, password, confirm_password } = await context.request.body().value;
        const { errors, status } = await registerUser(email, username, password, confirm_password);

        context.response.status = errors.length > 0 ? 400 : 201;
        context.response.body = { errors, status };
    } catch (error) {
        context.response.status = 400;
        context.response.body = { error: error.message, status: false };
    }
});

router.post("/user/login", async (context) => {
    try {
        const { email, password } = await context.request.body().value;
        const { errors, status, token } = await loginUser(email, password);

        context.cookies.set("token", token);

        context.response.status = errors.length > 0 ? 400 : 201;
        context.response.body = { errors, status, token };
    } catch (error) {
        context.response.status = 400;
        context.response.body = { error: error.message };
    }
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
