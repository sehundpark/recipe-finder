import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Recipe } from "../types/recipe";
import { searchRecipes } from "../apis/recipeAPI";
import { RecipeSearch } from "../components/RecipeSearch";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeSkeleton } from "../components/RecipeSkeleton";
import { RecipeSort, SortOption } from "../components/RecipeSort";
import { RecipePagination } from "../components/RecipePagination";
import { ApiLimitNotice } from "../components/ApiLimitNotice";

const ITEMS_PER_PAGE = 12;

export const RecipesPage = () => {
  // Search and loading states
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);

  // Sorting states
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "relevance",
    ascending: true,
  });
  const [sortedRecipes, setSortedRecipes] = useState<Recipe[]>([]);

  const handleSearch = async (query: string, filters: any) => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);

    try {
      const results = await searchRecipes(query, filters);
      setRecipes(results);
      setTotalRecipes(results.length);
      setHasSearched(true);
    } catch (err: any) {
      if (err.code === "RATE_LIMIT_EXCEEDED") {
        setError(
          "API rate limit reached (10 calls/minute). Please wait a minute before trying again."
        );
      } else {
        setError("Failed to search recipes. Please try again.");
      }
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Sort recipes whenever sort option changes
  useEffect(() => {
    const sortRecipes = () => {
      const sorted = [...recipes].sort((a, b) => {
        const getValue = (recipe: Recipe, nutrient: string) => {
          return (
            (recipe.totalNutrients?.[nutrient]?.quantity || 0) /
            (recipe.yield || 1)
          );
        };

        let comparison = 0;

        switch (sortConfig.field) {
          case "calories":
            comparison =
              a.calories / (a.yield || 1) - b.calories / (b.yield || 1);
            break;
          case "time":
            comparison = (a.totalTime || 0) - (b.totalTime || 0);
            break;
          case "ingredients":
            comparison =
              (a.ingredients?.length || 0) - (b.ingredients?.length || 0);
            break;
          case "protein":
            comparison = getValue(b, "PROCNT") - getValue(a, "PROCNT");
            break;
          case "fat":
            comparison = getValue(b, "FAT") - getValue(a, "FAT");
            break;
          case "carbs":
            comparison = getValue(b, "CHOCDF") - getValue(a, "CHOCDF");
            break;
          case "fiber":
            comparison = getValue(b, "FIBTG") - getValue(a, "FIBTG");
            break;
          case "sugar":
            comparison = getValue(b, "SUGAR") - getValue(a, "SUGAR");
            break;
          case "servings":
            comparison = (b.yield || 0) - (a.yield || 0);
            break;
          case "protein-cal":
            comparison =
              getValue(b, "PROCNT") / (b.calories / (b.yield || 1)) -
              getValue(a, "PROCNT") / (a.calories / (a.yield || 1));
            break;
          case "fiber-cal":
            comparison =
              getValue(b, "FIBTG") / (b.calories / (b.yield || 1)) -
              getValue(a, "FIBTG") / (a.calories / (a.yield || 1));
            break;
          default: // 'relevance'
            return 0;
        }

        return sortConfig.ascending ? comparison : -comparison;
      });
      setSortedRecipes(sorted);
    };

    sortRecipes();
  }, [recipes, sortConfig]);

  // Get current page's recipes
  const getCurrentPageRecipes = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedRecipes.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(totalRecipes / ITEMS_PER_PAGE);

  return (
    <PageContainer>
      <Header>
        <Title>Recipe Finder</Title>
        <ApiLimitNotice />
      </Header>

      <RecipeSearch onSearch={handleSearch} loading={loading} error={error} />

      {hasSearched && recipes.length > 0 && (
        <RecipeSort onSort={setSortConfig} currentSort={sortConfig} />
      )}

      {loading ? (
        <ResultsGrid>
          {Array.from({ length: 8 }).map((_, index) => (
            <RecipeSkeleton key={index} />
          ))}
        </ResultsGrid>
      ) : recipes.length > 0 ? (
        <>
          <ResultsCount>
            Found {totalRecipes} recipe{totalRecipes !== 1 ? "s" : ""}
          </ResultsCount>

          <ResultsGrid>
            {getCurrentPageRecipes().map((recipe) => (
              <RecipeCard key={recipe.uri} recipe={recipe} />
            ))}
          </ResultsGrid>

          {totalPages > 1 && (
            <RecipePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        hasSearched && (
          <EmptyState>
            No recipes found. Try adjusting your search or filters.
          </EmptyState>
        )
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
  padding: 0 1rem;
  padding-bottom: 6rem;
  min-height: calc(100vh - 64px);
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ResultsCount = styled.div`
  margin: 1rem 0;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.9rem;
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
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  margin-top: 2rem;
`;
