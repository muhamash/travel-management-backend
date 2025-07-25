import { model, Schema } from "mongoose";
import { IPayment, PaymentStatus } from "./payment.interface";


const paymentSchema = new Schema( {
    booking: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "Booking",
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: Object.values( PaymentStatus ),
        default: PaymentStatus.UNPAID
    },
    invoiceUrl: {
        type: String,
    },
    amount: {
        type: Number
    }
} );

export const Payment = model<IPayment>( "Payment", paymentSchema );