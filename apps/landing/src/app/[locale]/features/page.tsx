import React, { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import {
  ArrowRight,
  Dumbbell,
  BarChart3,
  Users,
  Target,
  Calendar,
  Zap,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';

import styles from './FeaturesPage.module.css';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const FeaturesPage = ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): React.JSX.Element => {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('pages.features');

  const upcomingFeatures = [
    {
      icon: <Dumbbell />,
      title: t('upcomingFeatures.workoutLogging.title'),
      description: t('upcomingFeatures.workoutLogging.description'),
    },
    {
      icon: <BarChart3 />,
      title: t('upcomingFeatures.progressTracking.title'),
      description: t('upcomingFeatures.progressTracking.description'),
    },
    {
      icon: <Target />,
      title: t('upcomingFeatures.goalSetting.title'),
      description: t('upcomingFeatures.goalSetting.description'),
    },
    {
      icon: <Calendar />,
      title: t('upcomingFeatures.scheduling.title'),
      description: t('upcomingFeatures.scheduling.description'),
    },
    {
      icon: <Users />,
      title: t('upcomingFeatures.community.title'),
      description: t('upcomingFeatures.community.description'),
    },
    {
      icon: <Zap />,
      title: t('upcomingFeatures.analytics.title'),
      description: t('upcomingFeatures.analytics.description'),
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={styles.content}>
          <div className={styles.comingSoonSection}>
            <h2 className={styles.comingSoonTitle}>{t('comingSoon')}</h2>
            <p className={styles.comingSoonDescription}>{t('description')}</p>
            <div className={styles.coreFeaturesCard}>
              <p className={styles.coreFeaturesText}>
                <strong>{t('coreFeatures')}</strong> {t('coreFeaturesList')}
              </p>
            </div>
          </div>

          <div className={styles.featuresGrid}>
            {upcomingFeatures.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.ctaSection}>
            <h3 className={styles.ctaTitle}>{t('cta.title')}</h3>
            <p className={styles.ctaDescription}>{t('cta.description')}</p>
            <Link href="/roadmap" className={styles.ctaButton}>
              {t('cta.viewRoadmap')}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesPage;
