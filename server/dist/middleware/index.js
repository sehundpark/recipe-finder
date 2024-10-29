"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSearch = exports.errorHandler = exports.rateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const zod_1 = require("zod");
const http_status_codes_1 = require("http-status-codes");
const config_1 = require("../config");
const logger_1 = __importDefault(require("../utils/logger"));
exports.rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: config_1.appConfig.rateLimit.windowMs,
    max: config_1.appConfig.rateLimit.max,
    message: "Too many requests, please try again later",
});
const errorHandler = (err, req, res, next) => {
    logger_1.default.error("Error:", {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
    });
    const status = err.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || "Something went wrong";
    res.status(status).json({
        error: {
            message,
            status,
            code: err.code,
        },
    });
};
exports.errorHandler = errorHandler;
const validateSearch = (req, res, next) => {
    const schema = zod_1.z.object({
        query: zod_1.z.string().min(1, "Search query is required"),
        cuisineType: zod_1.z.string().optional(),
        mealType: zod_1.z.string().optional(),
        dishType: zod_1.z.string().optional(),
        diet: zod_1.z.string().optional(),
        health: zod_1.z.array(zod_1.z.string()).optional(),
        excluded: zod_1.z.array(zod_1.z.string()).optional(),
    });
    try {
        schema.parse(req.query);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                error: {
                    message: "Invalid request parameters",
                    details: error.errors,
                },
            });
        }
        else {
            next(error);
        }
    }
};
exports.validateSearch = validateSearch;
