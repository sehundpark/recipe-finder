import styled from "styled-components";
import { Mail, Github, Linkedin } from "lucide-react";
import React from "react";

export const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <SocialLinks>
          <SocialLink
            href="https://www.linkedin.com/in/sehun-park-5b280b164"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </SocialLink>
          <SocialLink
            href="https://github.com/sehundpark"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={24} />
          </SocialLink>
          <SocialLink href="mailto:sehunpcodes@gmail.com" aria-label="Email">
            <Mail size={24} />
          </SocialLink>
        </SocialLinks>
        <Copyright>
          © {new Date().getFullYear()} Sehun Park. All rights reserved.
        </Copyright>
      </FooterContainer>
    </FooterSection>
  );
};

const FooterSection = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.navbar};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

const FooterContainer = styled.footer`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    vertical-align: middle;
  }
`;

const Copyright = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.secondary};
`;
