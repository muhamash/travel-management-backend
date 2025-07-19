import httpStatus from 'http-status-codes';
import { model, Schema } from "mongoose";
import { AppError } from "../../config/errors/App.error";
import { ITourType } from "./tour.interface";
import { Tour } from './tour.model';


const tourTypeSchema = new Schema<ITourType>( {
    name: { type: String, required: true, unique: true }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
} );

// Prevent deletion if linked to tours
tourTypeSchema.pre( "findOneAndDelete", async function ( next )
{
    const docToDelete = await this.model.findOne( this.getFilter() );

    if ( !docToDelete ) return next();

    const tourCount = await Tour.countDocuments( { tourType: docToDelete._id } );

    if ( tourCount > 0 )
    {
        return next(
            new AppError(httpStatus.CONFLICT,
                `Cannot delete tour type "${ docToDelete.name }" because it is referenced by ${ tourCount } tour(s).`
            )
        );
    }

    next();
} );

export const TourType = model<ITourType>( "TourType", tourTypeSchema );