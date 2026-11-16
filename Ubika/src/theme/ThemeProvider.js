import React, { createContext, useState, useContext } from "react";

// Define tus temas
const lightTheme = {
  colors: {
    primary: "#E10012",
    secondary: "#FEFFF5",
    tertiary: "#2E4057",

    text: "#2E4057",
    textSecondary: "#666666",

    buttonText: "#FEFFF5",

    background: "#FEFFF5",
    card: "#FFFFFF",
    border: "#E5E5E5",

    gradientStart: "#E10012",
    gradientEnd: "#2E4057",
  },
};

const darkTheme = {
  colors: {
    primary: "#FF4D4D",
    secondary: "#1E1E1E",
    tertiary: "#555555",

    text: "#FEFFF5",
    textSecondary: "#AAAAAA",

    buttonText: "#FEFFF5",

    background: "#121212",
    card: "#1E1E1E",
    border: "#333333",

    gradientStart: "#FF4D4D",
    gradientEnd: "#3B4E6B",
  },
};

// Crear contexto
const ThemeContext = createContext();

// ThemeProvider funcional
export default function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook para usar el tema
export const useTheme = () => useContext(ThemeContext);
