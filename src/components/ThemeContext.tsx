import React, { createContext, useState, ReactNode, useContext } from "react";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState("black");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "white" ? "black" : "white"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === "white" ? "theme-white" : "theme-black"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
