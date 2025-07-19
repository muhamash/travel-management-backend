/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { responseFunction } from "../../utils/controller.util";
import { asyncHandler } from "../../utils/service.util";
import { createDivisionService, getAllDivisionsService } from "./division.service";

export const createDivision = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{

    const divisionData = req.body;
    if ( !divisionData.name || !divisionData.slug )
    {
        responseFunction( res, {
            message: `Name and slug are required`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }

    const newDivision = await createDivisionService( divisionData );
    if ( !newDivision )
    {
        responseFunction( res, {
            message: `Something went wrong when creating the division`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }

    responseFunction( res, {
        message: `Division created successfully`,
        statusCode: httpStatus.CREATED,
        data: newDivision,
    } );
} );

export const getAllDivisions = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    // Assuming a service exists to fetch all divisions
    const divisions = await getAllDivisionsService();

    if ( !divisions )
    {
        responseFunction( res, {
            message: `Something went wrong when fetching the divisions`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }

    if ( divisions.length === 0 )
    {
        responseFunction( res, {
            message: `No divisions found`,
            statusCode: httpStatus.ACCEPTED,
            data: [],
        } );

        return;
    }

    responseFunction( res, {
        message: `Divisions fetched successfully`,
        statusCode: httpStatus.OK,
        meta: divisions.length ,
        data: divisions,
    } );
} );