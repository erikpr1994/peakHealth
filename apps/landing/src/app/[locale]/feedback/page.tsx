import React from 'react';
import { useTranslations } from 'next-intl';

import styles from './FeedbackPage.module.css';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const FeedbackPage = (): React.JSX.Element => {
  const t = useTranslations('pages.feedback');

  return (
    <section className={styles.feedback}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>
            {t('subtitle')}
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.introSection}>
            <h2 className={styles.introTitle}>{t('intro.title')}</h2>
            <p className={styles.introDescription}>
              {t('intro.description')}
            </p>
          </div>

          <div className={styles.mainGrid}>
            <div className={styles.feedbackSection}>
              <h3 className={styles.feedbackTitle}>{t('currentStatus.title')}</h3>
              <p className={styles.feedbackDescription}>
                {t('currentStatus.description')}
              </p>
            </div>

            <div className={styles.emailSection}>
              <h3 className={styles.emailTitle}>{t('getInTouch.title')}</h3>
              <p className={styles.emailDescription}>
                {t('getInTouch.description')}
              </p>
              <div className={styles.emailContainer}>
                <p className={styles.emailText}>
                  📧{' '}
                  <a
                    href={`mailto:${t('getInTouch.email')}`}
                    className={styles.emailLink}
                  >
                    {t('getInTouch.email')}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className={styles.categoriesGrid}>
            <div className={styles.category}>
              <div className={styles.categoryIcon}>💡</div>
              <h4 className={styles.categoryTitle}>{t('categories.featureRequests.title')}</h4>
              <p className={styles.categoryDescription}>
                {t('categories.featureRequests.description')}
              </p>
            </div>

            <div className={styles.category}>
              <div className={`${styles.categoryIcon} ${styles.green}`}>🐛</div>
              <h4 className={styles.categoryTitle}>{t('categories.bugReports.title')}</h4>
              <p className={styles.categoryDescription}>
                {t('categories.bugReports.description')}
              </p>
            </div>

            <div className={styles.category}>
              <div className={`${styles.categoryIcon} ${styles.purple}`}>
                🗳️
              </div>
              <h4 className={styles.categoryTitle}>{t('categories.voteAndDiscuss.title')}</h4>
              <p className={styles.categoryDescription}>
                {t('categories.voteAndDiscuss.description')}
              </p>
            </div>
          </div>

          <div className={styles.noteSection}>
            <div className={styles.noteContainer}>
              <p className={styles.noteText}>
                <strong>{t('comingSoon.title')}</strong> {t('comingSoon.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackPage;
