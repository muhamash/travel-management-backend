import bcrypt from "bcryptjs";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";

export const createUserService = async(payload : Partial<IUser>) =>
{
    const { email, password, ...rest } = payload;
    // console.log(name, email)

    const hashedPass = await bcrypt.hash( password as string, 10 );
    
    // const isUser
    const provider: IAuthProvider = {
        provider: "credentials",
        providerId: email as string
    }
    const user = await User.create( { email, auths: [provider], password: hashedPass, ...rest } );

    console.log( "created a user: ", user, password, hashedPass );

    return user
}

export const getAllUsersService = async (): IUser[] => 
{
    const users = await User.find();

    return users;
}