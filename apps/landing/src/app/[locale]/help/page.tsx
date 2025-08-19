import React, { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import {
  ArrowRight,
  BookOpen,
  MessageCircle,
  Video,
  FileText,
  Search,
  Mail,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';

import styles from './HelpPage.module.css';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const HelpPage = ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): React.JSX.Element => {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('pages.help');

  const helpCategories = [
    {
      icon: <BookOpen />,
      title: t('categories.userGuides.title'),
      description: t('categories.userGuides.description'),
    },
    {
      icon: <Video />,
      title: t('categories.tutorials.title'),
      description: t('categories.tutorials.description'),
    },
    {
      icon: <MessageCircle />,
      title: t('categories.faq.title'),
      description: t('categories.faq.description'),
    },
    {
      icon: <Search />,
      title: t('categories.search.title'),
      description: t('categories.search.description'),
    },
    {
      icon: <FileText />,
      title: t('categories.documentation.title'),
      description: t('categories.documentation.description'),
    },
    {
      icon: <Mail />,
      title: t('categories.support.title'),
      description: t('categories.support.description'),
    },
  ];

  return (
    <section className={styles.help}>
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
                <strong>{t('whatYoullFind')}</strong> {t('featuresList')}
              </p>
            </div>
          </div>

          <div className={styles.helpCategories}>
            {helpCategories.map((category, index) => (
              <div key={index} className={styles.category}>
                <div className={styles.categoryIcon}>{category.icon}</div>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <p className={styles.categoryDescription}>
                  {category.description}
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
              {t('contact.getHelp')}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpPage;
