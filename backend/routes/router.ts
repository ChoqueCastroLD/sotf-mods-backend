import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import { router as modsRouter } from "./mods.ts";
import { router as guidesRouter } from "./guides.ts";
import { router as toolsRouter } from "./tools.ts";
import { router as usersRouter } from "./users.ts";
import { authMiddleware } from "../middlewares/auth.ts";

export const router = new Router();

router.get("/user/logout", (context) => {
    context.cookies.delete("token");
    context.response.redirect("/");
});

router.use(authMiddleware);

router.get("/", (context) => {
    context.response.redirect("/mods");
});

router.use(usersRouter.routes());
router.use(modsRouter.routes());
router.use(guidesRouter.routes());
router.use(toolsRouter.routes());