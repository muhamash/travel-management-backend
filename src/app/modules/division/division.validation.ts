import z from "zod";

export const zodDivisionSchema = z.object( {
    name: z.string().min( 1, "Name is required" ),
    slug: z.string().min( 1, "Slug is required" ),
    description: z.string().optional(),
    thumbnail: z.string().url( "Thumbnail must be a valid URL" ).optional(),
} );

export const zodUpdateDivisionSchema = z.object( {
    name: z.string().min( 1, "Name is required" ).optional(),
    slug: z.string().min( 1, "Slug is required" ).optional(),
    description: z.string().optional(),
    thumbnail: z.string().url( "Thumbnail must be a valid URL" ).optional(),
} ).refine( ( data ) => data.name || data.slug || data.description || data.thumbnail, {
    message: "At least one field must be provided for update",
} );