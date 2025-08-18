import React from 'react';
import { ArrowRight, Calendar, BarChart3, Target } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styles from './HowItWorksSection.module.css';

export const HowItWorksSection = (): React.JSX.Element => {
  const t = useTranslations('howItWorks');

  const steps = [
    {
      icon: <Calendar />,
      title: t('steps.createRoutine.title'),
      description: t('steps.createRoutine.description'),
    },
    {
      icon: <Target />,
      title: t('steps.logWorkouts.title'),
      description: t('steps.logWorkouts.description'),
    },
    {
      icon: <BarChart3 />,
      title: t('steps.monitorProgress.title'),
      description: t('steps.monitorProgress.description'),
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {t('title')}
            <span className={styles.gradientText}> {t('titleHighlight')}</span>
          </h2>
          <p className={styles.description}>{t('description')}</p>
        </div>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNumber}>{index + 1}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
              </div>
              <p className={styles.stepDescription}>{step.description}</p>
              {index < steps.length - 1 && (
                <div className={styles.stepArrow}>
                  <ArrowRight />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <h4>{t('features.smartRestTimers.title')}</h4>
            <p>{t('features.smartRestTimers.description')}</p>
          </div>
          <div className={styles.feature}>
            <h4>{t('features.exerciseLibrary.title')}</h4>
            <p>{t('features.exerciseLibrary.description')}</p>
          </div>
          <div className={styles.feature}>
            <h4>{t('features.personalRecords.title')}</h4>
            <p>{t('features.personalRecords.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
