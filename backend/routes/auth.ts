import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { registerUser, loginUser } from "../services/users.ts";

export const router = new Router();

router.post("/user/register", async (context) => {
    try {
        const { email, username, password, confirm_password } = await context.request.body().value;
        const { errors, status } = await registerUser(email, username, password, confirm_password);

        context.response.status = errors.length > 0 ? 400 : 201;
        context.response.body = { errors, status };
    } catch (error) {
        context.response.status = 400;
        context.response.body = { error: error.message, status: false };
    }
});

router.post("/user/login", async (context) => {
    try {
        const { email, password } = await context.request.body().value;
        const { errors, status, token } = await loginUser(email, password);

        context.cookies.set("token", token);

        context.response.status = errors.length > 0 ? 400 : 201;
        context.response.body = { errors, status, token };
    } catch (error) {
        context.response.status = 400;
        context.response.body = { error: error.message };
    }
});

router.get("/user/logout", (context) => {
    context.cookies.delete("token");
    context.response.redirect("/");
});