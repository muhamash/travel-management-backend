/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { AppError } from "../../config/errors/App.error";
import { responseFunction, setCookie } from "../../utils/controller.util";
import { asyncHandler } from "../../utils/service.util";
import { credentialLoginService, getNewTokenService, resetPasswordService } from './auth.service';


export const authLogin = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    // console.log(req.body)
    const loginData = await credentialLoginService( req.body );

    if ( !loginData )
    {
        responseFunction( res, {
            message: `Something went wrong when searching the user`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }
    if ( loginData )
    {

        try
        {
            await setCookie( res, "refreshToken", loginData.refreshToken, 240 * 60 * 60 * 1000 );

            await setCookie( res, "accessToken", loginData.accessToken, 100 * 60 * 1000 );
        }
        catch ( error: unknown )
        {
            next(error)
        }

        responseFunction( res, {
            message: `User found!!`,
            statusCode: httpStatus.ACCEPTED,
            data: loginData,
        } );
    }
    else
    {
        next()
    }
} );

export const getNewAccessToken = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    const refreshToken = req.cookies.refreshToken

    // console.log(req.user)

    if ( !refreshToken)
    {
        throw new AppError(httpStatus.BAD_REQUEST, "Cookies or user not found!!")
    }

    // console.log( refreshToken, user );

    const tokenInfo = await getNewTokenService( refreshToken );

    if ( !tokenInfo )
    {
        responseFunction( res, {
            message: `Something went wrong when searching the user`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }

    if ( tokenInfo )
    {
        try {

            await setCookie( res, "accessToken", tokenInfo.accessToken, 100 * 60 * 1000 );
            
            await setCookie( res, "refreshToken", tokenInfo.refreshToken, 240 * 60 * 60 * 1000 );
        }
        catch ( error: unknown )
        {
            next(error)
        }

        responseFunction( res, {
            message: `New tokens!!`,
            statusCode: httpStatus.CREATED,
            data: tokenInfo,
        } );
    }
    else
    {
        next()
    }
} );

export const logout = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    try
    {
        res.clearCookie( "accessToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        } );
    
        res.clearCookie( "refreshToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        } );
    
        responseFunction( res, {
            message: "Logged out!!",
            statusCode: httpStatus.OK,
            data: null
        } )
    }
    catch ( error: unknown )
    {
        next( error )
    }
} );

export const resetPassword = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const decodedToken = req.user

    await resetPasswordService( oldPassword, newPassword, decodedToken );

    responseFunction( res, {
        message: "Password changed!",
        statusCode: httpStatus.OK,
        data: null
    } )
} );