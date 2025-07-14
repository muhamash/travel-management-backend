/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { AppError } from "../config/errors/App.error";
import { isZodError } from "../utils/middleware.util";

export const globalErrorResponse = ( error: unknown, req: Request, res: Response, next: NextFunction ) =>
{
    let statusCode = httpStatus.BAD_REQUEST;
    let message = "Something went wrong";
    let stack: string | undefined;

    if ( isZodError( error ) )
    {
        const issues = ( error as unknown ).issues;
        message = issues?.[ 0 ]?.message || "Validation error";
        stack = ( error as unknown ).stack;
        // console.log( "Zod validation error:", issues );
    }
    else if ( error instanceof AppError )
    {
        statusCode = error.statusCode;
        message = error.message;
        stack = error.stack;
    }
    else if ( error instanceof Error )
    {
        message = error.message;
        stack = error.stack;
        statusCode = error.statusCode ?? httpStatus.BAD_REQUEST;
    }
    else
    {
        message = "Unknown error";
    }

    const responsePayload: unknown = {
        name: ( error as unknown ).name || "UnknownError",
        message,
        status: statusCode,
        success: false,
    };

    if ( process.env.NODE_ENV === "development" && stack )
    {
        responsePayload.stack = stack;
    }

    res.status( statusCode ).json( responsePayload );
};