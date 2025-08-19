'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import styles from './access-denied.module.css';

import { AuthCard, Button } from '@/features/shared';
import { Link, useRouter } from '@/i18n/navigation';

const AccessDeniedPage = (): React.JSX.Element => {
  const t = useTranslations('accessDenied');
  const tErrors = useTranslations('errors');
  const router = useRouter();

  const handleLogout = (): void => {
    void (async () => {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
        });
        router.push('/login');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Logout error:', error);
        router.push('/login');
      }
    })();
  };

  return (
    <AuthCard
      title={t('title')}
      subtitle={t('subtitle')}
    >
      <div className={styles.content}>
        <h3 className={styles.title}>{t('heading')}</h3>
        <p className={styles.message}>
          {t('message')}
        </p>

        <div className={styles.actions}>
          <Button onClick={handleLogout} className={styles.logoutButton}>
            {t('signOut')}
          </Button>
          <Link href="/app-selector" className={styles.backLink}>
            {t('backToAppSelection')}
          </Link>
        </div>
      </div>
    </AuthCard>
  );
};

export { AccessDeniedPage };

