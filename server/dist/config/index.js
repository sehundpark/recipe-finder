"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
// Initialize dotenv
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: zod_1.z.string().default("3001"),
    EDAMAM_APP_ID: zod_1.z.string(),
    EDAMAM_APP_KEY: zod_1.z.string(),
    EDAMAM_BASE_URL: zod_1.z.string(),
    CACHE_TTL: zod_1.z.string().default("3600"), // 1 hour in seconds
    RATE_LIMIT_WINDOW: zod_1.z.string().default("900000"), // 15 minutes in milliseconds
    RATE_LIMIT_MAX: zod_1.z.string().default("100"), // maximum requests per window
});
const env = envSchema.safeParse(process.env);
if (!env.success) {
    console.error("❌ Invalid environment variables:", env.error.format());
    throw new Error("Invalid environment variables");
}
exports.appConfig = {
    env: env.data.NODE_ENV,
    port: parseInt(env.data.PORT, 10),
    edamam: {
        appId: env.data.EDAMAM_APP_ID,
        appKey: env.data.EDAMAM_APP_KEY,
        baseUrl: env.data.EDAMAM_BASE_URL,
    },
    cache: {
        ttl: parseInt(env.data.CACHE_TTL, 10),
    },
    rateLimit: {
        windowMs: parseInt(env.data.RATE_LIMIT_WINDOW, 10),
        max: parseInt(env.data.RATE_LIMIT_MAX, 10),
    },
};
