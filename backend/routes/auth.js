import Router from "@koa/router";
import { clearCookie, setCookie } from "koa-cookies";
import { registerUser, loginUser } from "../services/users.js";

export const router = new Router();

router.post("/user/register", async (context) => {
    try {
        const { email, username, password, confirm_password } = await context.request.body;
        const { errors, status } = await registerUser(email, username, password, confirm_password);

        context.response.status = errors.length > 0 ? 400 : 201;
        context.response.body = { errors, status };
    } catch (error) {
        context.response.status = 400;
        context.response.body = { error: error.message, status: false };
        throw error;
    }
});

router.post("/user/login", async (context) => {
    try {
        const { email, password } = await context.request.body;
        const { errors, status, token } = await loginUser(email, password);

        setCookie("token", token)(context);

        context.response.status = errors.length > 0 ? 400 : 201;
        context.response.body = { errors, status, token };
    } catch (error) {
        context.response.status = 400;
        context.response.body = { error: error.message };
        throw error;
    }
});

router.get("/user/logout", (context) => {
    clearCookie("token")(context);
    context.response.redirect("/");
});