import HttpError from "http-errors";
import Router from "@koa/router";
import multer from "@koa/multer";
import kelvinGPTController from "../controllers/kelvin-gpt.js";
import modsController from "../controllers/mods.js";
import { protectedRouteAPI } from "../middlewares/auth.js";


const upload = multer();
export const router = new Router();

router.use(async (context, next) => {
    try {
      await next();
    } catch (err) {
      console.error(err);
      if (err instanceof HttpError) {
        context.response.status = err.status;
      } else {
        context.response.status = 400;
      }
      context.response.body = {status: false, message: err?.message ?? err};
    }
});

router.get("/api/kelvin-gpt", kelvinGPTController.prompt);

router.get("/api/kelvin-gpt/clear", kelvinGPTController.clear);

router.get("/api/mods", modsController.getMods);

router.get("/api/mods/user/:user_slug", modsController.getModsFromUser);

router.get("/api/mods/:user_slug/:mod_slug", modsController.getMod);

router.get("/api/mods/:user_slug/:mod_slug/check", modsController.checkVersion);

router.get("/api/favorite/:user_slug/:mod_slug", protectedRouteAPI, modsController.toggleFavorite);

router.get("/api/favorites/:user_slug", modsController.getFavoriteModsIds);

router.post("/api/mods/upload", protectedRouteAPI, upload.fields([{name: 'modFile', maxCount: 1}, {name: 'modThumbnail', maxCount: 1}]), modsController.uploadMod);

router.post("/api/mods/:user_slug/:mod_slug/release", protectedRouteAPI, upload.fields([{name: 'modFile', maxCount: 1}]), modsController.releaseVersion);

router.patch("/api/mods/:user_slug/:mod_slug/details", protectedRouteAPI, upload.fields([{name: 'modThumbnail', maxCount: 1}]), modsController.updateMod);
