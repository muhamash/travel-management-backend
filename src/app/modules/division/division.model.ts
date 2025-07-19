import httpStatus from 'http-status-codes';
import { model, Schema } from "mongoose";
import { AppError } from "../../config/errors/App.error";
import { Tour } from "../tour/tour.model";
import { IDivision } from "./division.interface";

const divisionSchema = new Schema<IDivision>( {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    thumbnail: { type: String }
},
    {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    }
);

divisionSchema.pre( "findOneAndDelete", async function ( next )
{
    const docToDelete = await this.model.findOne( this.getFilter() );

    if ( !docToDelete ) return next();

    const linkedTours = await Tour.countDocuments( { division: docToDelete._id } );

    if ( linkedTours > 0 )
    {
        return next(
            new AppError(httpStatus.CONFLICT,
                `Cannot delete division "${ docToDelete.name }" because it's associated with ${ linkedTours } tour(s).`
            )
        );
    }

    next();
} );

export const Division = model<IDivision>( "Division", divisionSchema );