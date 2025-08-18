import express from 'express';
import { multerUpload } from '../../config/image/multer.config';
import { checkAuth } from '../../middleware/checkAuth.middleware';
import { validateRequest } from '../../middleware/validateRequest.middleware';
import { Role } from '../user/user.interface';
import { createDivision, deleteDivision, getAllDivisions, getDivisionById, updateDivision } from './division.controller';
import { zodDivisionSchema, zodUpdateDivisionSchema } from './division.validation';

const router = express.Router();

router.post( "/create", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), multerUpload.single("file"), validateRequest( zodDivisionSchema ), createDivision );

router.get( "/", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), getAllDivisions );

// router.get( "/:id", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), getDivisionById );

router.get( "/:slug", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), getDivisionById );

router.patch( "/:id", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), validateRequest( zodUpdateDivisionSchema ), updateDivision );

router.delete( "/:id", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), deleteDivision )

export const divisionRoutes = router;