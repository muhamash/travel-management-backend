/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { User } from "./user.model";
import { createUserService } from "./user.service";
// import { UserServices } from "./user.service";

// const createUserFunction = async (req: Response, res: Response) => {

//     const user = await UserServices.createUser(req.body)

//     res.status(httpStatus.CREATED).json({
//         message: "User Created Successfully",
//         user
//     })
// }

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // throw new Error("Fake eror")
        // throw new AppError(httpStatus.BAD_REQUEST, "fake error")

        // createUserFunction(req, res)

        // const { name, email } = req.body;
        // // console.log(name, email)
        // const user = await User.create( { name, email } );

        const user = await createUserService( req.body );

        res.status( httpStatus.CREATED ).json( {
            message: `user created!!`,
            user
        } );

    } catch (error: unknown) {
        console.log( error );
        
        res.status( httpStatus.BAD_REQUEST ).json( {
            message: `Something wrong: ${ error.message }`,
            error
        })
        // next(error)
    }
}