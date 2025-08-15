import { Router } from "express";
import { sendOtp, verifyOTP } from "./otp.controller";


const router = Router();

router.post( "/send-otp", sendOtp );
router.get( "/verify-otp", verifyOTP );

export const otpRouter = router