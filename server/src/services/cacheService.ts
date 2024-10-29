import NodeCache from "node-cache";
import { appConfig } from "../config";
import logger from "../utils/logger";

const cache = new NodeCache({
  stdTTL: appConfig.cache.ttl,
  checkperiod: appConfig.cache.ttl * 0.2,
});

export const getCached = <T>(key: string): T | undefined => {
  try {
    return cache.get<T>(key);
  } catch (error) {
    logger.error("Cache get error:", error);
    return undefined;
  }
};

export const setCache = <T>(key: string, value: T): void => {
  try {
    cache.set(key, value);
  } catch (error) {
    logger.error("Cache set error:", error);
  }
};

export const clearCache = (): void => {
  try {
    cache.flushAll();
  } catch (error) {
    logger.error("Cache clear error:", error);
  }
};
