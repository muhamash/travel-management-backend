import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { envStrings } from "../config/env.config";
import { AppError } from "../config/errors/App.error";
import { verifyToken } from "../utils/middleware.util";

export const checkAuth = ( ...authRoles: string[] ) => async ( req: Request, res: Response, next: NextFunction ) =>
{
    try
    {
        const accessToken = req.cookies.accessToken;
        // console.log(accessToken)

        if ( !accessToken )
        {
            throw new AppError( 403, "No Token Received!" )
        }

        const verifiedToken = verifyToken( accessToken, envStrings.ACCESS_TOKEN_SECRET ) as JwtPayload;

        // console.log( verifiedToken );

        if ( !authRoles.includes( verifiedToken.role ) )
        {
            throw new AppError( 403, `You are not permitted to view this route!!! because you are ${verifiedToken.role}; expected ADMIN or SUPER_ADMIN` )
        }
        
        req.user = verifiedToken
        next()

    }
    catch ( error: unknown )
    {
        console.log( "jwt error", error );
        next( error )
    }
};