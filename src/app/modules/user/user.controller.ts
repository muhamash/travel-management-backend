/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { asyncHandler } from "../../utils/controller.util";
import { IUser } from "./user.interface";
import { createUserService, getAllUsersService } from "./user.service";


// export const createUser = async (req: Request, res: Response, next: NextFunction) : void => {
//     try {
//         // throw new Error("Fake eror")
//         // throw new AppError(httpStatus.BAD_REQUEST, "fake error")

//         // createUserFunction(req, res)

//         // const { name, email } = req.body;
//         // // console.log(name, email)
//         // const user = await User.create( { name, email } );

//         const user = await createUserService( req.body );

//         if ( !user )
//             {
//                 res.status( httpStatus.EXPECTATION_FAILED ).json( {
//                     message: `Something went wrong when creating the user`,
//                     status: httpStatus.EXPECTATION_FAILED,
//                     user: null
//                 } );
    
//                 return;
//             }

//         res.status( httpStatus.CREATED ).json( {
//             message: `user created!!`,
//             status : httpStatus.CREATED,
//             user
//         } );

//     } catch (error: unknown) {
//         // console.log( error );
        
//         // res.status( httpStatus.BAD_REQUEST ).json( {
//         //     message: `Something wrong: ${ error.message }`,
//         //     error
//         // })
//         next(error)
//     }
// }

export const createUser = asyncHandler( ( req: Response, res: Response, next: NextFunction ) =>
{
    const user = createUserService( req.body );
    console.log(user)

    if ( !user )
    {
        res.status( httpStatus.EXPECTATION_FAILED ).json( {
            message: `Something went wrong when creating the user`,
            status: httpStatus.EXPECTATION_FAILED,
            user: null
        } );
    
        return;
    }

    res.status( httpStatus.CREATED ).json( {
        message: `user created!!`,
        status: httpStatus.CREATED,
        user
    } );

} );

export const getAllUsers = async ( req: Request, res: Response, next: NextFunction ): IUser[] =>
{
    try
    {
        const users = await getAllUsersService();

        if ( !users )
        {
            res.status( httpStatus.EXPECTATION_FAILED ).json( {
                message: `Something went wrong when fetching the users`,
                status: httpStatus.EXPECTATION_FAILED,
                users: null
            } );

            return;
        }
        else if ( users.length === 0 )
        {
            res.status( httpStatus.ACCEPTED ).json( {
                message: `Empty Database!!`,
                status: httpStatus.ACCEPTED,
                users: null
            } );
    
            return;
        }
        else
        {
            res.status( httpStatus.OK ).json( {
                message: "users retrieved successfully",
                status: httpStatus.OK,
                users: users,
                total: users.length
            })
        }

        
    }
    catch ( error: unknown )
    {
        next( error )
    }
};