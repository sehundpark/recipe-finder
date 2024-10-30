import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Recipe } from "../types/recipe";
import { searchRecipes } from "../apis/recipeAPI";
import { RecipeSearch } from "../components/RecipeSearch";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeSkeleton } from "../components/RecipeSkeleton";
import { RecipeSort } from "../components/RecipeSort";
import { RecipePagination } from "../components/RecipePagination";
import { ApiLimitNotice } from "../components/ApiLimitNotice";
import { RenderNotice } from "../components/RenderNotice";

const ITEMS_PER_PAGE = 12;

export const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    field: "relevance" as const,
    ascending: true,
  });
  const [sortedRecipes, setSortedRecipes] = useState<Recipe[]>([]);

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

  const handleSearch = async (query: string, filters: any) => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);

    try {
      const results = await searchRecipes(query, filters);
      setRecipes(results);
      setTotalRecipes(results.length);
      setHasSearched(true);
    } catch (err) {
      setError("Failed to search recipes. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPageRecipes = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedRecipes.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(totalRecipes / ITEMS_PER_PAGE);

  return (
    <PageContainer>
      <ContentSection>
        <Header>
          <Title>Recipe Search</Title>
          <Subtitle>
            Search through our collection of recipes and find your next meal
          </Subtitle>
        </Header>

        <ApiLimitNotice />
        <RenderNotice />

        <SearchSection>
          <RecipeSearch
            onSearch={handleSearch}
            loading={loading}
            error={error}
          />
        </SearchSection>

        {hasSearched && recipes.length > 0 && (
          <SortSection>
            <RecipeSort onSort={setSortConfig} currentSort={sortConfig} />
          </SortSection>
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
              <PaginationSection>
                <RecipePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </PaginationSection>
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
          <EmptyState>
            Start by searching for recipes using the search bar above.
          </EmptyState>
        )}
      </ContentSection>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ContentSection = styled.div`
  padding: 2rem 0 4rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SearchSection = styled.section`
  margin-bottom: 2rem;
`;

const SortSection = styled.section`
  margin-bottom: 2rem;
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
  margin: 2rem 0;
`;

const PaginationSection = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  font-size: 1.1rem;
  margin: 2rem 0;
`;
