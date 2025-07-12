import cors from 'cors';
import express, { Application } from "express";
import { globalErrorResponse } from "./middleware/globalError.middleware";
import { globalNotFoundResponse } from "./middleware/globalNotFound.middleware";
import { homeController } from "./modules/home/home.controller";
import { firstVersionRouter } from "./routes/index.route";

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