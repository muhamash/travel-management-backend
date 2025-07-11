import express, { Application, NextFunction, Request, Response } from "express";
import { userRouter } from "./modules/user/user.route";
import cors from 'cors'
import { firstVersionRouter } from "./routes/index.route";
import httpStatus from 'http-status-codes';
import { globalErrorResponse } from "./middleware/globalError.middleware";
import { globalNotFoundResponse } from "./middleware/globalNotFound.middleware";
import { homeController } from "./modules/home/home.controller";

const app: Application = express();

app.use( express.json() )
app.use( cors() )

// demo home route 
app.get( "/", homeController );

// actual business route
app.use( "/api/v1", firstVersionRouter )


// global not found route
app.use( globalNotFoundResponse );
// global error response
app.use( globalErrorResponse );


export default app;