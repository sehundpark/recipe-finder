import React from "react";
import styled from "styled-components";

export const AboutPage = () => {
  return (
    <PageContainer>
      <ContentSection>
        <Title>About Recipe Finder</Title>

        <Section>
          <SectionTitle>Project Overview</SectionTitle>
          <Description>
            Recipe Finder is a modern web application built to help users
            discover and explore recipes based on their preferences and dietary
            requirements. This project showcases modern web development
            practices using React, TypeScript, and various other technologies.
          </Description>
        </Section>

        <Section>
          <SectionTitle>Technical Stack</SectionTitle>
          <TechGrid>
            <TechItem>
              <TechName>Frontend</TechName>
              <TechDescription>
                React, TypeScript, Styled Components
              </TechDescription>
            </TechItem>
            <TechItem>
              <TechName>Backend</TechName>
              <TechDescription>Node.js, Express, RESTful API</TechDescription>
            </TechItem>
            <TechItem>
              <TechName>API Integration</TechName>
              <TechDescription>Edamam Recipe API</TechDescription>
            </TechItem>
            <TechItem>
              <TechName>State Management</TechName>
              <TechDescription>React Hooks, Context API</TechDescription>
            </TechItem>
          </TechGrid>
        </Section>

        <Section>
          <SectionTitle>Features</SectionTitle>
          <FeatureList>
            <li>Advanced recipe search with multiple filters</li>
            <li>Detailed nutritional information</li>
            <li>Responsive design for all devices</li>
            <li>Dark mode support</li>
            <li>Performance optimized with caching</li>
          </FeatureList>
        </Section>
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
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.6;
  font-size: 1.1rem;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const TechItem = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.border};
  }
`;

const TechName = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const TechDescription = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.9rem;
  line-height: 1.4;
`;

const FeatureList = styled.ul`
  list-style: inside;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.6;

  li {
    margin-bottom: 0.5rem;
    padding-left: 1rem;
  }
`;
