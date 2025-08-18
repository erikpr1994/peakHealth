'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import styles from './Header.module.css';

import { LanguageSwitcher } from './LanguageSwitcher';
import { Link } from '@/i18n/navigation';

export const Header = (): React.JSX.Element => {
  const t = useTranslations('navigation');

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
          <Link href="#" className={styles.signInLink}>
            {t('signIn')}
          </Link>
          <Link href="#" className={styles.signUpLink}>
            {t('getStarted')}
          </Link>
        </div>
      </div>
    </header>
  );
};
