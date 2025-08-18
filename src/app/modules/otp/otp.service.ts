import { AppError } from "../../config/errors/App.error";
import { redisClient } from "../../config/redis.config";
import { sendEmail } from "../../utils/sendEmail";
import { generateOtp } from "../../utils/service.util";
import { User } from "../user/user.model";

const OTP_EXPIRATION = 2 * 60;

export const sendOTpService = async ( email: string, name: string ) =>
{
    const user = await User.findOne( { email } );

    console.log(user, email)

    if ( !user )
    {
        throw new AppError( 404, "User not found" )
    }

    if ( user.isVerified )
    {
        throw new AppError( 401, "You are already verified" )
    }
    const otp = generateOtp();

    const redisKey = `otp:${ email }`

    await redisClient.set( redisKey, otp, {
        expiration: {
            type: "EX",
            value: OTP_EXPIRATION
        }
    } )

    const sentEmail = await sendEmail( {
        to: email,
        subject: "Your OTP Code",
        templateName: "otp",
        templateData: {
            name: name,
            otp: otp
        }
    } );

    console.log(sentEmail)
};

export const verifyOTPService = async (email: string, otp: string) => {
    // const user = await User.findOne({ email, isVerified: false })
    const user = await User.findOne({ email })

    if (!user) {
        throw new AppError(404, "User not found")
    }

    if (user.isVerified) {
        throw new AppError(401, "You are already verified")
    }

    const redisKey = `otp:${email}`

    const savedOtp = await redisClient.get(redisKey)

    if (!savedOtp) {
        throw new AppError(401, "Invalid OTP");
    }

    if (savedOtp !== otp) {
        throw new AppError(401, "Invalid OTP");
    }


    await Promise.all([
        User.updateOne({ email }, { isVerified: true }, { runValidators: true }),
        redisClient.del([redisKey])
    ])

};