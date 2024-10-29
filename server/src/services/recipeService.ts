import fetch from "node-fetch";
import {
  FilterOptions,
  Recipe,
  SearchFilters,
  ApiError,
} from "../types/recipe";
import { appConfig } from "../config";
import logger from "../utils/logger";
import { getCached, setCache } from "./cacheService";

interface EdamamRecipeHit {
  recipe: {
    healthLabels: string[];
    cuisineType: string[];
    mealType: string[];
    dishType: string[];
    dietLabels: string[];
  };
}

interface EdamamResponse {
  hits: EdamamRecipeHit[];
}

export const getFilterOptions = async (): Promise<FilterOptions> => {
  try {
    const cacheKey = "filter_options";
    const cachedData = getCached<FilterOptions>(cacheKey);

    if (cachedData) {
      logger.debug("Returning cached filter options");
      return cachedData;
    }

    const params = new URLSearchParams({
      type: "public",
      q: "chicken",
      app_id: appConfig.edamam.appId,
      app_key: appConfig.edamam.appKey,
    });

    const response = await fetch(`${appConfig.edamam.baseUrl}?${params}`);
    if (!response.ok) {
      throw Object.assign(new Error("Failed to fetch filter options"), {
        status: response.status,
      });
    }

    const data = (await response.json()) as EdamamResponse;

    const filterOptions: FilterOptions = {
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

    setCache(cacheKey, filterOptions);
    return filterOptions;
  } catch (error) {
    logger.error("Error fetching filter options:", error);
    throw error;
  }
};

export const searchRecipes = async (
  query: string,
  filters?: SearchFilters
): Promise<Recipe[]> => {
  try {
    const cacheKey = `search_${query}_${JSON.stringify(filters)}`;
    const cachedData = getCached<Recipe[]>(cacheKey);

    if (cachedData) {
      logger.debug("Returning cached search results");
      return cachedData;
    }

    const params = new URLSearchParams({
      type: "public",
      q: query,
      app_id: appConfig.edamam.appId,
      app_key: appConfig.edamam.appKey,
    });

    if (filters?.cuisineType) params.append("cuisineType", filters.cuisineType);
    if (filters?.mealType) params.append("mealType", filters.mealType);
    if (filters?.dishType) params.append("dishType", filters.dishType);
    if (filters?.diet) params.append("diet", filters.diet);
    if (filters?.health) {
      filters.health.forEach((health) => params.append("health", health));
    }
    if (filters?.excluded) {
      filters.excluded.forEach((excluded) =>
        params.append("excluded", excluded)
      );
    }

    const response = await fetch(`${appConfig.edamam.baseUrl}?${params}`);
    if (!response.ok) {
      throw Object.assign(new Error("Failed to fetch recipes"), {
        status: response.status,
      });
    }

    const data = (await response.json()) as { hits: { recipe: Recipe }[] };
    const recipes = data.hits.map((hit) => hit.recipe);

    setCache(cacheKey, recipes);
    return recipes;
  } catch (error) {
    logger.error("Error searching recipes:", error);
    throw error;
  }
};
