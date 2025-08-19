'use client';

import { validateEmail, formatAuthError } from '@peakhealth/auth-utils';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import styles from './page.module.css';

import { AuthCard, Input, Button, FormGroup } from '@/features/shared';
import { Link } from '@/i18n/navigation';

const LoginForm = (): React.JSX.Element => {
  const t = useTranslations('login');
  const tErrors = useTranslations('errors');
  
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const returnUrl = searchParams.get('returnUrl') ?? '/app-selector';

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

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setGeneralError('');

    void (async () => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            returnUrl,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? tErrors('loginFailed'));
        }

        // Redirect to the return URL or app selector
        window.location.href = data.redirectUrl || returnUrl;
      } catch (error) {
        setGeneralError(formatAuthError(error));
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return (
    <div className={styles.container}>
      <AuthCard
        title={t('title')}
        subtitle={t('subtitle')}
      >
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
            {t('footer.noAccount')} <Link href="/signup">{t('footer.signUp')}</Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
};

export { LoginForm };

