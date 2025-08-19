/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { AppError } from "../../config/errors/App.error";
import { responseFunction } from "../../utils/controller.util";
import { asyncHandler } from "../../utils/service.util";
import { createTourService, createTourTypeService, deleteTourByIdService, getAllTourService, getAllTourTypesService, getSingleTourService, getTourTypeByIdService, updateTourByIdService, updateTourTypeService } from "./tour.service";
import { TourType } from "./tourType.model";

// tour type controller functions
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

export const deleteTourType = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
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

    const deletedTourType = await TourType.findByIdAndDelete( id );

    if ( !deletedTourType )
    {
        responseFunction( res, {
            message: `Tour type not found`,
            statusCode: httpStatus.NOT_FOUND,
            data: null,
        } );

        return;
    }

    responseFunction( res, {
        message: "Tour type deleted successfully",
        statusCode: httpStatus.OK,
        data: deletedTourType,
    } );
} );    

// tour controller functions
export const createTour = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    const user = req.user;

    // console.log(req.file, req.body)
    const multerFiles = ( req.file as Express.Multer.File[] ).map( file => file.path );

    console.log(multerFiles)

    const createdTour = await createTourService( {...req.body, images: multerFiles(req.file as Express.Multer.File[])}, user );

    if ( !createdTour )
    {
        throw new AppError(httpStatus.BAD_REQUEST, "Can't create the tour!")
    }

    responseFunction( res, {
        message: "Tour created successfully",
        statusCode: httpStatus.CREATED,
        data: createdTour, 
    } );
} );

export const getAllTour = asyncHandler( async ( req: Request, res: Response, next: NextFunction ): Promise<void> =>
{
    const query = req.query;

    // {
    //     page: Number( query.page ) || 1,
    //     limit: Number( query.limit ) || 10,
    //     sortBy: query.sortBy as string || "createdAt",
    //     sortOrder: query.sortOrder as "asc" | "desc" || "desc",
    //     query: query as Record<string, string>,
    // }

    const allTours = await getAllTourService(query);


    if ( !allTours.data.length )
    {
        throw new AppError( httpStatus.OK, "Tour dataset is empty!" );
    }

    responseFunction( res, {
        message: "Tours fetched successfully",
        statusCode: httpStatus.OK,
        data: allTours.data,
        meta: allTours.meta,
    } );
} );

export const getSingleTour = asyncHandler( async ( req: Request, res: Response, next: NextFunction ) =>
{
    const id = req.params.id;

    if ( !id )
    {
        throw new AppError( httpStatus.BAD_REQUEST, `Please provide an id` )
    }

    const tour = await getSingleTourService( id );

    // console.log(tour)

    responseFunction( res, {
        message: "Tour found",
        statusCode: httpStatus.CREATED,
        data: tour,
    } );
    
} );

export const deleteTourById = asyncHandler( async ( req: Request, res: Response, next: NextFunction ) =>
{
    const id = req.params.id;
    const user = req.user;

    if ( !id )
    {
        throw new AppError(httpStatus.BAD_REQUEST, `Please provide an id`)
    }

    await deleteTourByIdService( id, user );

    responseFunction( res, {
        message: "Tour deleted!!!",
        statusCode: httpStatus.OK,
        data: null, 
    } );
    
} );

export const updateTourById = asyncHandler( async ( req: Request, res: Response, next: NextFunction ) =>
{
    const id = req.params.id;
    const user = req.user;
    const payload = req.body;

    const updatedTour = await updateTourByIdService( user, id, payload );

    responseFunction( res, {
        message: "Tour updated!!!",
        statusCode: httpStatus.OK,
        data: updatedTour, 
    } );
    
} );