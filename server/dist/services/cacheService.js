"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCache = exports.setCache = exports.getCached = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const config_1 = require("../config");
const logger_1 = __importDefault(require("../utils/logger"));
const cache = new node_cache_1.default({
    stdTTL: config_1.appConfig.cache.ttl,
    checkperiod: config_1.appConfig.cache.ttl * 0.2,
});
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
const setCache = (key, value) => {
    try {
        cache.set(key, value);
    }
    catch (error) {
        logger_1.default.error("Cache set error:", error);
    }
};
exports.setCache = setCache;
const clearCache = () => {
    try {
        cache.flushAll();
    }
    catch (error) {
        logger_1.default.error("Cache clear error:", error);
    }
};
exports.clearCache = clearCache;
