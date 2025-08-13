'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import styles from './Header.module.css';

import { getSignupUrl, getLoginUrl } from '@/lib/auth';
import { Button } from '@peakhealth/ui';

export const Header = (): React.JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            Peak Health
          </Link>
        </div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link href="/features" className={styles.navLink}>
            Features
          </Link>
          <Link href="/pricing" className={styles.navLink}>
            Pricing
          </Link>
          <Link href="/blog" className={styles.navLink}>
            Blog
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
        </nav>

        <div className={styles.actions}>
          <Button asChild variant="outline" size="sm">
            <Link href={getLoginUrl()}>Sign In</Link>
          </Button>
          <Button asChild variant="primary" size="sm">
            <Link href={getSignupUrl()}>Get Started</Link>
          </Button>
        </div>

        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className={styles.menuIcon} />
          ) : (
            <Menu className={styles.menuIcon} />
          )}
        </button>
      </div>
    </header>
  );
};
