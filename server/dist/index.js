"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const recipes_1 = require("./routes/recipes");
const logger_1 = __importDefault(require("./utils/logger"));
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(middleware_1.rateLimiter);
// Routes
app.use("/api/recipes", recipes_1.recipeRoutes);
// Error handling
app.use(middleware_1.errorHandler);
app.listen(config_1.appConfig.port, () => {
    logger_1.default.info(`Server running on port ${config_1.appConfig.port} in ${config_1.appConfig.env} mode`);
});
process.on("unhandledRejection", (err) => {
    logger_1.default.error("Unhandled Rejection:", err);
    process.exit(1);
});
