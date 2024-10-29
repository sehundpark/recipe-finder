import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "../components/ThemeContext";

export const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <NavbarList>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/recipes" onClick={toggleMenu}>
              Recipes
            </Link>
            <Link to="/about" onClick={toggleMenu}>
              About
            </Link>
          </NavbarList>
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
  }
`;

const NavbarList = styled.li`
  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
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

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
