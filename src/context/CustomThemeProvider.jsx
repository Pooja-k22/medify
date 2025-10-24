import React, { createContext, useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getItem, setItem } from "../utils/localStorageUtils";

export const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => getItem("appMode") || "light");
  const [primaryColor, setPrimaryColor] = useState(
    () => getItem("primaryColor") || "#1976d2"
  );

  useEffect(() => {
    setItem("appMode", mode);
    setItem("primaryColor", primaryColor);
  }, [mode, primaryColor]);

  // theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: primaryColor },
          background: {
            default: mode === "light" ? "#ffffffff" :"#1e1e1e" ,
            paper: mode === "light" ? "#eef4f8ff" :  "#121212",
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
    <ThemeContext.Provider
      value={{ mode, setMode, primaryColor, setPrimaryColor }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
