import { createContext, useState, useEffect, ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

interface ThemeProps {
  mode: "light" | "dark";
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    navbar: string;
    border: string;
  };
}

const lightTheme: ThemeProps = {
  mode: "light",
  colors: {
    background: "#ffffff",
    text: "#333333",
    primary: "#007bff",
    secondary: "#6c757d",
    navbar: "#ffffff",
    border: "#e1e1e1",
  },
};

const darkTheme: ThemeProps = {
  mode: "dark",
  colors: {
    background: "#121212",
    text: "#ffffff",
    primary: "#0096ff",
    secondary: "#909090",
    navbar: "#1a1a1a",
    border: "#2d2d2d",
  },
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => null,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
