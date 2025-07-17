import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { JwtPayload } from "jsonwebtoken";
import { envStrings } from "../config/env.config";
import { AppError } from "../config/errors/App.error";
import { IsActive } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
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

        const user = await User.findOne( { email: verifiedToken.email } );

        console.log("verified token user", verifiedToken );

        if ( !user )
        {
            throw new AppError( httpStatus.NOT_FOUND, `User not found` )
        }

        if ( user?.isDeleted || user?.isActive !== IsActive.ACTIVE )
        {
            throw new AppError( httpStatus.CONFLICT, `User is is restricted from the check auth middleware!!` );
        }

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