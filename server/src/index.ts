import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { appConfig } from "./config";
import { errorHandler, rateLimiter } from "./middleware";
import { recipeRoutes } from "./routes/recipes";
import logger from "./utils/logger";

const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://sehunrecipefinder.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Security middleware
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);

// API Routes
app.use("/api/recipes", recipeRoutes);

// Static files in production
if (appConfig.env === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });
}

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${appConfig.env} mode`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
  // Don't exit in development
  if (appConfig.env === "production") {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  // Don't exit in development
  if (appConfig.env === "production") {
    process.exit(1);
  }
});
