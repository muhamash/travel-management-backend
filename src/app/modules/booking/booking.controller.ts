/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { AppError } from "../../config/errors/App.error";
import { responseFunction } from "../../utils/controller.util";
import { asyncHandler } from "../../utils/service.util";
import { createBookingService } from "./booking.service";


export const createBooking = asyncHandler( async ( req: Request, res: Response, next: NextFunction ) =>
{
    const userId = req.user?.userId;
    const booking = await createBookingService( req.body, userId );

    if ( !booking )
    {
        throw new AppError( httpStatus.BAD_REQUEST, "Can not booking the target!!" )
    }

    responseFunction( res, {
        statusCode: httpStatus.CREATED,
        message: "Successfully booked the target",
        data: booking
    } )

    // next()
} );