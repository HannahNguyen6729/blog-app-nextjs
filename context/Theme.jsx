'use client';

import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContextProvider';

const Theme = ({ children }) => {
  const [isDarkTheme] = useContext(ThemeContext);
  console.log({ isdark: isDarkTheme });
  return <div className={isDarkTheme ? 'dark' : 'light'}>{children}</div>;
};

export default Theme;
