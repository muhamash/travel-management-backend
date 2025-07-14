import express from 'express';
import { checkAuth } from '../../middleware/checkError.middleware';
import { validateRequest } from '../../middleware/validateRequest.middleware';
import { createUser, getAllUsers } from './user.controller';
import { Role } from './user.interface';
import { createUserZodSchema } from './user.validation';

const router = express.Router()

router.post( "/register", validateRequest(createUserZodSchema), createUser );
router.get( "/getAll", checkAuth( Role.ADMIN, Role.SUPER_ADMIN ), getAllUsers );

export const userRouter = router