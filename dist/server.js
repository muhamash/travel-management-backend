"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app/app"));
const env_config_1 = require("./app/config/env.config");
const mongoose_config_1 = require("./app/config/mongoose.config");
const server_config_1 = require("./server.config");
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongoose_config_1.dbConnect)();
        server = app_1.default.listen(env_config_1.envStrings.PORT, () => {
            console.log(`Server is listening at port : ${env_config_1.envStrings.PORT}`);
            console.log(`Server entry : http://localhost:${env_config_1.envStrings.PORT} 🛜`);
        });
    }
    catch (error) {
        console.log(error);
        return;
    }
});
startServer();
process.on("unhandledRejection", (reason, promise) => {
    // const value = await promise;
    // console.log( value )
    (0, server_config_1.shutdown)("Unhandled Rejection", reason);
});
process.on("uncaughtException", (error) => {
    (0, server_config_1.shutdown)("Uncaught Exception", error);
});
process.on("SIGTERM", () => {
    (0, server_config_1.shutdown)("SIGTERM Signal");
});
process.on("SIGINT", () => {
    (0, server_config_1.shutdown)("SIGINT Signal");
});
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
