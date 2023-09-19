import Router from "@koa/router";

import { router as modsRouter } from "./mods.js";
import { router as loaderRouter } from "./loader.js";
import { router as usersRouter } from "./users.js";
import { router as authRouter } from "./auth.js";
import { router as apiRouter } from "./api.js";
import { router as imagesRouter } from "./images.js";
import { authMiddleware } from "../middlewares/auth.js";

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