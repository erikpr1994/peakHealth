'use client';

import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import styles from './LanguageSwitcher.module.css';
import { useRouter, usePathname } from '@/i18n/navigation';

export const LanguageSwitcher = (): React.JSX.Element => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('language');
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const languages = [
    { code: 'en', name: t('en') },
    { code: 'es', name: t('es') },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  const switchLanguage = (newLocale: string): void => {
    // Use next-intl router to handle locale switching properly
    router.replace(pathname, { locale: newLocale });

    setIsOpen(false);
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className={styles.container}>
        <button className={styles.trigger} aria-label="Select language">
          <Globe className={styles.icon} />
          <span className={styles.currentLanguage}>...</span>
          <ChevronDown className={styles.arrow} />
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <Globe className={styles.icon} />
        <span className={styles.currentLanguage}>
          {currentLanguage?.name || locale}
        </span>
        <ChevronDown
          className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`${styles.option} ${lang.code === locale ? styles.active : ''}`}
              onClick={() => switchLanguage(lang.code)}
            >
              <span className={styles.languageName}>{lang.name}</span>
              {lang.code === locale && (
                <span className={styles.checkmark}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};
