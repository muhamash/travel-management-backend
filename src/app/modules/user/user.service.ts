import bcrypt from "bcryptjs";
import httpStatus from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { AppError } from "../../config/errors/App.error";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";

export const createUserService = async(payload : Partial<IUser>) =>
{
    const { email, password, ...rest } = payload;
    // console.log(payload)

    const hashedPass = await bcrypt.hash( password as string, 10 );
    
    // const isUser
    const provider: IAuthProvider = {
        provider: "credentials",
        providerId: email as string
    }
    const user = await User.create( { email, auths: [provider], password: hashedPass, ...rest } );

    // console.log( "created a user: ", user, password, hashedPass );

    return user
}

export const getAllUsersService = async (): IUser[] => 
{
    const users = await User.find();

    return users;
}

export const updatedUserService = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) =>
{
    const isUser = await User.findById( userId )

    if ( !isUser )
    {
        throw new AppError(httpStatus.NOT_FOUND, `User not found!!`)
    }

    // if ( isUser.isDeleted || isUser.isActive === IsActive.BLOCKED )
    // {
    //     throw new AppError(httpStatus.FORBIDDEN, `This user cannot be updated`)
    // }
    console.log("from user update service",payload, decodedToken, userId)

    if ( payload.role )
    {
        console.log("from user update service",payload, decodedToken, userId)
        if ( decodedToken.role !== Role.ADMIN || decodedToken.role !== Role.SUPER_ADMIN)
        {
            throw new AppError( httpStatus.FORBIDDEN, `You are just a ${ decodedToken.role } ; you are not authorized` );
        }
        else if( payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN)
        {
            throw new AppError( httpStatus.FORBIDDEN, `You are just a ${ decodedToken.role } ; you are not authorized` );
        }
    }

    if ( payload.role || payload.isVerified || payload.isActive )
    {
        if ( decodedToken.role !== Role.ADMIN || decodedToken.role !== Role.SUPER_ADMIN)
        {
            throw new AppError( httpStatus.FORBIDDEN, `You are just a ${ decodedToken.role } ; you are not authorized` );
        }
    }

    if ( payload.password )
    {
        payload.password = await bcrypt.hash( payload.password, "10" );
    }

    const newUpdatedUser = await User.findByIdAndUpdate( userId, payload, { new: true, runValidators: true } );

    return newUpdatedUser;
}