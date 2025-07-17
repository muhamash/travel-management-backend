import express from 'express';
import passport from 'passport';
import { checkAuth } from '../../middleware/checkAuth.middleware';
import { validateRequest } from '../../middleware/validateRequest.middleware';
import { Role } from '../user/user.interface';
import { updatePassZodSchema } from '../user/user.validation';
import { authLogin, getNewAccessToken, googleAuthCallback, googleAuthLogin, logout, resetPassword } from './auth.controller';


const router = express.Router()


router.post( "/login", authLogin );

router.post( "/refresh-token", checkAuth( Role.ADMIN, Role.GUIDE, Role.SUPER_ADMIN, Role.USER ), getNewAccessToken );

router.post( "/logout", checkAuth( Role.ADMIN, Role.GUIDE, Role.SUPER_ADMIN, Role.USER ), logout );

router.post( "/reset-password", checkAuth( ...Object.values( Role ) ), validateRequest( updatePassZodSchema ), resetPassword );

router.get( "/google", googleAuthLogin );

router.get( "/google/callback", passport.authenticate( 'google', { failureRedirect: "/login" } ), googleAuthCallback );





export const authRoutes = router