import { Router } from "express";
import { userRouter } from "../modules/user/user.route";


export const firstVersionRouter = Router();

const moduleRouter = [
    {
        path: "/user",
        route: userRouter
    }
];

moduleRouter.forEach( ( route ) =>
{
    firstVersionRouter.use(route.path, route.route)
} )