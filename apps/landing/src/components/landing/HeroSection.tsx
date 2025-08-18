'use client';

import { BarChart3, Dumbbell, Star } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'next-intl';

import styles from './HeroSection.module.css';

export const HeroSection = (): React.JSX.Element => {
  const t = useTranslations('hero');

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <Star className={styles.starIcon} />
            <span>{t('badge')}</span>
          </div>

          <h1 className={styles.title}>
            {t('title')}
            <span className={styles.gradientText}> {t('titleHighlight')}</span>
          </h1>

          <p className={styles.description}>{t('description')}</p>

          <div className={styles.valueProps}>
            <div className={styles.valueProp}>
              <div className={styles.valueIcon}>
                <Dumbbell className={styles.icon} />
              </div>
              <div className={styles.valueContent}>
                <h3>{t('logWorkouts.title')}</h3>
                <p>{t('logWorkouts.description')}</p>
              </div>
            </div>
            <div className={styles.valueProp}>
              <div className={styles.valueIcon}>
                <BarChart3 className={styles.icon} />
              </div>
              <div className={styles.valueContent}>
                <h3>{t('trackProgress.title')}</h3>
                <p>{t('trackProgress.description')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.imageContainer}>
            <div className={styles.mockup}>
              <div className={styles.screen}>
                <div className={styles.appHeader}>
                  <div className={styles.appIcon}></div>
                  <div className={styles.appTitle}>{t('mockup.appTitle')}</div>
                </div>
                <div className={styles.appContent}>
                  <div className={styles.workoutCard}>
                    <div className={styles.workoutTitle}>
                      {t('mockup.workoutTitle')}
                    </div>
                    <div className={styles.workoutProgress}>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill}></div>
                      </div>
                      <span>{t('mockup.exercises')}</span>
                    </div>
                  </div>
                  <div className={styles.statsGrid}>
                    <div className={styles.miniStat}>
                      <div className={styles.miniStatValue}>12</div>
                      <div className={styles.miniStatLabel}>
                        {t('mockup.dayStreak')}
                      </div>
                    </div>
                    <div className={styles.miniStat}>
                      <div className={styles.miniStatValue}>85%</div>
                      <div className={styles.miniStatLabel}>
                        {t('mockup.goalProgress')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
