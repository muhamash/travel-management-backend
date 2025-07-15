"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstVersionRouter = void 0;
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
exports.firstVersionRouter = (0, express_1.Router)();
const moduleRouter = [
    {
        path: "/user",
        route: user_route_1.userRouter
    },
    {
        path: "/auth",
        route: auth_route_1.authRoutes
    }
];
moduleRouter.forEach((route) => {
    exports.firstVersionRouter.use(route.path, route.route);
});
