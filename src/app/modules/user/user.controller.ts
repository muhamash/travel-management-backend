/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { responseFunction } from "../../utils/controller.util";
import { asyncHandler } from "../../utils/service.util";
import { createUserService, getAllUsersService, updatedUserService } from "./user.service";

export const createUser = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    // console.log(req.body)
    const user = await createUserService( req.body );

    if ( !user )
    {
        responseFunction( res, {
            message: `Something went wrong when creating the user`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }
    if ( user )
    {
        responseFunction( res, {
            message: `User created!!`,
            statusCode: httpStatus.CREATED,
            data: user,
        } );
    }
    else
    {
        next()
    }
} );

export const getAllUsers = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    const users = await getAllUsersService();

    if ( !users )
    {

        responseFunction( res, {
            message: `Something went wrong when fetching the users`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }

    if ( users.length === 0 )
    {
        responseFunction( res, {
            message: `Empty Database!!`,
            statusCode: httpStatus.ACCEPTED,
            data: null,
        });

        return;
    }

    responseFunction( res, {
        message: "Users retrieved successfully",
        statusCode: httpStatus.OK,
        data: users,
        meta: users.length,
    } );
} );

export const updateUser = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    // console.log(req.params.id)
    // const targetUser = req?.targetUser;
    // console.log( targetUser );

    const user = await updatedUserService( req.params.id, req.body );

    if ( !user )
    {
        responseFunction( res, {
            message: `Something went wrong when updating the user`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }
    if ( user )
    {
        responseFunction( res, {
            message: `User updated!!`,
            statusCode: httpStatus.ACCEPTED,
            data: user,
        } );
    }
    else
    {
        next()
    }
} );