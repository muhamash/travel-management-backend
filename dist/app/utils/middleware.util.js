"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = exports.isZodError = void 0;
exports.parseZodError = parseZodError;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const isZodError = (error) => {
    return error && typeof error === "object" && "issues" in error && Array.isArray(error.issues);
};
exports.isZodError = isZodError;
function parseZodError(error) {
    var _a;
    if (!(error instanceof zod_1.ZodError))
        return [];
    const formatted = error.format();
    const issues = [];
    for (const key in formatted) {
        if (key === "_errors")
            continue;
        const fieldErrors = (_a = formatted[key]) === null || _a === void 0 ? void 0 : _a._errors;
        if (fieldErrors && fieldErrors.length > 0) {
            fieldErrors.forEach((msg) => {
                issues.push({
                    field: key,
                    message: msg,
                });
            });
        }
    }
    return issues;
}
;
const generateToken = (payload, secret, options) => {
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
exports.generateToken = generateToken;
const verifyToken = (token, secret) => {
    const verifiedToken = jsonwebtoken_1.default.verify(token, secret);
    return verifiedToken;
};
exports.verifyToken = verifyToken;
