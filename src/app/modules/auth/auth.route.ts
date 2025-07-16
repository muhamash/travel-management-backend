import express from 'express';
import { checkAuth } from '../../middleware/checkAuth.middleware';
import { Role } from '../user/user.interface';
import { authLogin, getNewAccessToken } from './auth.controller';


const router = express.Router()

router.post( "/login", authLogin )
router.post( "/refresh-token", checkAuth(Role.ADMIN, Role.GUIDE, Role.SUPER_ADMIN, Role.USER), getNewAccessToken );

export const authRoutes = router