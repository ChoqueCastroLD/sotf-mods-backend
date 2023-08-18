import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import imagesController from "../controllers/images.ts";


export const router = new Router();

router.get("/images/:filename/preview", imagesController.downloadImagePreview);

router.get("/images/:filename", imagesController.downloadImage);
