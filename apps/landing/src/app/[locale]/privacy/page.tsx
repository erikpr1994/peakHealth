import React, { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import {
  ArrowRight,
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  Settings,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';

import styles from './PrivacyPage.module.css';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const PrivacyPage = ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): React.JSX.Element => {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('pages.privacy');

  const privacyPrinciples = [
    {
      icon: <Shield />,
      title: t('principles.dataProtection.title'),
      description: t('principles.dataProtection.description'),
    },
    {
      icon: <Lock />,
      title: t('principles.security.title'),
      description: t('principles.security.description'),
    },
    {
      icon: <Eye />,
      title: t('principles.transparency.title'),
      description: t('principles.transparency.description'),
    },
    {
      icon: <FileText />,
      title: t('principles.control.title'),
      description: t('principles.control.description'),
    },
    {
      icon: <Users />,
      title: t('principles.community.title'),
      description: t('principles.community.description'),
    },
    {
      icon: <Settings />,
      title: t('principles.compliance.title'),
      description: t('principles.compliance.description'),
    },
  ];

  return (
    <section className={styles.privacy}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={styles.content}>
          <div className={styles.comingSoonSection}>
            <h2 className={styles.comingSoonTitle}>{t('comingSoon')}</h2>
            <p className={styles.comingSoonDescription}>{t('description')}</p>
            <div className={styles.commitmentCard}>
              <p className={styles.commitmentText}>
                <strong>{t('ourCommitment')}</strong> {t('commitmentText')}
              </p>
            </div>
          </div>

          <div className={styles.privacyPrinciples}>
            {privacyPrinciples.map((principle, index) => (
              <div key={index} className={styles.principle}>
                <div className={styles.principleIcon}>{principle.icon}</div>
                <h3 className={styles.principleTitle}>{principle.title}</h3>
                <p className={styles.principleDescription}>
                  {principle.description}
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

export default PrivacyPage;
