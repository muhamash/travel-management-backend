import { IUser } from "./user.interface";
import { User } from "./user.model";

export const createUserService = async(payload : Partial<IUser>) =>
{
    const { name, email } = payload;
    // console.log(name, email)
    const user = await User.create( { name, email } );

    // console.log( "created a user: ", user );

    return user
}

export const getAllUsersService = async (): IUser[] => 
{
    const users = await User.find();

    return users;
}