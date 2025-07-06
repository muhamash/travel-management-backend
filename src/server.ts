import { Server } from "http";
import mongoose from "mongoose";
import app from "./app/app";

let server: Server;

const startServer = async() =>
{
    try 
    {
        await mongoose.connect( "mongodb+srv://expressMongo:psFDgctbQYcSy4Kx@atlascluster.cusoal9.mongodb.net/travel-management-level-2?retryWrites=true&w=majority&appName=AtlasCluster" );
        
        console.log( `MongoDB database is running 🥭` )
        
        server = app.listen( 3000, () =>
        {
            console.log( `Server is listening at port : 3000` );
            console.log(`Server is entrypoint : http://localhost:3000/ 🛜`)
        })
    }
    catch ( error )
    {
        console.log( error );
        return
    }
}

startServer();