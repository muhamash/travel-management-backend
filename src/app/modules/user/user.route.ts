import express from 'express';
import { checkAuth } from '../../middleware/checkAuth.middleware';
import { validateRequest } from '../../middleware/validateRequest.middleware';
import { createUser, getAllUsers, updateUser } from './user.controller';
import { Role } from './user.interface';
import { createUserZodSchema, updateUserZodSchema } from './user.validation';

const router = express.Router()

router.post( "/register", validateRequest( createUserZodSchema ), createUser );

router.get( "/getAll", checkAuth( Role.ADMIN, Role.SUPER_ADMIN ), getAllUsers );

router.patch( "/update/:id", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER, Role.GUIDE ), validateRequest( updateUserZodSchema ), updateUser );

export const userRouter = router