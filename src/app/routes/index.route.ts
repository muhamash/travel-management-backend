import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { tourRoutes } from "../modules/tour/tour.route";
import { userRouter } from "../modules/user/user.route";


export const firstVersionRouter = Router();

const moduleRouter = [
    {
        path: "/user",
        route: userRouter
    },
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/tour",
        route: tourRoutes
    }
];

moduleRouter.forEach( ( route ) =>
{
    firstVersionRouter.use(route.path, route.route)
} )