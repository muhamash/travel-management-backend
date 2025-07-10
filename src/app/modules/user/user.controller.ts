/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";

const createUserFunction = async (req: Response, res: Response) => {

    const user = await UserServices.createUser(req.body)

    res.status(httpStatus.CREATED).json({
        message: "User Created Successfully",
        user
    })
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // throw new Error("Fake eror")
        // throw new AppError(httpStatus.BAD_REQUEST, "fake error")

        // createUserFunction(req, res)

    } catch (error: unknown) {
        console.log( error );
        
        res.status( httpStatus.BAD_REQUEST ).json( {
            message: `Something wrong: ${ error.message }`,
            error
        })
        // next(error)
    }
}