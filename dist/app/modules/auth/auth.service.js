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
exports.credentialLoginService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const env_config_1 = require("../../config/env.config");
const App_error_1 = require("../../config/errors/App.error");
const middleware_util_1 = require("../../utils/middleware.util");
const user_model_1 = require("../user/user.model");
const credentialLoginService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUser = yield user_model_1.User.findOne({ email });
    if (isUser) {
        // console.log(isUser)
        const isPassMatch = yield bcryptjs_1.default.compare(password, isUser.password);
        if (isPassMatch) {
            const jwtPayload = {
                userId: isUser.id,
                email: isUser.email,
                password: isUser.password,
                role: isUser.role
            };
            // console.log(isUser)
            // const accessToken = await jwt.sign( jwtPayload, envStrings.ACCESS_TOKEN_SECRET as string, {
            //     expiresIn: "5m"
            // } );
            const accessToken = yield (0, middleware_util_1.generateToken)(jwtPayload, env_config_1.envStrings.ACCESS_TOKEN_SECRET, {
                expiresIn: 300
            });
            return {
                email,
                accessToken,
                userId: isUser.id,
                expiresIn: '5m'
            };
        }
        else {
            throw new App_error_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Wrong password!!");
        }
    }
    else {
        throw new App_error_1.AppError(http_status_codes_1.default.NOT_FOUND, "User not found!!");
    }
});
exports.credentialLoginService = credentialLoginService;
