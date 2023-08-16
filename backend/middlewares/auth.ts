import { Middleware } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { getUserByToken } from "../services/users.ts";

export const authMiddleware: Middleware = async function (context, next) {
    context.state.user = null;
    const token = await context.cookies.get("token");

    if (token) {
        const user = await getUserByToken(token);
        delete user?.password;
        delete user?.createdAt;
        delete user?.id;
        delete user?.updatedAt;
        user.token = token;
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

export const protectedRouteAPI: Middleware = async function (context, next) {
    const token = context.request.headers.get("Authorization")?.split("Bearer ").pop();
    
    if (!token) {
        context.response.status = 401;
        context.response.body = {error: "Unauthorized"};
        return;
    }

    try {
        const user = await getUserByToken(token);
        context.state.user = user;
    } catch (error) {
        context.response.status = 401;
        context.response.body = "Unauthorized";
        console.error(error);
        return;
    }

    await next();
}
