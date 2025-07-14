import express from 'express';
import { validateRequest } from '../../middleware/validateRequest.middleware';
import { createUser, getAllUsers } from './user.controller';
import { createUserZodSchema } from './user.validation';

const router = express.Router()

router.post( "/register", validateRequest(createUserZodSchema), createUser );
router.get( "/getAll", getAllUsers );


export const userRouter = router