"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const checkError_middleware_1 = require("../../middleware/checkError.middleware");
const validateRequest_middleware_1 = require("../../middleware/validateRequest.middleware");
const user_controller_1 = require("./user.controller");
const user_interface_1 = require("./user.interface");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/register", (0, validateRequest_middleware_1.validateRequest)(user_validation_1.createUserZodSchema), user_controller_1.createUser);
router.get("/getAll", (0, checkError_middleware_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), user_controller_1.getAllUsers);
exports.userRouter = router;
