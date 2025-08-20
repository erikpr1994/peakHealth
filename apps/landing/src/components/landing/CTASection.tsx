import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getSignupUrl } from '@/lib/auth';
import styles from './CTASection.module.css';

export const CTASection = (): React.JSX.Element => {
  const t = useTranslations('cta');
  const locale = useLocale();

  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.description}>{t('description')}</p>
          <div className={styles.actions}>
            <Link
              href={getSignupUrl(undefined, locale)}
              className={styles.primaryButton}
            >
              {t('getStartedFree')}
              <ArrowRight />
            </Link>
            <Link href="/features" className={styles.secondaryButton}>
              {t('learnMore')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
