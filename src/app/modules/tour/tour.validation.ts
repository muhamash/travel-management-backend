import z from "zod";

export const tourTypeValidation = z.object( {
    name: z.string().min( 1, "Tour type name is required" ).max( 50, "Tour type name must be less than 50 characters" ),
} );

const objectId = z
    .string( { required_error: "ID is required" } )
    .regex( /^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId" ).optional();

export const tourValidation = z.object( {
    title: z
        .string()
        .min( 1, "Tour title is required" )
        .max( 100, "Tour title must be less than 100 characters" ),

    description: z.string().optional(),
    images: z.array( z.string().url( "Must be a valid image URL" ) ).optional(),
    location: z.string().optional(),

    costFrom: z
        .number( { invalid_type_error: "Cost must be a number" } )
        .positive( "Cost must be a positive number" )
        .optional(),

    startDate: z
        .string()
        .refine(
            ( val ) => !isNaN( Date.parse( val ) ),
            "Start date must be a valid date string"
        )
        .optional(),

    endDate: z
        .string()
        .refine(
            ( val ) => !isNaN( Date.parse( val ) ),
            "End date must be a valid date string"
        )
        .optional(),

    included: z.array( z.string() ).optional(),
    excluded: z.array( z.string() ).optional(),
    amenities: z.array( z.string() ).optional(),
    tourPlan: z.array( z.string() ).optional(),

    maxGuest: z.number().int().positive().optional(),
    minAge: z.number().int().positive().optional(),

    tourType: objectId,
    division: objectId,
} );

export const updateTourValidation = z.object( {
    title: z
        .string()
        .min( 1, "Tour title is required" )
        .max( 100, "Tour title must be less than 100 characters" ).optional(),

    description: z.string().optional(),
    images: z.array( z.string().url( "Must be a valid image URL" ) ).optional(),
    location: z.string().optional(),

    costFrom: z
        .number( { invalid_type_error: "Cost must be a number" } )
        .positive( "Cost must be a positive number" )
        .optional(),

    startDate: z
        .string()
        .refine(
            ( val ) => !isNaN( Date.parse( val ) ),
            "Start date must be a valid date string"
        )
        .optional(),

    endDate: z
        .string()
        .refine(
            ( val ) => !isNaN( Date.parse( val ) ),
            "End date must be a valid date string"
        )
        .optional(),

    included: z.array( z.string() ).optional(),
    excluded: z.array( z.string() ).optional(),
    amenities: z.array( z.string() ).optional(),
    tourPlan: z.array( z.string() ).optional(),
    host: objectId,
    tourType: objectId,
    division: objectId,
    maxGuest: z.number().int().positive().optional(),
    minAge: z.number().int().positive().optional(),
} ).refine(
    ( data ) => Object.keys( data ).some( ( key ) => data[ key as keyof typeof data ] !== undefined ),
    {
        message: "At least one field must be provided for update",
    }
);