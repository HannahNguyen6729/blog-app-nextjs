import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './navbar.module.css';
import facebook from '../../../public/facebook.png';
import instagram from '../../../public/instagram.png';
import tiktok from '../../../public/tiktok.png';
import youtube from '../../../public/youtube.png';
import ThemeToggle from '../themeToggle/ThemeToggle';
import AuthLinks from '../authLinks/AuthLinks';

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}> Hannah Blog</div>
      <div className={styles.social}>
        <Image src={facebook} width={24} height={24} alt="facebook" />
        <Image src={instagram} width={24} height={24} alt="instagram" />
        <Image src={tiktok} width={24} height={24} alt="tiktok" />
        <Image src={youtube} width={24} height={24} alt="youtube" />
      </div>

      <div className={styles.links}>
        <ThemeToggle />
        <Link href="/" className={styles.links}>
          Homepage
        </Link>
        <Link href="/" className={styles.links}>
          Contact
        </Link>
        <Link href="/" className={styles.links}>
          About
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
