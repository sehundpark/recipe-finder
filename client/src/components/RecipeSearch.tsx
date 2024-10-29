import React, { useState } from "react";
import styled from "styled-components";
import { Search, Filter } from "lucide-react";

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
  const [filters, setFilters] = useState({
    cuisineType: "",
    mealType: "",
    dishType: "",
    health: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) =>
        Array.isArray(value) ? value.length > 0 : value !== ""
      )
    );

    onSearch(searchQuery, activeFilters);
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
            $active={showFilters}
          >
            <Filter size={20} />
            Filters
          </FilterButton>
        </SearchInputWrapper>

        {error && <ErrorMessage>{error}</ErrorMessage>}
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

const ErrorMessage = styled.div`
  color: #dc3545;
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  background-color: #dc354510;
  text-align: center;
`;
