import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import { router as modsRouter } from "./mods.ts";
import { router as loaderRouter } from "./loader.ts";
import { router as usersRouter } from "./users.ts";
import { router as authRouter } from "./auth.ts";
import { router as apiRouter } from "./api.ts";
import { router as imagesRouter } from "./images.ts";
import { authMiddleware } from "../middlewares/auth.ts";

export const router = new Router();

router.use(apiRouter.routes());
router.use(imagesRouter.routes());
router.use(authRouter.routes());

router.use(authMiddleware);

router.get("/", (context) => {
    context.response.redirect("/mods");
});

router.use(usersRouter.routes());
router.use(modsRouter.routes());
router.use(loaderRouter.routes());