import { Recipe, FilterOptions, SearchFilters } from "../types/recipe";
import { config } from "../config";

const API_BASE_URL = config.apiBaseUrl;

const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  retries = 3
) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      // Wait 1 second before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};

export const getFilterOptions = async (): Promise<FilterOptions> => {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/recipes/filters`);
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

    const response = await fetchWithRetry(
      `${API_BASE_URL}/recipes/search?${params}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw error;
  }
};
