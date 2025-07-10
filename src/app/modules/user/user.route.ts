import express from 'express';
import { createUser } from './user.controller';

const router = express.Router()

router.post( "/register", createUser );

export const userRouter = router