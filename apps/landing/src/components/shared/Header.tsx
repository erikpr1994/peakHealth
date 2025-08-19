'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

import styles from './Header.module.css';

import { getLoginUrl, getSignupUrl } from '@/lib/auth';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header = (): React.JSX.Element => {
  const t = useTranslations('navigation');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [loginUrl, setLoginUrl] = useState('');
  const [signupUrl, setSignupUrl] = useState('');

  // Set mounted state and auth URLs on client side only
  useEffect((): void => {
    setIsMounted(true);
    setLoginUrl(getLoginUrl());
    setSignupUrl(getSignupUrl());
  }, []);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = (): void => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false);
    }, 300);
  };

  // Prevent body scrolling when mobile menu is open
  useEffect((): (() => void) => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return (): void => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
            {t('features')}
          </Link>
          <Link href="/vision" className={styles.navLink}>
            {t('vision')}
          </Link>
          <Link href="/roadmap" className={styles.navLink}>
            {t('roadmap')}
          </Link>
          <Link href="/feedback" className={styles.navLink}>
            {t('feedback')}
          </Link>
          <Link href="/blog" className={styles.navLink}>
            {t('blog')}
          </Link>
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher />
          <Link href={isMounted ? loginUrl : '#'} className={styles.signInLink}>
            {t('signIn')}
          </Link>
          <Link
            href={isMounted ? signupUrl : '#'}
            className={styles.signUpLink}
          >
            {t('getStarted')}
          </Link>
        </div>

        <button
          className={styles.mobileMenuButton}
          onClick={isMobileMenuOpen ? closeMobileMenu : toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={styles.closeIcon}
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {(isMobileMenuOpen || isClosing) && (
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
          <nav
            className={`${styles.mobileNav} ${isClosing ? styles.closing : ''}`}
            onClick={e => e.stopPropagation()}
          >
            <Link
              href="/features"
              className={styles.mobileNavLink}
              onClick={closeMobileMenu}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.1
8 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
              {t('features')}
            </Link>
            <Link
              href="/vision"
              className={styles.mobileNavLink}
              onClick={closeMobileMenu}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.1
8 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
              {t('vision')}
            </Link>

            <Link
              href="/roadmap"
              className={styles.mobileNavLink}
              onClick={closeMobileMenu}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 11H1l8-8 8 8h-8v8z" />
                <path d="M3 21h18" />
              </svg>
              {t('roadmap')}
            </Link>
            <Link
              href="/feedback"
              className={styles.mobileNavLink}
              onClick={closeMobileMenu}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0
1 2 2z"
                />
              </svg>
              {t('feedback')}
            </Link>
            <Link
              href="/blog"
              className={styles.mobileNavLink}
              onClick={closeMobileMenu}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2
V8z"
                />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
              {t('blog')}
            </Link>
            <div className={styles.mobileActions}>
              <LanguageSwitcher />
              <Link
                href={isMounted ? loginUrl : '#'}
                className={styles.mobileSignInLink}
                onClick={closeMobileMenu}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10,17 15,12 10,7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                {t('signIn')}
              </Link>
              <Link
                href={isMounted ? signupUrl : '#'}
                className={styles.mobileSignUpLink}
                onClick={closeMobileMenu}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                {t('getStarted')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
