import express from 'express';
import { checkAuth } from '../../middleware/checkAuth.middleware';
import { checkUpdatePermission } from '../../middleware/checkUpdatePermission.middleware';
import { validateRequest } from '../../middleware/validateRequest.middleware';
import { createUser, getAllUsers, getMe, updateUser } from './user.controller';
import { Role } from './user.interface';
import { createUserZodSchema, updateUserZodSchema } from './user.validation';

const router = express.Router()

router.post( "/register", validateRequest( createUserZodSchema ), createUser );

router.get( "/getAll", checkAuth( Role.ADMIN, Role.SUPER_ADMIN ), getAllUsers );

router.patch( "/update/:id", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER, Role.GUIDE ), validateRequest( updateUserZodSchema ), checkUpdatePermission, updateUser );

router.get( "/getMe", checkAuth( Role.ADMIN, Role.SUPER_ADMIN, Role.USER, Role.GUIDE ), getMe );

export const userRouter = router