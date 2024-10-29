"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCache = exports.getSimilarSearchResults = exports.setFailedSearchCache = exports.setCache = exports.getCached = exports.incrementApiCounter = exports.canMakeApiCall = exports.resetApiCallsCounter = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const logger_1 = __importDefault(require("../utils/logger"));
// Separate TTLs for different types of data
const CACHE_TTLS = {
    FILTER_OPTIONS: 24 * 60 * 60, // 24 hours for filter options
    SEARCH_RESULTS: 60 * 60, // 1 hour for search results
    FAILED_SEARCHES: 5 * 60, // 5 minutes for failed searches to prevent repeated failures
};
const cache = new node_cache_1.default({
    stdTTL: CACHE_TTLS.SEARCH_RESULTS,
    checkperiod: 600, // Check for expired keys every 10 minutes
    useClones: false, // Disable cloning for better performance
});
// Keep track of API calls
const apiCallsCounter = {
    timestamp: Date.now(),
    count: 0,
};
const resetApiCallsCounter = () => {
    apiCallsCounter.count = 0;
    apiCallsCounter.timestamp = Date.now();
};
exports.resetApiCallsCounter = resetApiCallsCounter;
// Check if we're within API rate limits
const canMakeApiCall = () => {
    const now = Date.now();
    const oneMinute = 60 * 1000;
    // Reset counter if it's been more than a minute
    if (now - apiCallsCounter.timestamp >= oneMinute) {
        (0, exports.resetApiCallsCounter)();
        return true;
    }
    return apiCallsCounter.count < 10;
};
exports.canMakeApiCall = canMakeApiCall;
const incrementApiCounter = () => {
    apiCallsCounter.count++;
};
exports.incrementApiCounter = incrementApiCounter;
const getCached = (key) => {
    try {
        return cache.get(key);
    }
    catch (error) {
        logger_1.default.error("Cache get error:", error);
        return undefined;
    }
};
exports.getCached = getCached;
const setCache = (key, value, ttl) => {
    try {
        const customTtl = ttl ||
            (key.startsWith("filter_options")
                ? CACHE_TTLS.FILTER_OPTIONS
                : CACHE_TTLS.SEARCH_RESULTS);
        cache.set(key, value, customTtl);
    }
    catch (error) {
        logger_1.default.error("Cache set error:", error);
    }
};
exports.setCache = setCache;
// Cache failed searches to prevent hammering the API with bad queries
const setFailedSearchCache = (key) => {
    try {
        cache.set(key, [], CACHE_TTLS.FAILED_SEARCHES);
    }
    catch (error) {
        logger_1.default.error("Failed search cache set error:", error);
    }
};
exports.setFailedSearchCache = setFailedSearchCache;
// Get similar cached searches
const getSimilarSearchResults = (query, filters) => {
    try {
        // Get all cache keys
        const keys = cache.keys();
        // Look for similar searches
        for (const key of keys) {
            if (!key.startsWith("search_"))
                continue;
            const [, cachedQuery, cachedFilters] = key.split("_");
            // Check if queries are similar (case insensitive, partial match)
            const querySimilar = query.toLowerCase().includes(cachedQuery.toLowerCase()) ||
                cachedQuery.toLowerCase().includes(query.toLowerCase());
            // Check if filters are similar (at least main filters match)
            const filtersSimilar = filters.cuisineType === JSON.parse(cachedFilters).cuisineType &&
                filters.mealType === JSON.parse(cachedFilters).mealType;
            if (querySimilar && filtersSimilar) {
                const results = cache.get(key);
                if (results && results.length > 0) {
                    logger_1.default.debug("Returning similar cached results");
                    return results;
                }
            }
        }
    }
    catch (error) {
        logger_1.default.error("Similar search error:", error);
    }
    return undefined;
};
exports.getSimilarSearchResults = getSimilarSearchResults;
const clearCache = () => {
    try {
        cache.flushAll();
        (0, exports.resetApiCallsCounter)();
    }
    catch (error) {
        logger_1.default.error("Cache clear error:", error);
    }
};
exports.clearCache = clearCache;
