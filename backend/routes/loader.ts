import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { render } from "../util/render.ts";


export const router = new Router();

router.get("/loader", async (context) => {
    context.response.body = await render("loader", { user: context.state.user });
});
