import { Types } from "mongoose";

export enum BookingStatus
{
    COMPLETE = "COMPLETE",
    FAILED = "FAILED",
    CANCEL = "CANCEL",
    PENDING = "PENDING"
}

export interface IBooking
{
    user: Types.ObjectId;
    payment?: Types.ObjectId;
    tour: Types.ObjectId;
    guestCount: number;
    status: BookingStatus;
}