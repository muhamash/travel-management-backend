import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from "express";
import expressSession from "express-session";
import passport from 'passport';
import "./config/passport/passport.config";
import { globalErrorResponse } from "./middleware/globalError.middleware";
import { globalNotFoundResponse } from "./middleware/globalNotFound.middleware";
import { homeController } from "./modules/home/home.controller";
import { firstVersionRouter } from "./routes/index.route";

const app: Application = express();

app.use( expressSession( {
    secret: "my-sercet",
    resave: true,
    saveUninitialized:false
} ) );
app.use( passport.initialize() );
app.use( passport.session() );
app.use( cookieParser() );
app.use( express.json() );
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,             
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// demo home route 
app.get( "/", homeController );

// actual business route
app.use( "/api/v1", firstVersionRouter );

// global not found route
app.use( globalNotFoundResponse );
// global error response
app.use( globalErrorResponse );


export default app;