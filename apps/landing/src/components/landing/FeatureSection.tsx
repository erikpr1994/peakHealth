import React from 'react';
import { ArrowRight, Dumbbell, BarChart3, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './FeatureSection.module.css';

export const FeatureSection = (): React.JSX.Element => {
  const t = useTranslations('features');

  const features = [
    {
      icon: <Dumbbell />,
      title: t('logWorkouts.title'),
      description: t('logWorkouts.description'),
    },
    {
      icon: <BarChart3 />,
      title: t('trackProgress.title'),
      description: t('trackProgress.description'),
    },
    {
      icon: <Users />,
      title: t('communityDriven.title'),
      description: t('communityDriven.description'),
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.description}>{t('description')}</p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.icon}>{feature.icon}</div>
              <div className={styles.content}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.communitySection}>
          <h3>{t('communitySection.title')}</h3>
          <p>{t('communitySection.description')}</p>
          <div className={styles.communityLinks}>
            <Link href="/roadmap" className={styles.roadmapLink}>
              {t('communitySection.viewRoadmap')}
              <ArrowRight />
            </Link>
            <Link href="/feedback" className={styles.feedbackLink}>
              {t('communitySection.suggestFeatures')}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
