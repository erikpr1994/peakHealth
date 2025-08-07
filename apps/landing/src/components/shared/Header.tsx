'use client';

import { Button } from '@peakhealth/ui';
import { Menu, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import styles from './Header.module.css';

import { getLoginUrl, getSignupUrl } from '@/lib/auth';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logoText}>Peak Health</span>
          </Link>
        </div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/features" className={styles.navLink}>
                Features
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/pricing" className={styles.navLink}>
                Pricing
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/blog" className={styles.navLink}>
                Blog
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/about" className={styles.navLink}>
                About
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button asChild variant="ghost">
            <Link href={getLoginUrl()}>Log In</Link>
          </Button>
          <Button asChild variant="primary">
            <Link href={getSignupUrl()}>
              Get Started
              <ArrowRight className={styles.arrowIcon} />
            </Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className={styles.menuButton}
        >
          {isMenuOpen ? (
            <X className={styles.menuIcon} />
          ) : (
            <Menu className={styles.menuIcon} />
          )}
        </Button>
      </div>
    </header>
  );
};
