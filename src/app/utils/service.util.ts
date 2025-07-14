import { NextFunction, Request, Response } from "express";
import { AsyncHandlerType } from "./utils.type";

export const asyncHandler = ( fn: AsyncHandlerType ) => ( req: Request, res: Response, next: NextFunction ) =>
{
    Promise.resolve( fn( req, res, next ) ).catch( ( error: unknown ) =>
    {
        console.log( error );

        next(error)
    });
};
