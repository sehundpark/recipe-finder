import styled from "styled-components";
import { NavBar } from "../pages/NavBar";
import { Footer } from "../pages/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <NavBar />
      <MainContent>{children}</MainContent>
      <Footer />
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 64px; // Height of the navbar
  padding-bottom: 120px; // Height of the footer + extra space
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
`;
