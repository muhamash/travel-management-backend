import express from 'express';
import { checkAuth } from '../../middleware/checkAuth.middleware';
import { validateRequest } from '../../middleware/validateRequest.middleware';
import { Role } from '../user/user.interface';
import { createDivision, getAllDivisions } from './division.controller';
import { zodDivisionSchema } from './division.validation';

const router = express.Router();

router.post( "/create", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), validateRequest( zodDivisionSchema ), createDivision );

router.get( "/", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER ), getAllDivisions );

export const divisionRoutes = router;