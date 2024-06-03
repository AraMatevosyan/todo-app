import React, { PropsWithChildren, useContext, useState } from "react";

import { themes, Theme } from "./themes";

type ThemeContextType = {
  currentTheme: Theme;
  switchTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextType>({
  currentTheme: themes.light,
  switchTheme: () => {},
});

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.light);

  const switchTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === themes.light ? themes.dark : themes.light,
    );
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
