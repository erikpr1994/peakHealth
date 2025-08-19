import React, { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import {
  ArrowRight,
  Calendar,
  Vote,
  TrendingUp,
  MessageSquare,
  Users,
  BarChart3,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';

import styles from './RoadmapPage.module.css';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const RoadmapPage = ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): React.JSX.Element => {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('pages.roadmap');

  const roadmapFeatures = [
    {
      icon: <Vote />,
      title: t('features.voting.title'),
      description: t('features.voting.description'),
    },
    {
      icon: <Calendar />,
      title: t('features.timeline.title'),
      description: t('features.timeline.description'),
    },
    {
      icon: <TrendingUp />,
      title: t('features.progress.title'),
      description: t('features.progress.description'),
    },
    {
      icon: <MessageSquare />,
      title: t('features.feedback.title'),
      description: t('features.feedback.description'),
    },
    {
      icon: <Users />,
      title: t('features.community.title'),
      description: t('features.community.description'),
    },
    {
      icon: <BarChart3 />,
      title: t('features.analytics.title'),
      description: t('features.analytics.description'),
    },
  ];

  return (
    <section className={styles.roadmap}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={styles.content}>
          <div className={styles.comingSoonSection}>
            <h2 className={styles.comingSoonTitle}>{t('comingSoon')}</h2>
            <p className={styles.comingSoonDescription}>{t('description')}</p>
            <div className={styles.featuresCard}>
              <p className={styles.featuresText}>
                <strong>{t('whatToExpect')}</strong> {t('featuresList')}
              </p>
            </div>
          </div>

          <div className={styles.roadmapFeatures}>
            {roadmapFeatures.map((feature, index) => (
              <div key={index} className={styles.feature}>
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
            <Link href="/feedback" className={styles.ctaButton}>
              {t('cta.suggestFeatures')}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapPage;
