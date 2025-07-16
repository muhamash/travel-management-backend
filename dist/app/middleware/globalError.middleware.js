"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorResponse = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const App_error_1 = require("../config/errors/App.error");
const middleware_util_1 = require("../utils/middleware.util");
const globalErrorResponse = (error, req, res, next) => {
    var _a;
    let statusCode = http_status_codes_1.default.BAD_REQUEST;
    let message = "Something went wrong";
    let stack;
    //  Zod errors with fields
    if ((0, middleware_util_1.isZodError)(error)) {
        const fieldIssues = (0, middleware_util_1.parseZodError)(error);
        message = fieldIssues.length
            ? `Validation error on field '${fieldIssues[0].field}': ${fieldIssues[0].message}`
            : "Validation error";
        const responsePayload = Object.assign({ name: error.name || "ZodError", message, status: http_status_codes_1.default.BAD_REQUEST, success: false, errors: fieldIssues }, (process.env.NODE_ENV === "development" && { stack: error.stack }));
        return res.status(http_status_codes_1.default.BAD_REQUEST).json(responsePayload);
    }
    //  custom AppError
    if (error instanceof App_error_1.AppError) {
        statusCode = error.statusCode;
        message = error.message;
        stack = error.stack;
    }
    //  general Error
    else if (error instanceof Error) {
        message = error.message;
        stack = error.stack;
        // fallback if no custom statusCode
        statusCode = (_a = error.statusCode) !== null && _a !== void 0 ? _a : http_status_codes_1.default.BAD_REQUEST;
    }
    // unknown error fallback
    else {
        message = "unknownn error";
    }
    // error response payload
    const responsePayload = {
        name: error.name || "unknownError",
        message,
        status: statusCode,
        success: false,
    };
    if (process.env.NODE_ENV === "development" && stack) {
        responsePayload.stack = stack;
    }
    return res.status(statusCode).json(responsePayload);
};
exports.globalErrorResponse = globalErrorResponse;
