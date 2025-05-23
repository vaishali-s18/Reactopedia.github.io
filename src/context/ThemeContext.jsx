import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div className={`${darkMode ? 'dark' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);