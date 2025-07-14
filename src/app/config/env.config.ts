import dotenv from "dotenv";
import { EnvString } from "./config.types";

dotenv.config();

export const envStrings: EnvString = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFERSH_TOKEN_SECRET
};