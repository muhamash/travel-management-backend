import { Server } from "http";
import app from "./app/app";
import { envStrings } from "./app/config/env.config";
import { dbConnect } from "./app/config/mongoose.config";

let server: Server;

const startServer = async() =>
{
    try 
    {
        await dbConnect()
        
        server = app.listen( envStrings.PORT, () =>
        {
            console.log( `Server is listening at port : ${envStrings.PORT}` );
            console.log(`Server entry : http://localhost:${envStrings.PORT} 🛜`)
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

