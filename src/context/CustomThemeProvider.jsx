import React, { createContext, useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getItem, setItem } from "../utils/localStorageUtils";

export const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  // Initialize from localStorage or fallback to defaults
  const [mode, setMode] = useState(() => getItem("appMode") || "light");
  const [primaryColor, setPrimaryColor] = useState(() => getItem("primaryColor") || "#1976d2");

  
  useEffect(() => {
    setItem("appMode", mode);
    setItem("primaryColor", primaryColor);
  }, [mode, primaryColor]);

  // Create theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: primaryColor },
          background: {
            default: mode === "light" ? "#eef4f8ff" : "#121212",
            paper: mode === "light" ? "#fff" : "#1e1e1e",
          },
          text: {
            primary: mode === "light" ? "#000000" : "#ffffff",
            secondary: mode === "light" ? "#555555" : "#c1c0c0ff",
          },
        },
      }),
    [mode, primaryColor]
  );

  return (
    <ThemeContext.Provider value={{ mode, setMode, primaryColor, setPrimaryColor }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
