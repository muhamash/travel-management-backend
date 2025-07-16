import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { responseFunction } from "../../utils/response.util";
import { asyncHandler } from "../../utils/service.util";
import { credentialLoginService } from "./auth.service";


export const authLogin = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    // console.log(req.body)
    const user = await credentialLoginService( req.body );

    if ( !user )
    {
        responseFunction( res, {
            message: `Something went wrong when searching the user`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }
    if ( user )
    {
        responseFunction( res, {
            message: `User found!!`,
            statusCode: httpStatus.ACCEPTED,
            data: user,
        } );
    }
    else
    {
        next()
    }
} );