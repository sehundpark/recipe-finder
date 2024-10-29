import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Search, Filter, X } from "lucide-react";
import { getFilterOptions } from "../apis/recipeAPI";
import { FilterOptions } from "../types/recipe";

interface RecipeSearchProps {
  onSearch: (query: string, filters: any) => void;
  loading: boolean;
  error: string | null;
}

export const RecipeSearch = ({
  onSearch,
  loading,
  error,
}: RecipeSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(
    null
  );
  const [selectedFilters, setSelectedFilters] = useState({
    cuisineType: "",
    mealType: "",
    dishType: "",
    diet: "",
    health: [] as string[],
  });

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const options = await getFilterOptions();
        setFilterOptions(options);
      } catch (err) {
        console.error("Error loading filters:", err);
      }
    };
    loadFilters();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const activeFilters = Object.fromEntries(
      Object.entries(selectedFilters).filter(([_, value]) =>
        Array.isArray(value) ? value.length > 0 : value !== ""
      )
    );

    onSearch(searchQuery, activeFilters);
  };

  const toggleFilter = (type: string, value: string) => {
    if (type === "health") {
      setSelectedFilters((prev) => ({
        ...prev,
        health: prev.health.includes(value)
          ? prev.health.filter((item) => item !== value)
          : [...prev.health, value],
      }));
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        [type]: prev[type as keyof typeof prev] === value ? "" : value,
      }));
    }
  };

  const clearFilters = () => {
    setSelectedFilters({
      cuisineType: "",
      mealType: "",
      dishType: "",
      diet: "",
      health: [],
    });
  };

  return (
    <SearchSection>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInputWrapper>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes..."
            disabled={loading}
          />
          <SearchButton type="submit" disabled={loading}>
            <Search size={20} />
            {loading ? "Searching..." : "Search"}
          </SearchButton>
          <FilterButton
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            $active={
              showFilters ||
              Object.values(selectedFilters).some((v) =>
                Array.isArray(v) ? v.length > 0 : v !== ""
              )
            }
          >
            <Filter size={20} />
            Filters
          </FilterButton>
        </SearchInputWrapper>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {showFilters && filterOptions && (
          <FiltersPanel>
            <FilterHeader>
              <FilterTitle>Filters</FilterTitle>
              <ClearButton onClick={clearFilters}>
                <X size={16} />
                Clear all
              </ClearButton>
            </FilterHeader>

            <FilterGrid>
              <FilterSection>
                <FilterLabel>Cuisine Type</FilterLabel>
                <FilterChipContainer>
                  {filterOptions.cuisineTypes.map((cuisine) => (
                    <FilterChip
                      key={cuisine}
                      onClick={() => toggleFilter("cuisineType", cuisine)}
                      $selected={selectedFilters.cuisineType === cuisine}
                    >
                      {cuisine}
                    </FilterChip>
                  ))}
                </FilterChipContainer>
              </FilterSection>

              <FilterSection>
                <FilterLabel>Meal Type</FilterLabel>
                <FilterChipContainer>
                  {filterOptions.mealTypes.map((meal) => (
                    <FilterChip
                      key={meal}
                      onClick={() => toggleFilter("mealType", meal)}
                      $selected={selectedFilters.mealType === meal}
                    >
                      {meal}
                    </FilterChip>
                  ))}
                </FilterChipContainer>
              </FilterSection>

              <FilterSection>
                <FilterLabel>Diet</FilterLabel>
                <FilterChipContainer>
                  {filterOptions.dietLabels.map((diet) => (
                    <FilterChip
                      key={diet}
                      onClick={() => toggleFilter("diet", diet)}
                      $selected={selectedFilters.diet === diet}
                    >
                      {diet}
                    </FilterChip>
                  ))}
                </FilterChipContainer>
              </FilterSection>

              <FilterSection>
                <FilterLabel>Health Labels</FilterLabel>
                <FilterChipContainer>
                  {filterOptions.healthLabels.map((health) => (
                    <FilterChip
                      key={health}
                      onClick={() => toggleFilter("health", health)}
                      $selected={selectedFilters.health.includes(health)}
                    >
                      {health}
                    </FilterChip>
                  ))}
                </FilterChipContainer>
              </FilterSection>
            </FilterGrid>
          </FiltersPanel>
        )}
      </SearchForm>
    </SearchSection>
  );
};

const SearchSection = styled.div`
  margin-bottom: 2rem;
`;

const SearchForm = styled.form`
  width: 100%;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchButton = styled(Button)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

const FilterButton = styled(Button)<{ $active: boolean }>`
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : "transparent"};
  color: ${({ theme, $active }) => ($active ? "white" : theme.colors.text)};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.border};

  &:hover:not(:disabled) {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary : `${theme.colors.primary}10`};
  }
`;

const FiltersPanel = styled.div`
  margin-top: 1rem;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.background};
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const FilterTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FilterLabel = styled.h4`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const FilterChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterChip = styled.button<{ $selected: boolean }>`
  padding: 0.5rem 1rem;
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : "transparent"};
  color: ${({ theme, $selected }) => ($selected ? "white" : theme.colors.text)};
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.primary : theme.colors.border};
  border-radius: 2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, $selected }) =>
      $selected ? theme.colors.primary : `${theme.colors.primary}10`};
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  background-color: #dc354510;
  text-align: center;
`;
