import { Recipe, FilterOptions, SearchFilters } from "../types/recipe";

const API_BASE_URL = "http://localhost:3001/api";

export const getFilterOptions = async (): Promise<FilterOptions> => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes/filters`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching filter options:", error);
    throw error;
  }
};

export const searchRecipes = async (
  query: string,
  filters?: SearchFilters
): Promise<Recipe[]> => {
  try {
    const params = new URLSearchParams({ query });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else if (value) {
          params.append(key, value);
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/recipes/search?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw error;
  }
};
