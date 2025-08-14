import { Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { responseFunction } from "../../utils/controller.util";
import { asyncHandler } from "../../utils/service.util";
import { sendOTpService } from "./otp.service";

export const sendOtp = asyncHandler( async ( req: Request, res: Response ) =>
{
    const email = req.body.email;
    console.log( "otp send", email );

    const otpSender = await sendOTpService( email, "defaultName" );

    console.log(otpSender)

    responseFunction( res, {
        message: "Otp sent to your mail!",
        statusCode: httpStatus.OK,
        data: null
    })
} );



