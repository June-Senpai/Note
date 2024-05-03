import { useState, useEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    switch (theme) {
      case "dark":
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        setTheme(prefersDarkMode ? "dark" : "light");
        break;
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const setSystemTheme = () => {
    setTheme("system");
  };

  return { theme, toggleTheme, setSystemTheme, setTheme };
};
