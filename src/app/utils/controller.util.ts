import { NextFunction, Response } from "express";
import { AsyncHandler } from "../modules/user/user.interface";

export const asyncHandler = ( fn: AsyncHandler ) => ( req: Response, res: Response, next: NextFunction ) =>
{
    Promise.resolve( fn( req, res, next ) ).catch( ( error: unknown ) =>
    {
        console.log( error );

        next(error)
    });
};