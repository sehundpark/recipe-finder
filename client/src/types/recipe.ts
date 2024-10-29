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
