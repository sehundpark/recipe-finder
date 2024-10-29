import styled from "styled-components";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Recipe App</FooterTitle>
          <FooterText>
            Discover and save your favorite recipes from around the world.
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLinks>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/recipes">Recipes</FooterLink>
            <FooterLink to="/about">About</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Connect</FooterTitle>
          <FooterLinks>
            <FooterExternalLink
              href="https://github.com/sehundpark"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </FooterExternalLink>
            <FooterExternalLink
              href="https://www.linkedin.com/in/sehun-park-5b280b164/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </FooterExternalLink>
          </FooterLinks>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>© {currentYear} Recipe App. All rights reserved.</Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.navbar};
  color: ${({ theme }) => theme.colors.text};
  padding: 2rem 0;
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
`;

const Copyright = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary};
`;
