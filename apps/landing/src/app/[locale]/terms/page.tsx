import React, { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import {
  ArrowRight,
  FileText,
  Shield,
  Users,
  Scale,
  Gavel,
  MessageSquare,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';

import styles from './TermsPage.module.css';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const TermsPage = ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): React.JSX.Element => {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('pages.terms');

  const termsSections = [
    {
      icon: <FileText />,
      title: t('sections.termsOfUse.title'),
      description: t('sections.termsOfUse.description'),
    },
    {
      icon: <Users />,
      title: t('sections.userRights.title'),
      description: t('sections.userRights.description'),
    },
    {
      icon: <Shield />,
      title: t('sections.serviceLimitations.title'),
      description: t('sections.serviceLimitations.description'),
    },
    {
      icon: <Scale />,
      title: t('sections.disputeResolution.title'),
      description: t('sections.disputeResolution.description'),
    },
    {
      icon: <Gavel />,
      title: t('sections.legal.title'),
      description: t('sections.legal.description'),
    },
    {
      icon: <MessageSquare />,
      title: t('sections.contact.title'),
      description: t('sections.contact.description'),
    },
  ];

  return (
    <section className={styles.terms}>
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
                <strong>{t('whatWereWorkingOn')}</strong> {t('featuresList')}
              </p>
            </div>
          </div>

          <div className={styles.termsSections}>
            {termsSections.map((section, index) => (
              <div key={index} className={styles.section}>
                <div className={styles.sectionIcon}>{section.icon}</div>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <p className={styles.sectionDescription}>
                  {section.description}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.contactSection}>
            <h3 className={styles.contactTitle}>{t('contact.title')}</h3>
            <p className={styles.contactDescription}>
              {t('contact.description')}
            </p>
            <Link href="/contact" className={styles.contactButton}>
              {t('contact.getInTouch')}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsPage;
