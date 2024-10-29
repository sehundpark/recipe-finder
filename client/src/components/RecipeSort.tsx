import React from "react";
import styled from "styled-components";
import { ArrowUpDown, ArrowUpIcon, ArrowDownIcon } from "lucide-react";

export type SortField =
  | "relevance"
  | "calories"
  | "time"
  | "ingredients"
  | "protein"
  | "fat"
  | "carbs"
  | "fiber"
  | "sugar"
  | "servings"
  | "protein-cal" // Protein per calorie (for high protein, low cal)
  | "fiber-cal"; // Fiber per calorie (for filling, low cal)

interface SortConfig {
  field: SortField;
  ascending: boolean;
}

interface RecipeSortProps {
  onSort: (config: SortConfig) => void;
  currentSort: SortConfig;
}

export const RecipeSort = ({ onSort, currentSort }: RecipeSortProps) => {
  const handleSortClick = (field: SortField) => {
    if (currentSort.field === field) {
      // Toggle direction if same field
      onSort({ field, ascending: !currentSort.ascending });
    } else {
      // Default to appropriate direction for new field
      const ascending = field === "time" || field === "ingredients";
      onSort({ field, ascending });
    }
  };

  const getDirectionIcon = (field: SortField) => {
    if (currentSort.field !== field) {
      return <ArrowUpDown size={16} />;
    }
    return currentSort.ascending ? (
      <ArrowUpIcon size={16} />
    ) : (
      <ArrowDownIcon size={16} />
    );
  };

  return (
    <SortContainer>
      <SortLabel>Sort by:</SortLabel>
      <SortOptions>
        <SortGroup>
          <GroupLabel>Basic</GroupLabel>
          <ButtonGroup>
            <SortButton
              onClick={() => handleSortClick("relevance")}
              $active={currentSort.field === "relevance"}
              title="Sort by API relevance"
            >
              Relevance {getDirectionIcon("relevance")}
            </SortButton>
            <SortButton
              onClick={() => handleSortClick("time")}
              $active={currentSort.field === "time"}
              title="Sort by preparation time"
            >
              Time {getDirectionIcon("time")}
            </SortButton>
            <SortButton
              onClick={() => handleSortClick("ingredients")}
              $active={currentSort.field === "ingredients"}
              title="Sort by number of ingredients"
            >
              Ingredients {getDirectionIcon("ingredients")}
            </SortButton>
            <SortButton
              onClick={() => handleSortClick("servings")}
              $active={currentSort.field === "servings"}
              title="Sort by number of servings"
            >
              Servings {getDirectionIcon("servings")}
            </SortButton>
          </ButtonGroup>
        </SortGroup>

        <SortGroup>
          <GroupLabel>Nutrition (per serving)</GroupLabel>
          <ButtonGroup>
            <SortButton
              onClick={() => handleSortClick("calories")}
              $active={currentSort.field === "calories"}
              title="Sort by calories per serving"
            >
              Calories {getDirectionIcon("calories")}
            </SortButton>
            <SortButton
              onClick={() => handleSortClick("protein")}
              $active={currentSort.field === "protein"}
              title="Sort by protein content"
            >
              Protein {getDirectionIcon("protein")}
            </SortButton>
            <SortButton
              onClick={() => handleSortClick("fat")}
              $active={currentSort.field === "fat"}
              title="Sort by fat content"
            >
              Fat {getDirectionIcon("fat")}
            </SortButton>
            <SortButton
              onClick={() => handleSortClick("carbs")}
              $active={currentSort.field === "carbs"}
              title="Sort by carbohydrate content"
            >
              Carbs {getDirectionIcon("carbs")}
            </SortButton>
            <SortButton
              onClick={() => handleSortClick("fiber")}
              $active={currentSort.field === "fiber"}
              title="Sort by fiber content"
            >
              Fiber {getDirectionIcon("fiber")}
            </SortButton>
            <SortButton
              onClick={() => handleSortClick("sugar")}
              $active={currentSort.field === "sugar"}
              title="Sort by sugar content"
            >
              Sugar {getDirectionIcon("sugar")}
            </SortButton>
          </ButtonGroup>
        </SortGroup>

        <SortGroup>
          <GroupLabel>Combined Metrics</GroupLabel>
          <ButtonGroup>
            <SortButton
              onClick={() => handleSortClick("protein-cal")}
              $active={currentSort.field === "protein-cal"}
              title="Sort by protein per calorie (high protein, lower calories)"
            >
              Protein/Cal Ratio {getDirectionIcon("protein-cal")}
            </SortButton>
            <SortButton
              onClick={() => handleSortClick("fiber-cal")}
              $active={currentSort.field === "fiber-cal"}
              title="Sort by fiber per calorie (filling, lower calories)"
            >
              Fiber/Cal Ratio {getDirectionIcon("fiber-cal")}
            </SortButton>
          </ButtonGroup>
        </SortGroup>
      </SortOptions>
    </SortContainer>
  );
};

const SortContainer = styled.div`
  margin: 1rem 0;
`;

const SortLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 0.5rem;
`;

const SortOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SortGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const GroupLabel = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SortButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : "transparent"};
  color: ${({ theme, $active }) => ($active ? "white" : theme.colors.text)};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.border};
  border-radius: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary : `${theme.colors.primary}10`};
  }

  svg {
    opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  }
`;
