import Router from "@koa/router";
import { render } from "../util/render.js";


export const router = new Router();

router.get("/loader", async (context) => {
    context.response.body = await render("loader", { user: context.state.user });
});
