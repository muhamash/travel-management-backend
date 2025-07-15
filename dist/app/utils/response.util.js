"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseFunction = void 0;
const responseFunction = (res, data) => {
    res.status(data.statusCode).json({
        message: data.message,
        statusCode: data.statusCode,
        meta: data.meta,
        data: data.data
    });
};
exports.responseFunction = responseFunction;
