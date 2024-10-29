import NodeCache from "node-cache";
import { appConfig } from "../config";
import logger from "../utils/logger";
import { Recipe, FilterOptions } from "../types/recipe";

// Separate TTLs for different types of data
const CACHE_TTLS = {
  FILTER_OPTIONS: 24 * 60 * 60, // 24 hours for filter options
  SEARCH_RESULTS: 60 * 60, // 1 hour for search results
  FAILED_SEARCHES: 5 * 60, // 5 minutes for failed searches to prevent repeated failures
} as const;

const cache = new NodeCache({
  stdTTL: CACHE_TTLS.SEARCH_RESULTS,
  checkperiod: 600, // Check for expired keys every 10 minutes
  useClones: false, // Disable cloning for better performance
});

// Keep track of API calls
const apiCallsCounter = {
  timestamp: Date.now(),
  count: 0,
};

export const resetApiCallsCounter = () => {
  apiCallsCounter.count = 0;
  apiCallsCounter.timestamp = Date.now();
};

// Check if we're within API rate limits
export const canMakeApiCall = (): boolean => {
  const now = Date.now();
  const oneMinute = 60 * 1000;

  // Reset counter if it's been more than a minute
  if (now - apiCallsCounter.timestamp >= oneMinute) {
    resetApiCallsCounter();
    return true;
  }

  return apiCallsCounter.count < 10;
};

export const incrementApiCounter = () => {
  apiCallsCounter.count++;
};

export const getCached = <T>(key: string): T | undefined => {
  try {
    return cache.get<T>(key);
  } catch (error) {
    logger.error("Cache get error:", error);
    return undefined;
  }
};

export const setCache = <T>(key: string, value: T, ttl?: number): void => {
  try {
    const customTtl =
      ttl ||
      (key.startsWith("filter_options")
        ? CACHE_TTLS.FILTER_OPTIONS
        : CACHE_TTLS.SEARCH_RESULTS);

    cache.set(key, value, customTtl);
  } catch (error) {
    logger.error("Cache set error:", error);
  }
};

// Cache failed searches to prevent hammering the API with bad queries
export const setFailedSearchCache = (key: string): void => {
  try {
    cache.set(key, [], CACHE_TTLS.FAILED_SEARCHES);
  } catch (error) {
    logger.error("Failed search cache set error:", error);
  }
};

// Get similar cached searches
export const getSimilarSearchResults = (
  query: string,
  filters: any
): Recipe[] | undefined => {
  try {
    // Get all cache keys
    const keys = cache.keys();

    // Look for similar searches
    for (const key of keys) {
      if (!key.startsWith("search_")) continue;

      const [, cachedQuery, cachedFilters] = key.split("_");

      // Check if queries are similar (case insensitive, partial match)
      const querySimilar =
        query.toLowerCase().includes(cachedQuery.toLowerCase()) ||
        cachedQuery.toLowerCase().includes(query.toLowerCase());

      // Check if filters are similar (at least main filters match)
      const filtersSimilar =
        filters.cuisineType === JSON.parse(cachedFilters).cuisineType &&
        filters.mealType === JSON.parse(cachedFilters).mealType;

      if (querySimilar && filtersSimilar) {
        const results = cache.get<Recipe[]>(key);
        if (results && results.length > 0) {
          logger.debug("Returning similar cached results");
          return results;
        }
      }
    }
  } catch (error) {
    logger.error("Similar search error:", error);
  }
  return undefined;
};

export const clearCache = (): void => {
  try {
    cache.flushAll();
    resetApiCallsCounter();
  } catch (error) {
    logger.error("Cache clear error:", error);
  }
};
