import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { render } from "../util/render.ts";

export const router = new Router();

router.get("/user/login", async (context) => {
    context.response.body = await render("user/login", {});
});

router.get("/user/register", async (context) => {
    context.response.body = await render("user/register", {});
});

router.get("/profile/:user_slug", async (context) => {
    context.response.body = await render("profile", {});
});

router.get("/mod-ideas", async (context) => {
    context.response.body = await render("mod-ideas", {});
});
