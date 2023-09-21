'use client';

import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContextProvider';

const Theme = ({ children }) => {
  const [isDarkTheme] = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return <div className={isDarkTheme ? 'dark' : 'light'}>{children}</div>;
  }
};

export default Theme;
