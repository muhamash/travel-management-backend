/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from "http";
import httpStatus from 'http-status-codes';
import app from "./app/app";
import { envStrings } from "./app/config/env.config";
import { AppError } from "./app/config/errors/App.error";
import { dbConnect } from "./app/config/mongoose.config";
import { connectRedis } from "./app/modules/otp/redis.config";

const startServer = async() =>
{
    try 
    {

        await dbConnect();
        await connectRedis();
        
        const server : Server = app.listen( envStrings.PORT, () =>
        {
            console.log( `Server is listening at port : ${envStrings.PORT} 😁` );
            console.log(`Server entry : http://localhost:${envStrings.PORT} 🛜`)
        })
    }
    catch ( error: unknown )
    {
        console.log( error );

        throw new AppError(httpStatus.BAD_GATEWAY, "Server connection failed!")
    }
}

startServer();

// process.on( "unhandledRejection", ( reason: unknown, promise: Promise<never> ) =>
// {
//     // const value = await promise;
//     // console.log( value )
    
//     shutdown( "Unhandled Rejection", reason );
// });

// process.on( "uncaughtException", ( error: Error ) =>
// {
//     shutdown( "Uncaught Exception", error );
// } );

// process.on( "SIGTERM", () =>
// {
//     shutdown( "SIGTERM Signal" );
// } );

// process.on( "SIGINT", () =>
// {
//     shutdown( "SIGINT Signal" );
// } );

// unhandled rejection!
// uncaught rejection!!
// signal termination sigterm!!!

// process.on( "unhandledRejection", (error) =>
// {
//     console.log( "unhandled rejection found!! server is shuting down!!", error );

//     if ( server )
//     {
//         server.close( () =>
//         {
//             process.exit(1);
//         });
//     }

//     process.exit(1)
// } )

// process.on( "uncaughtException", ( error ) =>
// {
//     console.log( "uncaughtException found!! server is shuting down!!", error );
    
//     if ( server )
//     {
//         server.close( () =>
//         {
//             process.exit( 1 );
//         } );
//     }
    
//     process.exit( 1 )
// } );

// process.on( "SIGTERM", ( ) =>
// {
//     console.log( "sigterm signal found!! server is shuting down!!" );
        
//     if ( server )
//     {
//         server.close( () =>
//         {
//             process.exit( 1 );
//         } );
//     }
        
//     process.exit( 1 )
// } );

// process.on( "SIGINT", () =>
// {
//     console.log( "SIGINT signal found!! server is shuting down!!" );
            
//     if ( server )
//     {
//         server.close( () =>
//         {
//             process.exit( 1 );
//         } );
//     }
            
//     process.exit( 1 )
// } );

// unhandled rejection
// Promise.reject(new Error("Forgot to catch the promise!"))

// uncaught rejection
// throw new Error("Forgot to catch the promise!")

