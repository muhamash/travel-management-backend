import { Application, NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes';

export const homeController = async ( req: Response, res: Request, next: NextFunction ) =>
{
    try
    {   
        res.status( httpStatus.OK ).json( {
            success: true,
            status: httpStatus.OK,
            message: "App is in service!"
        } );
    }
    catch ( error: unknown )
    {
        next( error )
    }
};