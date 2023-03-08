import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { render } from "../util/render.ts";

import { router as modsRouter } from "./mods.ts";
import { router as guidesRouter } from "./guides.ts";
import { router as toolsRouter } from "./tools.ts";
import { router as usersRouter } from "./users.ts";

export const router = new Router();

router.get("/", (context) => {
    context.response.redirect("/mods");
});

router.use(usersRouter.routes());
router.use(modsRouter.routes());
router.use(guidesRouter.routes());
router.use(toolsRouter.routes());