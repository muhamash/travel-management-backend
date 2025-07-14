import bcrypt from "bcryptjs";
import httpStatus from 'http-status-codes';
import { AppError } from "../../config/errors/App.error";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

export const credentialLoginService = async(payload: Partial<IUser>) =>
{

    const { email, password } = payload;
    const isUser = await User.findOne( { email } );
    
    if ( isUser )
    {
        // console.log(isUser)
        const isPassMatch = await bcrypt.compare( password as string, isUser.password as string );

        if ( isPassMatch )
        {
            return email
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