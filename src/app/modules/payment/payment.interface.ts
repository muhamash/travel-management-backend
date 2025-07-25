import { Types } from "mongoose";

export enum PaymentStatus{
    PAID = "PAID",
    UNPAID = "UNPAID",
    FAILED = "FAILED",
    REFUND = "REFUND",
    CANCELED = "CANCELED"
}

export interface IPayment
{
    booking: Types.ObjectId;
    transactionId: string;
    amount: number;
    paymentGatewayData?: unknown;
    invoiceUrl?: string;
    status?: PaymentStatus;
}