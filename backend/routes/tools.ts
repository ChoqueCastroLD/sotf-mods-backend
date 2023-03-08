import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { items } from "../util/items.ts";
import { characters, characterType } from "../util/characters.ts";
import { render } from "../util/render.ts";

export const router = new Router();

router.get("/tools/items", async (context) => {
    context.response.body = await render("items", {
        items,
    });
});

router.get("/tools/characters", async (context) => {
    context.response.body = await render("characters", {
        characters,
        characterType,
    });
});

router.get("/tools/commands", async (context) => {
    context.response.body = await render("characters", {
        characters,
        characterType,
    });
});

router.get("/tools/objects", async (context) => {
    context.response.body = await render("characters", {
        characters,
        characterType,
    });
});
