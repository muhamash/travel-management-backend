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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const env_config_1 = require("../config/env.config");
const App_error_1 = require("../config/errors/App.error");
const middleware_util_1 = require("../utils/middleware.util");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new App_error_1.AppError(403, "No Token Received!");
        }
        const verifiedToken = (0, middleware_util_1.verifyToken)(accessToken, env_config_1.envStrings.ACCESS_TOKEN_SECRET);
        console.log(verifiedToken);
        if (!authRoles.includes(verifiedToken.role)) {
            throw new App_error_1.AppError(403, `You are not permitted to view this route!!! because you are ${verifiedToken.role}; expected ADMIN or SUPER_ADMIN`);
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        console.log("jwt error", error);
        next(error);
    }
});
exports.checkAuth = checkAuth;
