import express from 'express';
import { createUser, getAllUsers } from './user.controller';

const router = express.Router()

router.post( "/register", createUser );
router.get("/getAll", getAllUsers)


export const userRouter = router