'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

import styles from './Footer.module.css';

import { getSignupUrl } from '@/lib/auth';

export const Footer = (): React.JSX.Element => {
  const t = useTranslations('footer');
  const locale = useLocale();
  const [currentYear, setCurrentYear] = useState('');
  const [signupUrl, setSignupUrl] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // One-time initialization
  useEffect((): void => {
    setIsMounted(true);
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  // Update signup URL when locale changes
  useEffect((): void => {
    if (isMounted) {
      setSignupUrl(getSignupUrl(undefined, locale));
    }
  }, [locale, isMounted]);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <div className={styles.title}>PeakHealth</div>
            <p className={styles.description}>{t('description')}</p>
            <Link
              href={isMounted ? signupUrl : '#'}
              className={styles.ctaButton}
            >
              {t('getStarted')}
            </Link>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('product')}</h3>
            <div className={styles.links}>
              <Link href="/features">{t('features')}</Link>
              <Link href="/vision">{t('vision')}</Link>
              <Link href="/roadmap">{t('roadmap')}</Link>
              <Link href="/feedback">{t('feedback')}</Link>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('company')}</h3>
            <div className={styles.links}>
              <Link href="/blog">{t('blog')}</Link>
              <Link href="/careers">{t('careers')}</Link>
              <Link href="/contact" className={styles.link}>
                {t('contact')}
              </Link>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('support')}</h3>
            <div className={styles.links}>
              <Link href="/help">{t('helpCenter')}</Link>
              <Link href="/feedback">{t('feedback')}</Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            {t('copyright', { year: isMounted ? currentYear : '2025' })}
          </div>
          <div className={styles.legal}>
            <Link href="/privacy">{t('privacy')}</Link>
            <Link href="/terms">{t('terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
