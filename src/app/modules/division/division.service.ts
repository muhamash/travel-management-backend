import httpStatus from 'http-status-codes';
import { AppError } from "../../config/errors/App.error";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

export const createDivisionService = async ( divisionData: IDivision ) =>
{
    const newDivision = await Division.create( {
        ...divisionData,
        // slug: generateSlug(divisionData.name)
    } );

    console.log(divisionData)

    return newDivision;
}

export const getAllDivisionsService = async () =>
{
    const divisions = await Division.find();

    return divisions;
}

export const getDivisionByIdService = async ( slug: string ) =>
{
    const division = await Division.find( { slug } ); 
    if ( !division )
    {
        return null;
    }

    return division;
}

export const updateDivisionService = async ( divisionId: string, payload: Partial<IDivision> ) =>
{
    const division = await Division.findById( divisionId );
    if ( !division )
    {
        throw new AppError(httpStatus.NOT_FOUND, `Division with ID ${ divisionId } not found` );
    }

    const updatedDivision = await Division.findByIdAndUpdate( divisionId, {
        ...payload
        // slug: generateSlug( payload.name )
    }, { new: true, runValidators: true } );

    // division.save();
    return updatedDivision;
}

export const deleteDivisionService = async ( divisionId: string ) =>
{
    const deletedDivision = await Division.findByIdAndDelete( divisionId );

    if ( !deletedDivision )
    {
        throw new AppError(httpStatus.NOT_FOUND, `Division with ID ${ divisionId } not found` );
    }

    return deletedDivision;
}