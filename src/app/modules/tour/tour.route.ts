import express from 'express';
import { checkAuth } from '../../middleware/checkAuth.middleware';
import { validateRequest } from '../../middleware/validateRequest.middleware';
import { Role } from '../user/user.interface';
import { createTourType, deleteTourType, getAllTourTypes, getTourById, updateTourType } from './tour.controller';
import { tourTypeValidation } from './tour.validation';

const router = express.Router();

router.post( "/create-tour-type", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), validateRequest( tourTypeValidation ), createTourType );

router.get( "/tour-types", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), getAllTourTypes );

router.get( "/tour-types/:id", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ),  getTourById);

router.patch( "/tour-types/:id", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), validateRequest( tourTypeValidation ), updateTourType );

router.delete( "/tour-types/:id", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), deleteTourType ); 

export const tourRoutes = router;