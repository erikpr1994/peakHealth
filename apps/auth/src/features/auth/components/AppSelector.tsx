'use client';

import {
  getUserAccessibleApps,
  buildAppRedirectUrl,
} from '@peakhealth/auth-utils';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './app-selector.module.css';

import { AuthCard } from '@/features/shared';

interface AppOption {
  appKey: string;
  appConfig: {
    name: string;
    description?: string;
    icon?: string;
  };
  accessible: boolean;
  reason?: string;
}

const AppSelector = (): React.JSX.Element => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [apps, setApps] = useState<AppOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    void (async () => {
      try {
        // Get current user session
        const response = await fetch('/api/auth/session');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? 'Failed to get session');
        }

        if (!data.user) {
          // No user session, redirect to login
          router.push('/login');
          return;
        }

        setUser(data.user);

        // Get accessible apps for the user
        const accessibleApps = getUserAccessibleApps(data.user);
        setApps(accessibleApps);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load apps');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [router]);

  const handleAppSelect = (appKey: string): void => {
    const app = apps.find(a => a.appKey === appKey);
    if (!app?.accessible) {
      return;
    }

    try {
      const redirectUrl = buildAppRedirectUrl(appKey);
      window.location.href = redirectUrl;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to redirect to app'
      );
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/login');
      } else {
        setError('Failed to logout');
      }
    } catch {
      setError('Failed to logout');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div>Loading your apps...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <AuthCard title="Error" subtitle="Something went wrong">
          <div className={styles.error}>{error}</div>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Try Again
          </button>
        </AuthCard>
      </div>
    );
  }

  const accessibleApps = apps.filter(app => app.accessible);

  return (
    <div className={styles.container}>
      <AuthCard
        title="Choose Your App"
        subtitle={`Welcome back, ${user?.user_metadata?.firstName ?? user?.email}!`}
      >
        {accessibleApps.length === 0 ? (
          <div className={styles.noAppsContainer}>
            <p className={styles.noAppsText}>
              You don&apos;t have access to any apps at the moment.
            </p>
            <button
              onClick={() => void handleLogout()}
              className={styles.logoutButton}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <div className={styles.appGrid}>
              {apps.map(app => (
                <div
                  key={app.appKey}
                  className={`${styles.appCard} ${!app.accessible ? styles.disabled : ''}`}
                  role="button"
                  tabIndex={0}
                  data-testid={`app-card-${app.appKey}`}
                  onClick={() => handleAppSelect(app.appKey)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleAppSelect(app.appKey);
                    }
                  }}
                >
                  <div className={styles.appIcon}>{app.appConfig.icon}</div>
                  <div className={styles.appName}>{app.appConfig.name}</div>
                  <div className={styles.appDescription}>
                    {app.appConfig.description}
                  </div>
                  <div
                    className={`${styles.appStatus} ${app.accessible ? styles.accessible : styles.inaccessible}`}
                  >
                    {app.accessible ? 'Accessible' : 'No Access'}
                  </div>
                  {!app.accessible && app.reason && (
                    <div className={styles.reasonText}>{app.reason}</div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.logoutContainer}>
              <button
                onClick={() => void handleLogout()}
                className={styles.signOutButton}
              >
                Sign out
              </button>
            </div>
          </>
        )}
      </AuthCard>
    </div>
  );
};

export { AppSelector };
