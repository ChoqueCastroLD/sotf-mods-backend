import { Middleware } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { getUserByToken } from "../services/users.ts";

export const authMiddleware: Middleware = async function (context, next) {
    context.state.user = null;
    const token = await context.cookies.get("token");

    if (token) {
        const user = await getUserByToken(token);
        context.state.user = user;
    }

    await next();
}

export const protectedRoute: Middleware = async function (context, next) {
    if (!context.state.user) {
        context.response.redirect("/user/login");
        return;
    }
    await next();
}
