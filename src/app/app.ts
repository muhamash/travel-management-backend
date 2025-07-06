import express, { Application, NextFunction, Request, Response } from "express";

const app: Application = express();


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