/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { AppError } from "../config/errors/App.error";
import { isZodError, parseZodError } from "../utils/middleware.util";
import { ErrorResponsePayload } from "../utils/utils.type";

export const globalErrorResponse = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) =>
{
    let statusCode = httpStatus.BAD_REQUEST;
    let message = "Something went wrong";
    let stack: string | undefined;

    //  Zod errors with fields
    if ( isZodError( error ) )
    {
        const fieldIssues = parseZodError( error );

        // console.log(error.issues)

        message = fieldIssues.length
            ? `Validation error on field '${ fieldIssues[ 0 ].field }': ${ fieldIssues[ 0 ].message }`
            : error?.issues[0]?.message || "Validation error!!!";

        const responsePayload = {
            name: error.name || "ZodError",
            message,
            status: httpStatus.BAD_REQUEST,
            success: false,
            errors: fieldIssues,
            ...( process.env.NODE_ENV === "development" && { stack: error.stack } ),
        };

        return res.status( httpStatus.BAD_REQUEST ).json( responsePayload );
    }

    //  custom AppError
    if ( error instanceof AppError )
    {
        statusCode = error.statusCode;
        message = error.message;
        stack = error.stack;
    }
    //  general Error
    else if ( error instanceof Error )
    {
        message = error.message;
        stack = error.stack;
        // fallback if no custom statusCode
        statusCode = ( error as unknown ).statusCode ?? httpStatus.BAD_REQUEST;
    }
    // unknown error fallback
    else
    {
        message = "unknownn error";
    }

    // error response payload
    const responsePayload: ErrorResponsePayload = {
        name: ( error as unknown ).name || "unknownError",
        message,
        status: statusCode,
        success: false,
    };

    if ( process.env.NODE_ENV === "development" && stack )
    {
        responsePayload.stack = stack;
    }

    return res.status( statusCode ).json( responsePayload );
};