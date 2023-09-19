import Router from "@koa/router";
import imagesController from "../controllers/images.js";


export const router = new Router();

router.get("/images/:filename/preview", imagesController.downloadImagePreview);

router.get("/images/:filename", imagesController.downloadImage);
