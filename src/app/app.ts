import express, { Application, NextFunction, Request, Response } from "express";
import { userRouter } from "./modules/user/user.route";

const app: Application = express();

app.use("api/v1/user", userRouter)

app.get( "/", async( req: Response, res: Request, next: NextFunction ) =>
{
    res.status(200).json( {
        success: true,
        status: "ok",
        message: "App is in service!"
    } );

    next()
} );




export default app;