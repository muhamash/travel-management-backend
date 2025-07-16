"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shutdown = shutdown;
function shutdown(reason, error) {
    let server;
    console.error(`[${new Date().toISOString()}] ${reason}. Server is shutting down!`, error || "");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
}
;
