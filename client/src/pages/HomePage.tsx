import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Search, ChefHat, Timer, Filter, BookOpen } from "lucide-react";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <HeroSection>
        <Title>Discover & Cook Delicious Recipes</Title>
        <Subtitle>
          Search through thousands of recipes with detailed nutritional
          information and easy-to-follow instructions
        </Subtitle>
        <SearchButton onClick={() => navigate("/recipes")}>
          <Search size={20} />
          Start Searching Recipes
        </SearchButton>
      </HeroSection>

      <FeaturesSection>
        <FeatureCard>
          <IconWrapper>
            <Search size={24} />
          </IconWrapper>
          <FeatureTitle>Smart Search</FeatureTitle>
          <FeatureDescription>
            Find recipes by ingredients, cuisine type, or dietary preferences
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <IconWrapper>
            <Filter size={24} />
          </IconWrapper>
          <FeatureTitle>Advanced Filters</FeatureTitle>
          <FeatureDescription>
            Filter by dietary restrictions, cooking time, and nutritional
            content
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <IconWrapper>
            <Timer size={24} />
          </IconWrapper>
          <FeatureTitle>Preparation Time</FeatureTitle>
          <FeatureDescription>
            See detailed preparation and cooking times for better planning
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <IconWrapper>
            <BookOpen size={24} />
          </IconWrapper>
          <FeatureTitle>Clear Instructions</FeatureTitle>
          <FeatureDescription>
            Step-by-step instructions with ingredient quantities
          </FeatureDescription>
        </FeatureCard>
      </FeaturesSection>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 2rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SearchButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 1rem 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.border};
  }
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: ${({ theme }) => `${theme.colors.primary}15`};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.75rem;
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.5;
`;
