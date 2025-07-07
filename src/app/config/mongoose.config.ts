import mongoose from "mongoose";
import { envStrings } from "./env.config";

export const dbConnect = async () : Promise<void> =>
{
    try {
        await mongoose.connect( envStrings.DB_URL );
        
        console.log( `MongoDB database is running 🥭` )
    }
    catch ( error : unknown )
    {
        console.log(error)
        throw new Error(error)
    }    
}