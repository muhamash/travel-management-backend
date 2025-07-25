import { model, Schema } from "mongoose";
import { BookingStatus, IBooking } from "./booking.interface";

const bookingSchema = new Schema( {
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    payment: {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: "Payment"
    },
    tour: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Tour"
    },
    guestCount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values( BookingStatus ),
        default: BookingStatus.PENDING
    }
} );

export const Booking = model<IBooking>( "Booking", bookingSchema );