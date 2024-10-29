import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const themes = {
  light: {
    mode: "light" as const,
    colors: {
      background: "#ffffff",
      text: "#333333",
      primary: "#007bff",
      secondary: "#6c757d",
      navbar: "#ffffff",
      border: "#e1e1e1",
    },
  },
  dark: {
    mode: "dark" as const,
    colors: {
      background: "#121212",
      text: "#ffffff",
      primary: "#0096ff",
      secondary: "#909090",
      navbar: "#1a1a1a",
      border: "#2d2d2d",
    },
  },
} as const;

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getInitialTheme = (): ThemeMode => {
    const savedTheme = localStorage.getItem("theme") as ThemeMode;
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    document.documentElement.style.setProperty("color-scheme", theme);

    document.body.style.backgroundColor = themes[theme].colors.background;
    document.body.style.color = themes[theme].colors.text;
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={themes[theme]}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
