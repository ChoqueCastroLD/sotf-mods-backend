import { Router, isHttpError } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import kelvinGPTController from "../controllers/kelvin-gpt.ts";
import modsController from "../controllers/mods.ts";
import { protectedRouteAPI } from "../middlewares/auth.ts";


export const router = new Router();


router.use(async (context, next) => {
    try {
      await next();
    } catch (err) {
      console.error(err);
      if (isHttpError(err)) {
        context.response.status = err.status;
      } else {
        context.response.status = 400;
      }
      context.response.body = {status: false, message: err?.message ?? err};
    }
});

router.get("/api/kelvin-gpt", kelvinGPTController.prompt);

router.get("/api/mods", modsController.getMods);

router.get("/api/mods/user/:user_slug", modsController.getModsFromUser);

router.get("/api/mods/:user_slug/:mod_slug", modsController.getMod);

router.get("/api/mods/:user_slug/:mod_slug/check", modsController.checkVersion);

router.get("/api/favorite/:user_slug/:mod_slug", protectedRouteAPI, modsController.toggleFavorite);

router.get("/api/favorites/:user_slug", modsController.getFavoriteModsIds);

router.post("/api/mods/upload", protectedRouteAPI, modsController.uploadMod);

router.post("/api/mods/:user_slug/:mod_slug/release", protectedRouteAPI, modsController.releaseVersion);

router.patch("/api/mods/:user_slug/:mod_slug/details", protectedRouteAPI, modsController.updateMod);
