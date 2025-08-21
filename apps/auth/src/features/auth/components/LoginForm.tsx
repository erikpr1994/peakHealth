'use client';

import {
  validateEmail,
  formatAuthError,
  getUserAccessibleApps,
  buildAppRedirectUrl,
} from '@peakhealth/auth-utils';
import type { User } from '@peakhealth/auth-types';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import styles from './page.module.css';

import {
  AuthCard,
  Input,
  Button,
  FormGroup,
  BackButton,
} from '@/features/shared';
import { Link } from '@/i18n/navigation';

const LoginForm = (): React.JSX.Element => {
  const t = useTranslations('login');
  const tErrors = useTranslations('errors');
  const locale = useLocale();

  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const returnUrl = searchParams.get('returnUrl') ?? `/${locale}/app-selector`;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = t('email.required');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('email.invalid');
    }

    if (!formData.password) {
      newErrors.password = t('password.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const determineRedirectUrl = (user: User): string => {
    // Get accessible apps for the user
    const accessibleApps = getUserAccessibleApps(user);

    // Filter to only accessible apps
    const availableApps = accessibleApps.filter(
      (app): boolean => app.accessible
    );

    if (availableApps.length === 0) {
      // No accessible apps, redirect to app selector to show the "no access" message
      return `/${locale}/app-selector`;
    }

    if (availableApps.length === 1) {
      // Only one app available, redirect directly to it
      const appKey = availableApps[0].appKey;

      // Don't pass returnUrl when redirecting directly to app
      return buildAppRedirectUrl(appKey);
    }
    // Multiple apps available, redirect to app selector
    return `/${locale}/app-selector`;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setGeneralError('');

    void (async (): Promise<void> => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? tErrors('loginFailed'));
        }

        // Determine redirect URL based on user's accessible apps
        const redirectUrl = determineRedirectUrl(data.user);

        // Redirect to the determined URL
        window.location.href = redirectUrl;
      } catch (error) {
        setGeneralError(formatAuthError(error));
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return (
    <div className={styles.container}>
      <AuthCard title={t('title')} subtitle={t('subtitle')}>
        <div className={styles.backButtonContainer}>
          <BackButton variant="secondary" size="sm" />
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {message && <div className={styles.successMessage}>{message}</div>}

          {generalError && (
            <div className={styles.errorMessage}>{generalError}</div>
          )}

          <FormGroup label={t('email.label')} error={errors.email}>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t('email.placeholder')}
              error={!!errors.email}
              disabled={isLoading}
            />
          </FormGroup>

          <FormGroup label={t('password.label')} error={errors.password}>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={t('password.placeholder')}
              error={!!errors.password}
              disabled={isLoading}
            />
          </FormGroup>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? t('button.loading') : t('button.default')}
          </Button>
        </form>

        <div className={styles.footer}>
          <p>
            {t('footer.noAccount')}{' '}
            <Link href="/signup">{t('footer.signUp')}</Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
};

export { LoginForm };
