import dotenv from "dotenv";
import { EnvString } from "./config.types";

dotenv.config();

export const envStrings : EnvString = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV
};