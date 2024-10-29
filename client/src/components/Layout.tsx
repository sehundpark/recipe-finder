import styled from "styled-components";
import { NavBar } from "../pages/NavBar";
import { Footer } from "../pages/Footer";
import React from "react";

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
  width: 100%;
  padding-top: 14px;
  padding-bottom: 20px;
  position: relative;
`;
