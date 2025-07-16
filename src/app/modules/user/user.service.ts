import bcrypt from "bcryptjs";
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
    const user = await User.create( { email, auths: [provider], password: hashedPass, ...rest } );

    // console.log( "created a user: ", user, password, hashedPass );

    return user
}

export const getAllUsersService = async (): IUser[] => 
{
    const users = await User.find();

    return users;
}

export const updatedUserService = async ( userId: string, payload: Partial<IUser> ) =>
{

    if ( payload.password )
    {
        payload.password = await bcrypt.hash( payload.password, "10" );
    }

    const newUpdatedUser = await User.findByIdAndUpdate( userId, payload, { new: true, runValidators: true } );

    return newUpdatedUser;

    // super admin -> super power
    // if ( decodedToken.role === Role.SUPER_ADMIN )
    // {
    //     // If self-update, always allow
    //     if ( userId === decodedToken.userId )
    //     {
    //         const newUpdatedUser = await User.findByIdAndUpdate( userId, payload, { new: true, runValidators: true } );
    //         return newUpdatedUser;
    //     }

    //     // If trying to update another SUPER_ADMIN
    //     if ( isUser.role === Role.SUPER_ADMIN )
    //     {
    //         throw new AppError( httpStatus.FORBIDDEN, "You are trying to update another SUPER_ADMIN!" );
    //     }

    //     // Otherwise  ADMIN, USER, GUIDEallow
    //     const newUpdatedUser = await User.findByIdAndUpdate( userId, payload, { new: true, runValidators: true } );
    //     return newUpdatedUser;
    // };

    // // admin -> update can the user and guide and its own info
    // if ( decodedToken.role === Role.ADMIN )
    // {
    //     // If self-update, allow
    //     if ( userId === decodedToken.userId )
    //     {
    //         const newUpdatedUser = await User.findByIdAndUpdate( userId, payload, { new: true, runValidators: true } );
    //         return newUpdatedUser;
    //     }

    //     // If trying to update another ADMIN or SUPER_ADMIN, forbid
    //     if ( isUser.role === Role.ADMIN || isUser.role === Role.SUPER_ADMIN )
    //     {
    //         throw new AppError( httpStatus.FORBIDDEN, "ADMIN cannot update another ADMIN or SUPER_ADMIN" );
    //     }

    //     // Otherwise, allow update (e.g., normal USER or GUIDE)
    //     const newUpdatedUser = await User.findByIdAndUpdate( userId, payload, { new: true, runValidators: true } );
    //     return newUpdatedUser;
    // }

    // // user and guide
    // if ( [ Role.USER, Role.GUIDE ].includes( userRole ) )
    // {
    //     if ( userId === decodedToken.userId )
    //     {
    //         const newUpdatedUser = await User.findByIdAndUpdate( userId, payload, { new: true, runValidators: true } );

    //         return newUpdatedUser;
    //     }
    //     else
    //     {
    //         throw new AppError( httpStatus.FORBIDDEN, `You are trying to update another user!!! But you have ${ userRole }` )
    //     }
    // }
};