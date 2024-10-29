export interface Recipe {
  uri: string;
  label: string;
  image: string;
  source: string;
  url: string;
  yield: number;
  calories: number;
  totalWeight: number;
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: {
    text: string;
    weight: number;
    food: string;
    foodCategory: string;
    foodId: string;
    image: string;
  }[];
  totalNutrients: {
    [key: string]: {
      label: string;
      quantity: number;
      unit: string;
    };
  };
}

export interface FilterOptions {
  healthLabels: string[];
  cuisineTypes: string[];
  mealTypes: string[];
  dishTypes: string[];
  dietLabels: string[];
}

export interface SearchFilters {
  cuisineType?: string;
  mealType?: string;
  dishType?: string;
  diet?: string;
  health?: string[];
  excluded?: string[];
}

const APP_ID = "f67b9c0b";
const APP_KEY = "0a3ff5420cca2e87928689508491fb93";
const BASE_URL = "https://api.edamam.com/api/recipes/v2";

export const getFilterOptions = async (): Promise<FilterOptions> => {
  try {
    const params = new URLSearchParams({
      type: "public",
      q: "chicken", // Using a common term to get variety of options
      app_id: APP_ID,
      app_key: APP_KEY,
    });

    const response = await fetch(`${BASE_URL}?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      healthLabels: [
        ...new Set(
          data.hits.flatMap(
            (hit: { recipe: Recipe }) => hit.recipe.healthLabels
          )
        ),
      ].sort(),
      cuisineTypes: [
        ...new Set(
          data.hits.flatMap((hit: { recipe: Recipe }) => hit.recipe.cuisineType)
        ),
      ].sort(),
      mealTypes: [
        ...new Set(
          data.hits.flatMap((hit: { recipe: Recipe }) => hit.recipe.mealType)
        ),
      ].sort(),
      dishTypes: [
        ...new Set(
          data.hits.flatMap((hit: { recipe: Recipe }) => hit.recipe.dishType)
        ),
      ].sort(),
      dietLabels: [
        ...new Set(
          data.hits.flatMap((hit: { recipe: Recipe }) => hit.recipe.dietLabels)
        ),
      ].sort(),
    };
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return {
      healthLabels: [],
      cuisineTypes: [],
      mealTypes: [],
      dishTypes: [],
      dietLabels: [],
    };
  }
};

export const searchRecipes = async (
  query: string,
  filters?: SearchFilters
): Promise<Recipe[]> => {
  try {
    const params = new URLSearchParams({
      type: "public",
      q: query,
      app_id: APP_ID,
      app_key: APP_KEY,
    });

    if (filters?.cuisineType) params.append("cuisineType", filters.cuisineType);
    if (filters?.mealType) params.append("mealType", filters.mealType);
    if (filters?.dishType) params.append("dishType", filters.dishType);
    if (filters?.diet) params.append("diet", filters.diet);
    filters?.health?.forEach((health) => params.append("health", health));
    filters?.excluded?.forEach((excluded) =>
      params.append("excluded", excluded)
    );

    const response = await fetch(`${BASE_URL}?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.hits.map((hit: { recipe: Recipe }) => hit.recipe);
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw error;
  }
};
