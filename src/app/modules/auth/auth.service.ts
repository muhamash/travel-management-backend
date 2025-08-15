import bcrypt from "bcryptjs";
import httpStatus from 'http-status-codes';
import { JwtPayload } from "jsonwebtoken";
import { envStrings } from "../../config/env.config";
import { AppError } from "../../config/errors/App.error";
import { verifyToken } from "../../utils/middleware.util";
import { userTokens } from "../../utils/service.util";
import { IsActive, IUser } from "../user/user.interface";
import { User } from "../user/user.model";

export const credentialLoginService = async ( payload: Partial<IUser> ) =>
{
    const { email, password } = payload;

    const isUser = await User.findOne( { email } ).lean();

    if ( !isUser )
    {
        throw new AppError( httpStatus.NOT_FOUND, "User not found!!" );
    }

    const isPassMatch = await bcrypt.compare( password as string, isUser.password as string );

    if ( !isPassMatch )
    {
        throw new AppError( httpStatus.BAD_REQUEST, "Wrong password!!" );
    }

    delete isUser.password;

    const { accessToken, refreshToken } = await userTokens( isUser );

    return {
        email,
        accessToken,
        refreshToken,
        userId: isUser._id,
        expiresIn: 300000,
        user: isUser,
    };
};

export const getNewTokenService = async ( refreshToken: string ) =>
{
    const verifyRefreshToken = verifyToken( refreshToken, envStrings.REFRESH_TOKEN_SECRET );

    // console

    const user = await User.findOne( { email: verifyRefreshToken.email } );

    if ( !user )
    {
        throw new AppError( httpStatus.NOT_FOUND, "User not found!!" );
    }

    if ( !user?.isDeleted && user?.isActive === IsActive.ACTIVE )
    {
        // console.log( verifyRefreshToken, user )
    
        if ( verifyRefreshToken )
        {
            const { accessToken, refreshToken } = await userTokens( user );
        
            return { accessToken, refreshToken }
        }
        else
        {
            throw new AppError( httpStatus.CONFLICT, "Error in new token service!!" )
        }
    } else
    {
        throw new AppError( httpStatus.FORBIDDEN, "User is restricted!!!" )
    }

};

export const resetPasswordService = async ( oldPass: string, newPass: string, decodedToken: JwtPayload ) =>
{
    const user = await User.findById( decodedToken.userId );
    
    // console.log( user, newPass, oldPass, decodedToken );
    const isOldPassMatch = await bcrypt.compare( oldPass, user?.password as string );

    if ( !isOldPassMatch )
    {
        throw new AppError( httpStatus.EXPECTATION_FAILED, `Old password doest match` );
    }

    user?.password = await bcrypt.hash( newPass, Number(envStrings.BCRYPT_SALT) );

    return user?.save();
};

// export const getUserService = async ({}) =>
// {
    
// }