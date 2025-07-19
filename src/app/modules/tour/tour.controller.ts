/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { responseFunction } from "../../utils/controller.util";
import { asyncHandler } from "../../utils/service.util";
import { createTourTypeService, getAllTourTypesService, getTourTypeByIdService, updateTourTypeService } from "./tour.service";

export const createTourType = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{

    const { name } = req.body;

    if ( !name )
    {
        responseFunction( res, {
            message: `Tour type name is required`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }

    const newTourType = await createTourTypeService( name );

    if ( !newTourType )
    {
        responseFunction( res, {
            message: `Something went wrong when creating the tour type`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }

    responseFunction( res, {
        message: `Tour type created successfully`,
        statusCode: httpStatus.CREATED,
        data: newTourType,
    } );
    
} );

export const getAllTourTypes = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    const tourTypes = await getAllTourTypesService();
    if ( !tourTypes )
    {
        responseFunction( res, {
            message: `Something went wrong when fetching the tour types`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }

    if ( tourTypes.length === 0 )
    {
        responseFunction( res, {
            message: `No tour types found`,
            statusCode: httpStatus.ACCEPTED,
            data: null,
        } );

        return;
    }

    responseFunction( res, {
        message: "Tour types retrieved successfully",
        statusCode: httpStatus.OK,
        data: tourTypes,
        meta: tourTypes.length,
    } );
} );

export const getTourById = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    const { id } = req.params;

    if ( !id )
    {
        responseFunction( res, {
            message: `Tour type ID is required`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }

    const tourType = await getTourTypeByIdService( id );

    if ( !tourType )
    {
        responseFunction( res, {
            message: `Tour type not found`,
            statusCode: httpStatus.NOT_FOUND,
            data: null,
        } );

        return;
    }

    responseFunction( res, {
        message: "Tour type retrieved successfully",
        statusCode: httpStatus.OK,
        data: tourType,
    } );
} );

export const updateTourType = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    const { id } = req.params;
    const { name } = req.body;

    if ( !id || !name )
    {
        responseFunction( res, {
            message: `Tour type ID and name are required`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }

    const updatedTourType = await updateTourTypeService( id, name );

    if ( !updatedTourType )
    {
        responseFunction( res, {
            message: `Something went wrong when updating the tour type`,
            statusCode: httpStatus.EXPECTATION_FAILED,
            data: null,
        } );

        return;
    }

    responseFunction( res, {
        message: "Tour type updated successfully",
        statusCode: httpStatus.OK,
        data: updatedTourType,
    } );
} );