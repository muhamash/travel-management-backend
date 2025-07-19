import z from "zod";

export const zodDivisionSchema = z.object( {
    name: z.string().min( 1, "Name is required" ),
    slug: z.string().min( 1, "Slug is required" ),
    description: z.string().optional(),
    thumbnail: z.string().url( "Thumbnail must be a valid URL" ).optional(),
} );