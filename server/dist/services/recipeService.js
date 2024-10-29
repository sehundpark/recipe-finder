"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRecipes = exports.getFilterOptions = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = require("../config");
const logger_1 = __importDefault(require("../utils/logger"));
const cacheService_1 = require("./cacheService");
const getFilterOptions = async () => {
    try {
        const cacheKey = "filter_options";
        const cachedData = (0, cacheService_1.getCached)(cacheKey);
        if (cachedData) {
            logger_1.default.debug("Returning cached filter options");
            return cachedData;
        }
        if (!(0, cacheService_1.canMakeApiCall)()) {
            throw Object.assign(new Error("API rate limit reached"), {
                status: 429,
                code: "RATE_LIMIT_EXCEEDED",
            });
        }
        const params = new URLSearchParams({
            type: "public",
            q: "chicken", // Using a common term to get diverse options
            app_id: config_1.appConfig.edamam.appId,
            app_key: config_1.appConfig.edamam.appKey,
        });
        (0, cacheService_1.incrementApiCounter)();
        const response = await (0, node_fetch_1.default)(`${config_1.appConfig.edamam.baseUrl}?${params}`);
        if (!response.ok) {
            throw Object.assign(new Error("Failed to fetch filter options"), {
                status: response.status,
            });
        }
        const data = (await response.json());
        // Process all unique values from the response
        const filterOptions = {
            healthLabels: [
                ...new Set(data.hits.flatMap((hit) => hit.recipe.healthLabels)),
            ].sort(),
            cuisineTypes: [
                ...new Set(data.hits.flatMap((hit) => hit.recipe.cuisineType)),
            ].sort(),
            mealTypes: [
                ...new Set(data.hits.flatMap((hit) => hit.recipe.mealType)),
            ].sort(),
            dishTypes: [
                ...new Set(data.hits.flatMap((hit) => hit.recipe.dishType)),
            ].sort(),
            dietLabels: [
                ...new Set(data.hits.flatMap((hit) => hit.recipe.dietLabels)),
            ].sort(),
        };
        (0, cacheService_1.setCache)(cacheKey, filterOptions);
        return filterOptions;
    }
    catch (error) {
        logger_1.default.error("Error fetching filter options:", error);
        throw error;
    }
};
exports.getFilterOptions = getFilterOptions;
const searchRecipes = async (query, filters) => {
    try {
        const cacheKey = `search_${query}_${JSON.stringify(filters)}`;
        const cachedData = (0, cacheService_1.getCached)(cacheKey);
        if (cachedData) {
            logger_1.default.debug("Returning cached search results");
            return cachedData;
        }
        // Check for similar cached results before making a new API call
        const similarResults = (0, cacheService_1.getSimilarSearchResults)(query, filters);
        if (similarResults) {
            logger_1.default.debug("Returning similar cached results");
            return similarResults;
        }
        if (!(0, cacheService_1.canMakeApiCall)()) {
            throw Object.assign(new Error("API rate limit reached"), {
                status: 429,
                code: "RATE_LIMIT_EXCEEDED",
            });
        }
        const params = new URLSearchParams({
            type: "public",
            q: query,
            app_id: config_1.appConfig.edamam.appId,
            app_key: config_1.appConfig.edamam.appKey,
        });
        // Add filters to params
        if (filters?.cuisineType)
            params.append("cuisineType", filters.cuisineType);
        if (filters?.mealType)
            params.append("mealType", filters.mealType);
        if (filters?.dishType)
            params.append("dishType", filters.dishType);
        if (filters?.diet)
            params.append("diet", filters.diet);
        if (filters?.health) {
            filters.health.forEach((health) => params.append("health", health));
        }
        if (filters?.excluded) {
            filters.excluded.forEach((excluded) => params.append("excluded", excluded));
        }
        (0, cacheService_1.incrementApiCounter)();
        const response = await (0, node_fetch_1.default)(`${config_1.appConfig.edamam.baseUrl}?${params}`);
        if (!response.ok) {
            (0, cacheService_1.setFailedSearchCache)(cacheKey);
            throw Object.assign(new Error("Failed to fetch recipes"), {
                status: response.status,
            });
        }
        const data = (await response.json());
        const recipes = data.hits.map((hit) => hit.recipe);
        (0, cacheService_1.setCache)(cacheKey, recipes);
        return recipes;
    }
    catch (error) {
        logger_1.default.error("Error searching recipes:", error);
        throw error;
    }
};
exports.searchRecipes = searchRecipes;
