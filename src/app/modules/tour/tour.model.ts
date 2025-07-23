import { NextFunction } from "express";
import { model, Schema } from "mongoose";
import { generateSlug } from "../../utils/service.util";
import { ITour } from "./tour.interface";

const tourSchema = new Schema<ITour>( {
    title: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    description: { type: String },
    images: { type: [ String ], default: [] },
    location: { type: String },
    departureLocation: { type: String },
    arrivalLocation: { type: String },
    costFrom: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    included: { type: [ String ], default: [] },
    excluded: { type: [ String ], default: [] },
    amenities: { type: [ String ], default: [] },
    tourPlan: { type: [ String ], default: [] },
    maxGuest: { type: Number },
    minAge: { type: Number },
    tourist: [ {
        type: Schema.Types.ObjectId,
        ref: "User"
    } ],
    host: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    division: {
        type: Schema.Types.ObjectId,
        ref: "Division",
        required: true
    },
    tourType: {
        type: Schema.Types.ObjectId,
        ref: "TourType",
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
} );

tourSchema.pre( "findOneAndDelete", async function ( next )
{
    const tour = await this.model.findOne( this.getFilter() );

    if ( tour?.tourist?.length )
    {
        return next( new Error( "Cannot delete tour with active bookings or participants" ) );
    }

    next();
} );

tourSchema.pre( "save", function ( next: NextFunction )
{
    console.log("Triggering auto generated slug before save")
    if ( this.isModified( "title" ) || !this.slug )
    {
        this.slug = generateSlug( this.title );
    }
    next();
} );

export const Tour = model<ITour>("Tour", tourSchema)