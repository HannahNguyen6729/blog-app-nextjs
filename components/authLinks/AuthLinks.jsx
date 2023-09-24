'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

import styles from './authLinks.module.css';

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  return (
    <div>
      {status !== 'authenticated' ? (
        <Link href="/login">Login</Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <span className={styles.lastLink} onClick={() => signOut()}>
            Log out
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Homepage</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {status !== 'authenticated' ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <Link href="/write" className={styles.link}>
                Write
              </Link>
              <span onClick={() => signOut()} className={styles.lastLink}>
                Logout
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthLinks;
