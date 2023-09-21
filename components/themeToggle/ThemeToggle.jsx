'use client';
import React, { useContext } from 'react';

import styles from './themeToggle.module.css';
import Image from 'next/image';
import { ThemeContext } from '@/context/ThemeContextProvider';

const ThemeToggle = () => {
  const [isDarkTheme, toggleTheme] = useContext(ThemeContext);

  return (
    <div
      style={
        isDarkTheme
          ? { backgroundColor: 'white' }
          : { backgroundColor: '#0f172a' }
      }
      onClick={toggleTheme}
      className={styles.container}
    >
      <Image src="/moon.png" alt="moon" width={14} height={14} />
      <div
        className={styles.ball}
        style={
          isDarkTheme
            ? { left: 1, background: '#0f172a' }
            : { right: 1, background: 'white' }
        }
      ></div>
      <Image src="/sun.png" alt="sun" width={14} height={14} />
    </div>
  );
};

export default ThemeToggle;
