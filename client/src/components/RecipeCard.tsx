import React from "react";
import styled from "styled-components";
import { Clock, Users, Scale, ChefHat, Heart } from "lucide-react";
import { Recipe } from "../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const calories = Math.round(recipe.calories / recipe.yield);
  const nutrients = recipe.totalNutrients;

  return (
    <Card>
      <ImageContainer>
        <RecipeImage src={recipe.image} alt={recipe.label} loading="lazy" />
        {recipe.source && <SourceTag>{recipe.source}</SourceTag>}
      </ImageContainer>

      <CardContent>
        <Title>{recipe.label}</Title>

        <MetaInfo>
          <MetaItem title="Servings">
            <Users size={16} />
            <span>Serves {recipe.yield}</span>
          </MetaItem>
          <MetaItem title="Calories per serving">
            <ChefHat size={16} />
            <span>{calories} cal</span>
          </MetaItem>
          {nutrients?.PROCNT && (
            <MetaItem title="Protein per serving">
              <Scale size={16} />
              <span>
                {Math.round(nutrients.PROCNT.quantity / recipe.yield)}
                {nutrients.PROCNT.unit}
              </span>
            </MetaItem>
          )}
        </MetaInfo>

        <Tags>
          {recipe.dietLabels?.map((label) => (
            <Tag key={label} $type="diet" title="Diet Label">
              {label}
            </Tag>
          ))}
          {recipe.healthLabels?.slice(0, 3).map((label) => (
            <Tag key={label} $type="health" title="Health Label">
              {label}
            </Tag>
          ))}
          {recipe.cuisineType?.map((cuisine) => (
            <Tag key={cuisine} $type="cuisine" title="Cuisine Type">
              {cuisine}
            </Tag>
          ))}
        </Tags>

        <IngredientCount>
          <Heart size={16} />
          {recipe.ingredientLines.length} ingredients
        </IngredientCount>

        <ActionButtons>
          <ViewButton
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Recipe
          </ViewButton>
        </ActionButtons>
      </CardContent>
    </Card>
  );
};

const Card = styled.article`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => `${theme.colors.border}80`};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 66.67%; /* 3:2 aspect ratio */
  background: ${({ theme }) => theme.colors.border};
`;

const RecipeImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const SourceTag = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  backdrop-filter: blur(4px);
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 2.75rem;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.85rem;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  min-height: 3.5rem;
`;

const Tag = styled.span<{ $type: "diet" | "health" | "cuisine" }>`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  background: ${({ theme, $type }) => {
    switch ($type) {
      case "diet":
        return `${theme.colors.primary}20`;
      case "health":
        return "#4caf5020";
      case "cuisine":
        return "#ff980020";
      default:
        return theme.colors.border;
    }
  }};
  color: ${({ theme, $type }) => {
    switch ($type) {
      case "diet":
        return theme.colors.primary;
      case "health":
        return "#4caf50";
      case "cuisine":
        return "#ff9800";
      default:
        return theme.colors.text;
    }
  }};
`;

const IngredientCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.85rem;
  margin-bottom: 1rem;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ViewButton = styled.a`
  flex: 1;
  padding: 0.75rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
