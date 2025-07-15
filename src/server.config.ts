import { Server } from "http";

export function shutdown ( reason: unknown, error?: Error | unknown )
{
    let server: Server;
    
    console.error(`[${new Date().toISOString()}] ${reason}. Server is shutting down!`, error || "");

    if ( server ) 
    {
        server.close( () =>
        {
            process.exit( 1 );
        } );
    }
    else
    {
        process.exit(1);
    }
};