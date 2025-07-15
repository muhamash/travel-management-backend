import bcrypt from "bcryptjs";
import httpStatus from 'http-status-codes';
import { envStrings } from "../../config/env.config";
import { AppError } from "../../config/errors/App.error";
import { generateToken } from "../../utils/middleware.util";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

export const credentialLoginService = async(payload: Partial<IUser>) =>
{

    // console.log(payload)
    const { email, password } = payload;
    const isUser = await User.findOne( { email } );
    
    if ( isUser )
    {
        // console.log(isUser)
        const isPassMatch = await bcrypt.compare( password as string, isUser.password as string );

        if ( isPassMatch )
        {
            const jwtPayload = {
                userId: isUser.id,
                email: isUser.email,
                password: isUser.password,
                role: isUser.role
            }

            // console.log(isUser)
            // const accessToken = await jwt.sign( jwtPayload, envStrings.ACCESS_TOKEN_SECRET as string, {
            //     expiresIn: "5m"
            // } );
            const accessToken = await generateToken( jwtPayload, envStrings.ACCESS_TOKEN_SECRET as string, {
                expiresIn: 3000
            } );

            return {
                email,
                accessToken,
                userId: isUser.id,
                expiresIn: '5m',
                type: isUser.role
            }
        }
        else
        {
            throw new AppError( httpStatus.BAD_REQUEST, "Wrong password!!" );
        }
    }
    else
    {
        throw new AppError( httpStatus.NOT_FOUND, "User not found!!" );
    }
}