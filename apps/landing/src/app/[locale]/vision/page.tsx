import { Heart, Target, Users, Globe, Shield, TrendingUp } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import React, { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import styles from './VisionPage.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'es') {
    return {
      title: 'Nuestra Visión - Peak Health',
      description:
        'Descubre nuestra misión para transformar la salud global a través del bienestar integral y la atención preventiva. Aprende por qué existe PeakHealth y nuestro compromiso con la salud holística.',
      keywords:
        'visión de salud, bienestar integral, atención preventiva, salud holística, misión fitness',
      openGraph: {
        title: 'Nuestra Visión - Peak Health',
        description:
          'Descubre nuestra misión para transformar la salud global a través del bienestar integral y la atención preventiva.',
        type: 'website',
      },
    };
  }

  return {
    title: 'Our Vision - Peak Health',
    description:
      'Discover our mission to transform global health through integrative wellness and preventive care. Learn why PeakHealth exists and our commitment to holistic health.',
    keywords:
      'health vision, integrative wellness, preventive care, holistic health, fitness mission',
    openGraph: {
      title: 'Our Vision - Peak Health',
      description:
        'Discover our mission to transform global health through integrative wellness and preventive care.',
      type: 'website',
    },
  };
}

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const VisionPage = ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): React.JSX.Element => {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('pages.vision');

  const visionPillars = [
    {
      icon: <Heart />,
      title: t('pillars.holisticHealth.title'),
      description: t('pillars.holisticHealth.description'),
    },
    {
      icon: <Target />,
      title: t('pillars.preventiveFocus.title'),
      description: t('pillars.preventiveFocus.description'),
    },
    {
      icon: <Globe />,
      title: t('pillars.globalImpact.title'),
      description: t('pillars.globalImpact.description'),
    },
    {
      icon: <Shield />,
      title: t('pillars.evidenceBased.title'),
      description: t('pillars.evidenceBased.description'),
    },
    {
      icon: <TrendingUp />,
      title: t('pillars.continuousEvolution.title'),
      description: t('pillars.continuousEvolution.description'),
    },
    {
      icon: <Users />,
      title: t('pillars.accessibleHealth.title'),
      description: t('pillars.accessibleHealth.description'),
    },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {t('hero.title')}
            <span className={styles.gradientText}>
              {' '}
              {t('hero.titleHighlight')}
            </span>
          </h1>
          <p className={styles.heroDescription}>{t('hero.description')}</p>
          <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.mission}>
        <div className={styles.missionContent}>
          <h2 className={styles.sectionTitle}>{t('mission.title')}</h2>
          <div className={styles.missionGrid}>
            <div className={styles.missionCard}>
              <h3>{t('mission.problem.title')}</h3>
              <p>{t('mission.problem.description')}</p>
            </div>
            <div className={styles.missionCard}>
              <h3>{t('mission.solution.title')}</h3>
              <p>{t('mission.solution.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Pillars */}
      <section className={styles.pillars}>
        <div className={styles.pillarsContent}>
          <h2 className={styles.sectionTitle}>{t('pillars.title')}</h2>
          <div className={styles.pillarsGrid}>
            {visionPillars.map((pillar, index) => (
              <div key={index} className={styles.pillarCard}>
                <div className={styles.pillarIcon}>{pillar.icon}</div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDescription}>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className={styles.impact}>
        <div className={styles.impactContent}>
          <h2 className={styles.sectionTitle}>{t('impact.title')}</h2>
          <div className={styles.impactGrid}>
            <div className={styles.impactItem}>
              <h3>{t('impact.individual.title')}</h3>
              <p>{t('impact.individual.description')}</p>
            </div>
            <div className={styles.impactItem}>
              <h3>{t('impact.community.title')}</h3>
              <p>{t('impact.community.description')}</p>
            </div>
            <div className={styles.impactItem}>
              <h3>{t('impact.global.title')}</h3>
              <p>{t('impact.global.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>{t('cta.title')}</h2>
          <p>{t('cta.description')}</p>
          <div className={styles.ctaButtons}>
            <Link href="/" className={styles.primaryButton}>
              {t('cta.getStarted')}
            </Link>
            <Link href="/features" className={styles.secondaryButton}>
              {t('cta.learnMore')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionPage;
