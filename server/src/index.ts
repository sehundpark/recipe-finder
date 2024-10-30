import express from "express";
import cors from "cors";
import helmet from "helmet";
import { appConfig } from "./config";
import { errorHandler, rateLimiter } from "./middleware";
import { recipeRoutes } from "./routes/recipes";
import logger from "./utils/logger";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["https://sehunrecipefinder.netlify.app", "http://localhost:5173"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false,
  })
);
app.use(rateLimiter);

// Simple health check endpoint
app.get("/health", (_, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/recipes", recipeRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${appConfig.env} mode`);
});
