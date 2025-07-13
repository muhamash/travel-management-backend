/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { AppError } from '../config/errors/App.error';

export const globalErrorResponse = ( error: unknown, req: Request, res: Response, next: NextFunction ) =>
{
    if ( error )
    {
        let statusCode = httpStatus.BAD_REQUEST;
        let message = `Operation gone wrong`;
        let stack;

        // console.log(error )
        if ( error instanceof AppError )
        {
            statusCode = error.statusCode;
            message = error.message;
            stack = error.stack;

            res.status( httpStatus.BAD_REQUEST ).json( {
                name: error.name || "UnknownError",
                message,
                status: statusCode,
                success: false,
                ...( error as unknown ),
                ...(process.env.NODE_ENV === "development" && { stack })
            } )
        }
        else if ( error instanceof Error )
        {
            statusCode = error.statusCode;
            message = error.message;
            stack = error.stack;

            res.status( httpStatus.BAD_REQUEST ).json( {
                name: error.name || "UnknownError",
                message,
                status: statusCode,
                success: false,
                ...( error as unknown ),
                ...(process.env.NODE_ENV === "development" && { stack })
            } )
        }
        else
        {
            res.status( httpStatus.BAD_REQUEST ).json( {
                name: error.name || "UnknownError",
                message,
                status: statusCode,
                success: false,
                ...( error as unknown ),
                ...(process.env.NODE_ENV === "development" && { stack })
            } )
        }
    }
};