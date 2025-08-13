'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { getLoginUrl, getSignupUrl } from '@/lib/auth';
import styles from './Header.module.css';

export const Header = (): React.JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

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

        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
          <nav className={styles.mobileNav} onClick={e => e.stopPropagation()}>
            <Link
              href="/features"
              className={styles.mobileNavLink}
              onClick={closeMobileMenu}
            >
              Features
            </Link>
            <Link
              href="/roadmap"
              className={styles.mobileNavLink}
              onClick={closeMobileMenu}
            >
              Roadmap
            </Link>
            <Link
              href="/feedback"
              className={styles.mobileNavLink}
              onClick={closeMobileMenu}
            >
              Feedback
            </Link>
            <Link
              href="/blog"
              className={styles.mobileNavLink}
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
            <div className={styles.mobileActions}>
              <Link
                href={getLoginUrl()}
                className={styles.mobileSignInLink}
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
              <Link
                href={getSignupUrl()}
                className={styles.mobileSignUpLink}
                onClick={closeMobileMenu}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
