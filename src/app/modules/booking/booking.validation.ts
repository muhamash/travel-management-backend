import z from "zod";
import { objectId } from "../tour/tour.validation";


export const bookingValidation = z.object( {
    user: objectId,
    payment: objectId,
    tour: objectId,
    guestCount: z.number( { invalid_type_error: "Guest count must be a number" } ),
})