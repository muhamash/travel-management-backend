import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { bookingRoutes } from "../modules/booking/booking.route";
import { divisionRoutes } from "../modules/division/division.route";
import { otpRouter } from "../modules/otp/otp.route";
import { paymentRouter } from "../modules/payment/payment.route";
import { tourRoutes } from "../modules/tour/tour.route";
import { userRouter } from "../modules/user/user.route";


export const firstVersionRouter = Router();

const moduleRouter = [
    {
        path: "/user",
        route: userRouter
    },
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/tour",
        route: tourRoutes
    },
    {
        path: '/otp',
        route: otpRouter,
    },
    {
        path: "/division",
        route: divisionRoutes
    },
    {
        path: "/payment",
        route: paymentRouter
    },
    {
        path: "/booking",
        route: bookingRoutes
    }
];

moduleRouter.forEach( ( route ) =>
{
    // console.log(route.route)
    firstVersionRouter.use(route.path, route.route)
} )