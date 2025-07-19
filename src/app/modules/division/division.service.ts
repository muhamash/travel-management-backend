import { IDivision } from "./division.interface";
import { Division } from "./division.model";

export const createDivisionService = async ( divisionData: IDivision ) =>
{
    const newDivision = await Division.create( divisionData );

    return newDivision;
}

export const getAllDivisionsService = async () =>
{
    const divisions = await Division.find();

    return divisions;
}