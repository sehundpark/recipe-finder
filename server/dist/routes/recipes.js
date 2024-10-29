"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRoutes = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const middleware_1 = require("../middleware");
const recipeService_1 = require("../services/recipeService");
const logger_1 = __importDefault(require("../utils/logger"));
const router = (0, express_1.Router)();
exports.recipeRoutes = router;
router.get("/filters", async (req, res, next) => {
    try {
        logger_1.default.debug("Fetching filter options");
        const filters = await (0, recipeService_1.getFilterOptions)();
        res.json(filters);
    }
    catch (error) {
        next(error);
    }
});
router.get("/search", middleware_1.validateSearch, async (req, res, next) => {
    try {
        const { query, ...rest } = req.query;
        logger_1.default.debug("Searching recipes", { query, filters: rest });
        const filters = {
            cuisineType: rest.cuisineType,
            mealType: rest.mealType,
            dishType: rest.dishType,
            diet: rest.diet,
            health: Array.isArray(rest.health)
                ? rest.health
                : rest.health
                    ? [rest.health]
                    : undefined,
            excluded: Array.isArray(rest.excluded)
                ? rest.excluded
                : rest.excluded
                    ? [rest.excluded]
                    : undefined,
        };
        const recipes = await (0, recipeService_1.searchRecipes)(query, filters);
        res.json(recipes);
    }
    catch (error) {
        next(error);
    }
});
// Health check endpoint
router.get("/health", (_req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({ status: "healthy" });
});
