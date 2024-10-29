import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { validateSearch } from "../middleware";
import { getFilterOptions, searchRecipes } from "../services/recipeService";
import logger from "../utils/logger";
import { SearchFilters } from "../types/recipe";
import { ParsedQs } from "qs";

const router = Router();

interface SearchQueryParams extends ParsedQs {
  query: string;
  cuisineType?: string;
  mealType?: string;
  dishType?: string;
  diet?: string;
  health?: string | string[];
  excluded?: string | string[];
}

router.get(
  "/filters",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.debug("Fetching filter options");
      const filters = await getFilterOptions();
      res.json(filters);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/search",
  validateSearch,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query, ...rest } = req.query as SearchQueryParams;

      logger.debug("Searching recipes", { query, filters: rest });

      const filters: SearchFilters = {
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

      const recipes = await searchRecipes(query, filters);
      res.json(recipes);
    } catch (error) {
      next(error);
    }
  }
);

// Health check endpoint
router.get("/health", (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ status: "healthy" });
});

export { router as recipeRoutes };
