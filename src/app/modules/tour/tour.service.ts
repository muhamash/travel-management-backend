import { TourType } from "./tour.model";

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


    return updatedTourType;
}
