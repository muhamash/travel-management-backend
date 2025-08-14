import { Router } from "express";
import { sendOtp } from "./otp.controller";


const router = Router();

router.post( "/send-otp", sendOtp );
// router.get( "/verify-otp", sendOtp );

export const otpRouter = router