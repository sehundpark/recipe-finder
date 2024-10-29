import React, { useState } from "react";
import styled from "styled-components";
import { Recipe } from "../types/recipe";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeSearch } from "../components/RecipeSearch";
import { searchRecipes } from "../apis/recipeAPI";

export const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string, filters: any) => {
    setLoading(true);
    setError(null);

    try {
      const results = await searchRecipes(query, filters);
      setRecipes(results);
      setHasSearched(true);
    } catch (err) {
      setError("Failed to search recipes. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <RecipeSearch onSearch={handleSearch} loading={loading} error={error} />

      {recipes.length > 0 && (
        <ResultsGrid>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.uri} recipe={recipe} />
          ))}
        </ResultsGrid>
      )}

      {hasSearched && !loading && recipes.length === 0 && (
        <EmptyState>
          No recipes found. Try adjusting your search or filters.
        </EmptyState>
      )}

      {!hasSearched && !loading && (
        <EmptyState>Search for recipes to get started!</EmptyState>
      )}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.1rem;
`;
