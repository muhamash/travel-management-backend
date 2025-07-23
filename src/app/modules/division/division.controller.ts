/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { responseFunction } from "../../utils/controller.util";
import { asyncHandler } from "../../utils/service.util";
import { createDivisionService, deleteDivisionService, getAllDivisionsService, getDivisionByIdService, updateDivisionService } from "./division.service";

export const createDivision = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{

    const divisionData = req.body;
    // console.log(divisionData)
    if ( !divisionData.name )
    {
        responseFunction( res, {
            message: `Name is required`,
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

export const getDivisionById = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    const divisionId = req.params.id;

    if ( !divisionId )
    {
        responseFunction( res, {
            message: `Division ID is required`,
            statusCode: httpStatus.BAD_REQUEST,
            data: null,
        } );

        return;
    }

    const division = await getDivisionByIdService( divisionId );
    if ( !division )
    {
        responseFunction( res, {
            message: `Division not found`,
            statusCode: httpStatus.NOT_FOUND,
            data: null,
        } );

        return;
    }

    responseFunction( res, {
        message: `Division fetched successfully`,
        statusCode: httpStatus.OK,
        data: division,
    } );
} );

export const updateDivision = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    const divisionId = req.params.id;
    const updateData = req.body;

    if ( !divisionId )
    {
        responseFunction( res, {
            message: `Division ID is required`,
            statusCode: httpStatus.BAD_REQUEST,
            data: null,
        } );

        return;
    }

    if ( !updateData.name )
    {
        responseFunction( res, {
            message: `Name is required for update`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }

    const updatedDivision = await updateDivisionService( divisionId, updateData );
    
    if ( !updatedDivision )
    {
        responseFunction( res, {
            message: `Something went wrong when updating the division`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }

    responseFunction( res, {
        message: `Division updated successfully`,
        statusCode: httpStatus.OK,
        data: updatedDivision,
    } );
} );

export const deleteDivision = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    const divisionId = req.params.id;

    if ( !divisionId )
    {
        responseFunction( res, {
            message: `Division ID is required`,
            statusCode: httpStatus.BAD_REQUEST,
            data: null,
        } );

        return;
    }

    const deletedDivision = await deleteDivisionService( divisionId );

    if ( !deletedDivision )
    {
        responseFunction( res, {
            message: `Division not found`,
            statusCode: httpStatus.NOT_FOUND,
            data: null,
        } );

        return;
    }

    responseFunction( res, {
        message: `Division deleted successfully`,
        statusCode: httpStatus.OK,
        data: deletedDivision,
    } );
} );