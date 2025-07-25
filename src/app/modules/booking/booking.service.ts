import httpStatus from 'http-status-codes';
import { AppError } from '../../config/errors/App.error';
import { createTransactionId } from '../../utils/service.util';
import { PaymentStatus } from '../payment/payment.interface';
import { Payment } from '../payment/payment.model';
import { Tour } from '../tour/tour.model';
import { User } from '../user/user.model';
import { BookingStatus, IBooking } from './booking.interface';
import { Booking } from './booking.model';

export const createBookingService = async ( payload: Partial<IBooking>, userId: string ) =>
{
    // transaction roll back!!
    const session = await Booking.startSession();
    await session.startTransaction();

    const user = await User.findById( userId ).session( session );

    // console.log(user)

    if ( !user?.phone || !user.address )
    {
        throw new AppError( httpStatus.BAD_REQUEST, "Please update user information!!!" )
    }

    const tour = await Tour.findById( payload.tour ).select( "costFrom" ).session( session );

    if ( !tour?.costFrom )
    {
        throw new AppError( httpStatus.CONFLICT, "Tour cost not found!" )
    }

    const totalCost = Number( tour.costFrom ) * Number( payload.guestCount )

    const booking = await Booking.create( [ { ...payload, user: userId, status: BookingStatus.PENDING } ], { session } );
    // console.log( booking )
    
    const createdBooking = booking[ 0 ];

    if ( createdBooking )
    {
        // console.log(createdBooking)
        const paymentOka = await Payment.create( [ {
            booking: createdBooking._id,
            status: PaymentStatus.PAID,
            transactionId: createTransactionId(),
            amount: totalCost
        } ], { session } );

        // console.log(paymentOka[0]._id)

        if ( paymentOka )
        {
            // throw Error()
            const updateBooking = await Booking.findByIdAndUpdate( createdBooking?._id, { payment: paymentOka[ 0 ]._id, status: BookingStatus.COMPLETE }, { new: true, runValidators: true, session } ).populate( "user", "name email phone address" ).populate( "tour", "title costFrom location" ).populate( "payment", "amount status" );

            console.log( updateBooking )

            if ( updateBooking )
            {
                await session.commitTransaction();
                session.endSession();
                
                return updateBooking;
            }
            else
            {
                await session.abortTransaction();
                session.endSession();
                throw new AppError( httpStatus.EXPECTATION_FAILED, "Could not update booking with payment" );
            }


            return updateBooking
        }
        else
        {
            await session.abortTransaction();
            session.endSession();

            
            throw new AppError( httpStatus.BAD_GATEWAY`Payment failed` )
        }
    }
    else
    {
        await session.abortTransaction();
        session.endSession();

        
        throw new AppError( httpStatus.BAD_REQUEST, `Booking failed` )
    }
};