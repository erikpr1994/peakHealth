'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import styles from './page.module.css';

import { AuthCard, Button, Link } from '@/features/shared';

const AccessDeniedPage = (): React.JSX.Element => {
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
      title="Access Denied"
      subtitle="You don't have permission to access this resource"
    >
      <div className={styles.content}>
        <h3 className={styles.title}>❌ Access Denied</h3>
        <p className={styles.message}>
          You don&apos;t have the necessary permissions to access this
          application.
        </p>

        <div className={styles.actions}>
          <Button onClick={handleLogout} className={styles.logoutButton}>
            Sign Out
          </Button>
          <Link href="/app-selector" className={styles.backLink}>
            Back to App Selection
          </Link>
        </div>
      </div>
    </AuthCard>
  );
};

export default AccessDeniedPage;
