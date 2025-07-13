import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes';

export const globalNotFoundResponse = async ( req: Response, res: Request, next: NextFunction ) =>
{
    try
    {
        res.status( httpStatus.NOT_FOUND ).json( {
            success: false,
            status: httpStatus.NOT_FOUND,
            message: "Route not found!"
        } );
    }
    catch ( error: unknown )
    {
        next( error )
    }
};