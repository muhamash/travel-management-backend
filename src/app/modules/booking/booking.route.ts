import express from 'express';
import { checkAuth } from '../../middleware/checkAuth.middleware';


const router = express.Router();

router.post( "/", checkAuth() );

export const bookingRoutes = router;