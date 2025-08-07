'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { AuthCard, Button, Link } from '../../components/AuthCard';

import styles from './page.module.css';

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
    <div className={styles.container}>
      <AuthCard
        title="Access Denied"
        subtitle="You don't have access to any applications"
      >
        <div className={styles.content}>
          <div className={styles.icon}>🚫</div>
          <p className={styles.message}>
            Sorry, you don&apos;t have access to any applications at this time.
            Please contact your administrator if you believe this is an error.
          </p>

          <div className={styles.actions}>
            <Button onClick={handleLogout} className={styles.logoutButton}>
              Sign Out
            </Button>
            <Link href="/login" className={styles.backLink}>
              Back to Login
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
};

export default AccessDeniedPage;
