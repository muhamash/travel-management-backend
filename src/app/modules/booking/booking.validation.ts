import z from "zod";
import { objectId } from "../tour/tour.validation";

export const bookingValidation = z.object( {
    tour: objectId,
    guestCount: z.number( {
        invalid_type_error: "Guest count must be a number"
    } ).refine( ( val ) => val >= 1 && val <= 20, {
        message: "Guest count must be between 1 and 20"
    } ),

} );