import express from 'express';
import { checkAuth } from '../../middleware/checkAuth.middleware';
import { validateRequest } from '../../middleware/validateRequest.middleware';
import { Role } from '../user/user.interface';
import { createBooking } from './booking.controller';
import { bookingValidation } from './booking.validation';


const router = express.Router();

router.post( "/create", checkAuth(Role.USER, Role.GUIDE, Role.SUPER_ADMIN, Role.ADMIN), validateRequest(bookingValidation),  createBooking);

export const bookingRoutes = router;