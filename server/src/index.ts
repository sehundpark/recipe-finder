import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { appConfig } from "./config";
import { errorHandler, rateLimiter } from "./middleware";
import { recipeRoutes } from "./routes/recipes";
import logger from "./utils/logger";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// API Routes
app.use("/api/recipes", recipeRoutes);

// Serve static files from the React app
if (appConfig.env === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });
}

// Error handling
app.use(errorHandler);

app.listen(appConfig.port, () => {
  logger.info(
    `Server running on port ${appConfig.port} in ${appConfig.env} mode`
  );
});

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
  process.exit(1);
});
