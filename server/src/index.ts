import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { appConfig } from "./config";
import { errorHandler, rateLimiter } from "./middleware";
import { recipeRoutes } from "./routes/recipes";
import logger from "./utils/logger";

const app = express();

// Basic CORS setup - more permissive for debugging
app.use(cors());

// Pre-flight requests
app.options("*", cors());

// Security middleware - configure helmet to work with CORS
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "unsafe-none" },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "https://sehunrecipefinder.netlify.app",
          "http://localhost:5173",
        ],
        imgSrc: ["'self'", "data:", "https:", "http:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

app.use(express.json());
app.use(rateLimiter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// API Routes
app.use("/api/recipes", recipeRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${appConfig.env} mode`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
  if (appConfig.env === "production") {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  if (appConfig.env === "production") {
    process.exit(1);
  }
});
