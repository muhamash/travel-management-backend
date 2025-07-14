import express from 'express';
import { authLogin } from './auth.controller';


const router = express.Router()

router.post("/login", authLogin)

export const authRoutes = router