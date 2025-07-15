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
exports.getAllUsers = exports.createUser = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const response_util_1 = require("../../utils/response.util");
const service_util_1 = require("../../utils/service.util");
const user_service_1 = require("./user.service");
exports.createUser = (0, service_util_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body)
    const user = yield (0, user_service_1.createUserService)(req.body);
    if (!user) {
        (0, response_util_1.responseFunction)(res, {
            message: `Something went wrong when creating the user`,
            statusCode: http_status_codes_1.default.EXPECTATION_FAILED,
            data: null,
        });
        return;
    }
    if (user) {
        (0, response_util_1.responseFunction)(res, {
            message: `User created!!`,
            statusCode: http_status_codes_1.default.CREATED,
            data: user,
        });
    }
    else {
        next();
    }
}));
exports.getAllUsers = (0, service_util_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_service_1.getAllUsersService)();
    if (!users) {
        (0, response_util_1.responseFunction)(res, {
            message: `Something went wrong when fetching the users`,
            statusCode: http_status_codes_1.default.EXPECTATION_FAILED,
            data: null,
        });
        return;
    }
    if (users.length === 0) {
        (0, response_util_1.responseFunction)(res, {
            message: `Empty Database!!`,
            statusCode: http_status_codes_1.default.ACCEPTED,
            data: null,
        });
        return;
    }
    (0, response_util_1.responseFunction)(res, {
        message: "Users retrieved successfully",
        statusCode: http_status_codes_1.default.OK,
        data: users,
        meta: users.length,
    });
}));
