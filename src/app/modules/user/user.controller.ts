/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { asyncHandler } from "../../utils/controller.util";
import { createUserService, getAllUsersService } from "./user.service";

export const createUser = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    const user = await createUserService( req.body );

    if ( !user )
    {
        res.status( httpStatus.EXPECTATION_FAILED ).json( {
            message: `Something went wrong when creating the user`,
            status: httpStatus.EXPECTATION_FAILED,
            user: null,
        } );
        return;
    }

    res.status( httpStatus.CREATED ).json( {
        message: `User created!!`,
        status: httpStatus.CREATED,
        user,
    } );
} );

export const getAllUsers = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    const users = await getAllUsersService();

    if ( !users )
    {
        res.status( httpStatus.EXPECTATION_FAILED ).json( {
            message: `Something went wrong when fetching the users`,
            status: httpStatus.EXPECTATION_FAILED,
            users: null,
        } );
        return;
    }

    if ( users.length === 0 )
    {
        res.status( httpStatus.ACCEPTED ).json( {
            message: `Empty Database!!`,
            status: httpStatus.ACCEPTED,
            users: null,
        } );
        return;
    }

    res.status( httpStatus.OK ).json( {
        message: "Users retrieved successfully",
        status: httpStatus.OK,
        users,
        total: users.length,
    } );
} );