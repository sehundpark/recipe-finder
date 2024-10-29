import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../components/ThemeProvider";
import React from "react";

export const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <NavbarContainer>
      <Navbar>
        <MenuToggle onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </MenuToggle>
        <NavLinks $isOpen={isMenuOpen}>
          <NavItem>
            <NavLink
              to="/"
              $isActive={location.pathname === "/"}
              onClick={toggleMenu}
            >
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/recipes"
              $isActive={location.pathname === "/recipes"}
              onClick={toggleMenu}
            >
              Recipes
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/about"
              $isActive={location.pathname === "/about"}
              onClick={toggleMenu}
            >
              About
            </NavLink>
          </NavItem>
        </NavLinks>
        <ThemeToggle onClick={toggleTheme}>
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </ThemeToggle>
      </Navbar>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.navbar};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Navbar = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuToggle = styled.div`
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;

  span {
    display: block;
    width: 25px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const NavLinks = styled.ul<{ $isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.navbar};
    padding: 1rem;
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    gap: 1rem;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 1rem;
    right: 1rem;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    opacity: ${({ $isActive }) => ($isActive ? "1" : "0")};
    transition: opacity 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => `${theme.colors.primary}10`};

    &::after {
      opacity: 1;
    }
  }

  ${({ $isActive, theme }) =>
    $isActive &&
    `
    color: ${theme.colors.primary};
  `}

  @media (max-width: 768px) {
    display: block;
    padding: 0.75rem 1rem;

    &::after {
      top: 0;
      bottom: 0;
      left: 0;
      width: 4px;
      height: auto;
    }
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => `${theme.colors.primary}10`};
  }
`;
