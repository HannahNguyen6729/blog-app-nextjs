'use client';

import React, { useEffect } from 'react';
import { createContext, useState } from 'react';

export const ThemeContext = createContext();

const getThemeFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const value = JSON.parse(localStorage.getItem('isDarkTheme'));

    if (value !== null) {
      return value;
    } else {
      localStorage.setItem('isDarkTheme', JSON.stringify(true));
      return true;
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const initialTheme = getThemeFromLocalStorage();

  const [isDarkTheme, setIsDarkTheme] = useState(initialTheme);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    localStorage.setItem('isDarkTheme', JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={[isDarkTheme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
