import httpStatus from 'http-status-codes';
import { AppError } from "../../config/errors/App.error";
import { generateSlug } from '../../utils/service.util';
import { Division } from '../division/division.model';
import { IUser, Role } from '../user/user.interface';
import { User } from '../user/user.model';
import { ITour } from './tour.interface';
import { Tour } from './tour.model';
import { TourType } from "./tourType.model";

// Service functions for Tour Types
export const createTourTypeService = async ( name: string ) =>
{
    const newTourType = await TourType.create( { name } );

    return newTourType;
}

export const getAllTourTypesService = async () =>
{
    const tourTypes = await TourType.find().sort( { createdAt: -1 } );

    return tourTypes;
}

export const getTourTypeByIdService = async ( tourTypeId: string ) =>
{
    const tourType = await TourType.findById( tourTypeId );

    return tourType;
}

export const updateTourTypeService = async ( tourTypeId: string, name: string ) =>
{
    const updatedTourType = await TourType.findByIdAndUpdate( tourTypeId, { name }, { new: true, runValidators: true } );

    if ( !updatedTourType )
    {
        throw new AppError( httpStatus.NOT_FOUND, `Tour type with ID ${ tourTypeId } not found` );
    }


    return updatedTourType;
}

// service functions for Tours
export const createTourService = async ( tourData: ITour, user: Partial<IUser> ) =>
{
    const isExistTourType = await TourType.findById( tourData.tourType );
    if ( !isExistTourType )
    {
        throw new AppError( httpStatus.NOT_FOUND, `Tour type data with id: ${ tourData.tourType } is not found at the database!!` );
    }

    const isExistDivision = await Division.findById( tourData.division );
    if ( !isExistDivision )
    {
        throw new AppError( httpStatus.NOT_FOUND, `Tour division with id: ${ tourData.division } is not found at the database!!` );
    }

    const tour = await Tour.create( {
        ...tourData,
        host: user?.userId,
        slug: generateSlug( tourData.title ),
    } );

    if ( !tour )
    {
        throw new AppError( httpStatus.BAD_REQUEST, `Trouble on creating a tour!` );
    }

    return tour;
}

export const getAllTourService = async ( {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
}: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
} ) =>
{
    const skip = (page - 1) * limit;
    const sortOptions: Record<string, number> = {
        [ sortBy ]: sortOrder === "asc" ? 1 : -1,
    };

    const [ tours, total ] = await Promise.all( [
        Tour.find()
            .populate( "division", "name" )
            .populate( "tourType", "name" )
            .populate( "host", "name email" )
            .sort( sortOptions )
            .skip( skip )
            .limit( limit ),
        Tour.countDocuments(),
    ] );

    return {
        meta: {
            total,
            page,
            limit,
            pages: Math.ceil( total / limit ),
        },
        data: tours,
    };
};

// get tour by id
export const getSingleTourService = async ( tourId: string ) =>
{
    const singleTour = await Tour.findById( tourId )
        .populate( "division", "name" )
        .populate( "tourType", "name" )
        .populate( "host", "name email" )
    
    if ( !singleTour )
    {
        throw new AppError(httpStatus.NOT_FOUND, `Tour is not found`)
    }

    // console.log(singleTour)
    return singleTour;
}

// update tour by id
// service
export const updateTourByIdService = async (
    user: Partial<IUser>,
    id: string,
    payload: Partial<ITour>
) =>
{
    const tour = await Tour.findById( id );

    if ( !tour )
    {
        throw new ApiError( httpStatus.NOT_FOUND, "Tour not found" );
    }

    console.log( payload )
    const isAdmin = user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN;
    
    const isHost = tour.host?.toString() === user.userId;

    if ( !isAdmin && !isHost )
    {
        throw new ApiError( httpStatus.FORBIDDEN, "You are not allowed to update this tour" );
    }

    if ( payload.division )
    {
        const divisionExists = await Division.findById( payload.division );
        if ( !divisionExists )
        {
            throw new AppError( httpStatus.NOT_FOUND, "Invalid Division ID" );
        }
    }

    //  Validate tourType if provided
    if ( payload.tourType )
    {
        const tourTypeExists = await TourType.findById( payload.tourType );
        if ( !tourTypeExists )
        {
            throw new AppError( httpStatus.NOT_FOUND, "Invalid TourType ID" );
        }
    }

    if ( payload.host )
    {
        const existHost = await User.findById( payload.host );
        console.log("tour host",existHost)
        if ( !existHost )
        {
            throw new AppError( httpStatus.NOT_FOUND, "Invalid host ID" );
        }
    }

    //  Update the tour
    Object.assign( tour, payload );
    await tour.save();

    return tour;
};

// delete tour by id
export const deleteTourByIdService = async ( tourId: string, user: Partial<IUser> ) =>
{
    const tour = await Tour.findById( tourId );

    if ( !tour )
    {
        throw new AppError( httpStatus.NOT_FOUND, "Tour not found" );
    }
    
    // Check if tour has tourists/bookings
    // if ( tour.tourist && tour.tourist.length > 0 )
    // {
    //     throw new AppError(
    //         httpStatus.CONFLICT,
    //         "Cannot delete tour with active bookings or participants"
    //     );
    // }

    const isAdmin =
        user?.role === Role.ADMIN || user?.role === Role.SUPER_ADMIN;
    const isHost = tour.host?.toString() === user?.userId?.toString();

    if ( !isAdmin && !isHost )
    {
        throw new AppError( httpStatus.FORBIDDEN, "Unauthorized to delete this tour" );
    }

    // Delete the tour
    return await Tour.findByIdAndDelete( tourId );
};