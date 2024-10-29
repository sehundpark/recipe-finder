import dotenv from "dotenv";
import { z } from "zod";

// Initialize dotenv
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("3001"),
  EDAMAM_APP_ID: z.string(),
  EDAMAM_APP_KEY: z.string(),
  EDAMAM_BASE_URL: z.string(),
  CACHE_TTL: z.string().default("3600"), // 1 hour in seconds
  RATE_LIMIT_WINDOW: z.string().default("900000"), // 15 minutes in milliseconds
  RATE_LIMIT_MAX: z.string().default("100"), // maximum requests per window
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("❌ Invalid environment variables:", env.error.format());
  throw new Error("Invalid environment variables");
}

export const appConfig = {
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
} as const;
