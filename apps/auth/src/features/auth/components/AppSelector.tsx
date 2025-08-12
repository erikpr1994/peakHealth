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

// SVG Icons for each app
const AppIcons = {
  web: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  admin: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2579 9.77251 19.9887C9.5799 19.7195 9.31074 19.5149 8.99999 19.4C8.69843 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.17999 19.73L7.11999 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.70499 20.3766C5.44215 20.3766 5.1819 20.3248 4.9391 20.2241C4.6963 20.1235 4.47573 19.976 4.28999 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.28999 16.96L4.34999 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.67999 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.16999 14.08H2.99999C2.46955 14.08 1.96085 13.8693 1.58578 13.4942C1.21071 13.1191 0.999985 12.6104 0.999985 12.08C0.999985 11.5496 1.21071 11.0409 1.58578 10.6658C1.96085 10.2907 2.46955 10.08 2.99999 10.08H3.08999C3.42099 10.0723 3.74206 9.96512 4.01128 9.77251C4.2805 9.5799 4.48505 9.31074 4.59999 9C4.73312 8.69843 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.26999 7.17999L4.20999 7.11999C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.70499C3.62343 5.44215 3.67523 5.1819 3.77588 4.9391C3.87653 4.6963 4.02405 4.47573 4.20999 4.28999C4.39573 4.10405 4.6163 3.95653 4.8591 3.85588C5.1019 3.75523 5.36215 3.70343 5.62499 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.03999 4.28999L7.09999 4.34999C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61843 4.81312 8.91999 4.67999H8.99999C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 9.99999 3.16999V2.99999C9.99999 2.46955 10.2107 1.96085 10.5858 1.58578C10.9608 1.21071 11.4696 0.999985 11.9999 0.999985C12.5304 0.999985 13.0391 1.21071 13.4141 1.58578C13.7892 1.96085 13.9999 2.46955 13.9999 2.99999V3.08999C14.0076 3.42099 14.1148 3.74206 14.3074 4.01128C14.5 4.2805 14.7692 4.48505 15.0799 4.59999C15.3815 4.73312 15.7161 4.77282 16.0405 4.714C16.3649 4.65519 16.6642 4.50054 16.8999 4.26999L16.9599 4.20999C17.1457 4.02405 17.3662 3.87653 17.609 3.77588C17.8518 3.67523 18.1121 3.62343 18.3749 3.62343C18.6378 3.62343 18.898 3.67523 19.1408 3.77588C19.3836 3.87653 19.6042 4.02405 19.7899 4.20999C19.9758 4.39573 20.1234 4.6163 20.224 4.8591C20.3247 5.1019 20.3765 5.36215 20.3765 5.62499C20.3765 5.88783 20.3247 6.14808 20.224 6.39088C20.1234 6.63368 19.9758 6.85425 19.7899 7.03999L19.7299 7.09999C19.4994 7.33568 19.3447 7.63502 19.2859 7.95941C19.2271 8.28381 19.2668 8.61843 19.3999 8.91999V8.99999C19.5267 9.29577 19.7371 9.54802 20.0054 9.72569C20.2737 9.90337 20.5881 9.99872 20.9099 9.99999H20.9999C21.5304 9.99999 22.0391 10.2107 22.4141 10.5858C22.7892 10.9608 22.9999 11.4696 22.9999 11.9999C22.9999 12.5304 22.7892 13.0391 22.4141 13.4141C22.0391 13.7892 21.5304 13.9999 20.9999 13.9999H20.9099C20.5881 14.0076 20.2737 14.1148 20.0054 14.3074C19.7371 14.5 19.5267 14.7692 19.3999 15.0799L19.3999 15.0799Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  pro: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2V6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 2V6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 10H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14H11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 17H11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 14H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 17H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const AppSelector = (): React.JSX.Element => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [apps, setApps] = useState<AppOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    void (async (): Promise<void> => {
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
        <div className={styles.content}>
          <div>Loading your apps...</div>
        </div>
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
        variant="full-width"
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
                  <div className={styles.appIcon}>
                    {AppIcons[app.appKey as keyof typeof AppIcons]}
                  </div>
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
