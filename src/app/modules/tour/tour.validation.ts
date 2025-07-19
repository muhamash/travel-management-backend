import z from "zod";

export const tourTypeValidation = z.object( {
    name: z.string().min( 1, "Tour type name is required" ).max( 50, "Tour type name must be less than 50 characters" ),
} );

