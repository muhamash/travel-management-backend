import dotenv from "dotenv";
import { EnvString } from "./types.config";

dotenv.config();

export const envStrings: EnvString = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFERSH_TOKEN_SECRET,
    BCRYPT_SALT: process.env.BCRYPT_SALT,
    ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    REFRESH_TOKEN_EXPIRE: process.env.REFERSH_TOKEN_EXPIRE_TIME,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_USERNAME: process.env.REDIS_USERNAME || "",
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
    GMAIL_ADDRESS_HOST: process.env.GMAIL_ADDRESS_HOST,
    GMAIL_APP_PASS: process.env.GMAIL_APP_PASS,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    // GMAIL_ADDRESS_HOST: process.env.GMAIL_ADDRESS_HOST,

};