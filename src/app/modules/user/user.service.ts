import bcrypt from "bcryptjs";
import httpStatus from 'http-status-codes';
import { AppError } from "../../config/errors/App.error";
import { IAuthProvider, IUser } from './user.interface';
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
    const user = await User.create( { email, auths: [ provider ], password: hashedPass, ...rest } );
    
    const createdUser = user.toObject();
    delete createdUser.password;

    return createdUser;
}

export const getAllUsersService = async (): IUser[] => 
{
    const users = await User.find();

    return users;
}

export const updatedUserService = async ( userId: string, payload: Partial<IUser>, requestedUser: Partial<IUser> ) =>
{
    if ( payload.role )
    {
        if ( requestedUser.userId === userId )
        {
            // console.log( "requested user", requestedUser );
            if ( requestedUser.role !== payload.role )
            {
                throw new AppError( httpStatus.CONFLICT, "You cannot change your role" );
            }
        }
    }

    if ( payload.password )
    {
        payload.password = await bcrypt.hash( payload.password, "10" );
    }



    const newUpdatedUser = await User.findByIdAndUpdate( userId, payload, { new: true, runValidators: true } );

    return newUpdatedUser;

};