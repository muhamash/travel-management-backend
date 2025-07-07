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
            console.log(`Server entry : http://localhost:3000 🛜`)
        })
    }
    catch ( error )
    {
        console.log( error );
        return
    }
}

startServer();

// unhandled rejection!
// uncaught rejection!!
// signal termination sigterm!!!

process.on( "unhandledRejection", (error) =>
{
    console.log( "unhandled rejection found!! server is shuting down!!", error );

    if ( server )
    {
        server.close( () =>
        {
            process.exit(1);
        });
    }

    process.exit(1)
} )

process.on( "uncaughtException", ( error ) =>
{
    console.log( "uncaughtException found!! server is shuting down!!", error );
    
    if ( server )
    {
        server.close( () =>
        {
            process.exit( 1 );
        } );
    }
    
    process.exit( 1 )
} );

process.on( "SIGTERM", ( ) =>
{
    console.log( "sigterm signal found!! server is shuting down!!" );
        
    if ( server )
    {
        server.close( () =>
        {
            process.exit( 1 );
        } );
    }
        
    process.exit( 1 )
} );

process.on( "SIGINT", () =>
{
    console.log( "SIGINT signal found!! server is shuting down!!" );
            
    if ( server )
    {
        server.close( () =>
        {
            process.exit( 1 );
        } );
    }
            
    process.exit( 1 )
} );

// unhandled rejection
// Promise.reject(new Error("Forgot to catch the promise!"))

// uncaught rejection
// throw new Error("Forgot to catch the promise!")

