import React from 'react';
import { useTranslations } from 'next-intl';

import styles from './CareersPage.module.css';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const CareersPage = (): React.JSX.Element => {
  const t = useTranslations('pages.careers');

  return (
    <section className={styles.careers}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={styles.content}>
          <div className={styles.statusSection}>
            <h2 className={styles.statusTitle}>{t('currentStatus.title')}</h2>
            <p className={styles.statusDescription}>
              {t('currentStatus.description')}
            </p>
            <div className={styles.openCvPolicy}>
              <p className={styles.openCvPolicyText}>
                <strong>{t('currentStatus.openCvPolicy.title')}</strong>{' '}
                {t('currentStatus.openCvPolicy.description')}
              </p>
            </div>
          </div>

          <div className={styles.applySection}>
            <h3 className={styles.applyTitle}>{t('howToApply.title')}</h3>
            <p className={styles.applyDescription}>
              {t('howToApply.description')}
            </p>
            <div className={styles.emailContainer}>
              <p className={styles.emailText}>
                📧{' '}
                <a
                  href={`mailto:${t('howToApply.email')}`}
                  className={styles.emailLink}
                >
                  {t('howToApply.email')}
                </a>
              </p>
            </div>
            <p className={styles.applyNote}>{t('howToApply.note')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersPage;
