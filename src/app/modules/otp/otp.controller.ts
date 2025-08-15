import { Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { AppError } from "../../config/errors/App.error";
import { responseFunction } from "../../utils/controller.util";
import { asyncHandler } from "../../utils/service.util";
import { sendOTpService, verifyOTPService } from './otp.service';

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


export const verifyOTP = asyncHandler( async ( res: Response, req: Request ) =>
{
    const body = req.body;

    if( !body.email && !body.otp ){
        throw new AppError(httpStatus.CONFLICT, "email and otp both are required!")
    }

    const verify = await verifyOTPService( body.email, body.otp );

    console.log( verify )
    
    responseFunction( res, {
        message: "otp verified!",
        statusCode: httpStatus.ACCEPTED,
        data: null
    })
    
} );