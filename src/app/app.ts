import express, { Application, NextFunction, Request, Response } from "express";
import { userRouter } from "./modules/user/user.route";
import cors from 'cors'

const app: Application = express();

app.use( express.json() )
app.use(cors())

app.use( "/api/v1/user", userRouter )


// global not found route
app.use( async (req: Response, res: Request, next: NextFunction) =>
{
    res.status( 200 ).json( {
        success: false,
        status: "error",
        message: "Route not found!"
    } );
} );

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