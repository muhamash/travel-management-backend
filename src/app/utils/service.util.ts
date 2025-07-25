import { NextFunction, Request, Response } from "express";
import slugify from "slugify";
import { envStrings } from "../config/env.config";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./middleware.util";
import { AsyncHandlerType } from "./utils.type";

export const asyncHandler = ( fn: AsyncHandlerType ) => ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    Promise.resolve( fn( req, res, next ) ).catch( ( error: unknown ) =>
    {
        console.log( error );

        next(error)
    });
};

export const userTokens = async ( user: Partial<IUser>, next: NextFunction ) =>
{
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
        name: user.name
    };

    // console.log(jwtPayload, user)

    try
    {
        const accessToken =  generateToken( jwtPayload, envStrings.ACCESS_TOKEN_SECRET as string, {
            expiresIn: envStrings.ACCESS_TOKEN_EXPIRE
        } );

        const refreshToken = generateToken( jwtPayload, envStrings.REFRESH_TOKEN_SECRET as string, {
            expiresIn: envStrings.REFRESH_TOKEN_EXPIRE
        } );

        return {
            accessToken,
            refreshToken
        }
    }
    catch ( error: unknown )
    {
        next( error )
    }
};

export const generateSlug = ( title: string ) =>
{
    return slugify( title, { lower: true, strict: true } );
};

export const createTransactionId = () =>
{
    return `transaction${ Date.now() }_${ Math.floor( Math.random() * 10000 ) }`;
}