"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalError_middleware_1 = require("./middleware/globalError.middleware");
const globalNotFound_middleware_1 = require("./middleware/globalNotFound.middleware");
const home_controller_1 = require("./modules/home/home.controller");
const index_route_1 = require("./routes/index.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// demo home route 
app.get("/", home_controller_1.homeController);
// actual business route
app.use("/api/v1", index_route_1.firstVersionRouter);
// global not found route
app.use(globalNotFound_middleware_1.globalNotFoundResponse);
// global error response
app.use(globalError_middleware_1.globalErrorResponse);
exports.default = app;
