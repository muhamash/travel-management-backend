import express from 'express';
import { checkAuth } from '../../middleware/checkAuth.middleware';
import { validateRequest } from '../../middleware/validateRequest.middleware';
import { Role } from '../user/user.interface';
import { createTour, createTourType, deleteTourById, deleteTourType, getAllTour, getAllTourTypes, getSingleTour, getTourById, updateTourById, updateTourType } from './tour.controller';
import { tourTypeValidation, tourValidation, updateTourValidation } from './tour.validation';

const router = express.Router();

// Tour type routes
router.post( "/create-tour-type", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), validateRequest( tourTypeValidation ), createTourType );

router.get( "/tour-types", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), getAllTourTypes );

router.get( "/tour-types/:id", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ),  getTourById);

router.patch( "/tour-types/:id", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), validateRequest( tourTypeValidation ), updateTourType );

router.delete( "/tour-types/:id", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), deleteTourType );

// Tour routes
router.post( "/create-tour", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), validateRequest( tourValidation ), createTour );

router.get( "/", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), getAllTour );

router.get( "/:id", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), getSingleTour );

router.delete( "/:id", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), deleteTourById );

router.patch( "/:id", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), validateRequest( updateTourValidation ), updateTourById );

export const tourRoutes = router;