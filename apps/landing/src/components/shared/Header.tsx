'use client';

import React from 'react';
import Link from 'next/link';

import { getLoginUrl, getSignupUrl } from '@/lib/auth';
import styles from './Header.module.css';

export const Header = (): React.JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            PeakHealth
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link href="/features" className={styles.navLink}>
            Features
          </Link>
          <Link href="/roadmap" className={styles.navLink}>
            Roadmap
          </Link>
          <Link href="/feedback" className={styles.navLink}>
            Feedback
          </Link>
          <Link href="/blog" className={styles.navLink}>
            Blog
          </Link>
        </nav>

        <div className={styles.actions}>
          <Link href={getLoginUrl()} className={styles.signInLink}>
            Sign In
          </Link>
          <Link href={getSignupUrl()} className={styles.signUpLink}>
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};
