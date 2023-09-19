import { getUserByToken } from "../services/users.js";
import { verifyToken } from "../util/token.js";

export const authMiddleware = async function (context, next) {
    context.state.user = null;
    const token = context.cookies.get("token");
    const userId = token ? verifyToken(token)?.data?.userId : null;
    if (userId) {
        const user = await getUserByToken(userId);
        delete user.password;
        delete user.createdAt;
        delete user.id;
        delete user.updatedAt;
        user.token = token;
        context.state.user = user;
    }
    await next();
}

export const protectedRoute = async function (context, next) {
    if (!context.state.user) {
        context.response.redirect("/user/login");
        return;
    }
    await next();
}

export const protectedRouteAPI = async function (context, next) {
    const token = context.request.headers.authorization?.split("Bearer ").pop();
    if (!token) {
        context.response.status = 401;
        context.response.body = {error: "Unauthorized"};
        return;
    }

    try {
        const userId = verifyToken(token)?.data?.userId;
        const user = await getUserByToken(userId);
        context.state.user = user;
    } catch (error) {
        context.response.status = 401;
        context.response.body = "Unauthorized";
        console.error(error);
        return;
    }

    await next();
}
