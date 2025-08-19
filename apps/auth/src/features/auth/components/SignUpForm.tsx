'use client';

import {
  validateEmail,
  validatePassword,
  formatAuthError,
} from '@peakhealth/auth-utils';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import styles from './page.module.css';

import { AuthCard, Input, Button } from '@/features/shared';
import { Link, useRouter } from '@/i18n/navigation';

const SignUpForm = (): React.JSX.Element => {
  const t = useTranslations('signup');
  const tErrors = useTranslations('errors');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') ?? '/login';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.valid) {
        newErrors.password = t('password.invalid');
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('confirmPassword.required');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('confirmPassword.mismatch');
    }

    if (!formData.firstName) {
      newErrors.firstName = t('firstName.required');
    }

    if (!formData.lastName) {
      newErrors.lastName = t('lastName.required');
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

    void (async () => {
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            returnUrl,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? tErrors('signupFailed'));
        }

        // Redirect to login page with success message
        router.push(
          `/login?message=${encodeURIComponent(t('successMessage'))}&returnUrl=${encodeURIComponent(returnUrl)}`
        );
      } catch (error) {
        setErrors({ submit: formatAuthError(error) });
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return (
    <AuthCard title={t('title')} subtitle={t('subtitle')}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.nameGrid}>
          <div>
            <Input
              type="text"
              name="firstName"
              placeholder={t('firstName.placeholder')}
              value={formData.firstName}
              onChange={handleInputChange}
              error={!!errors.firstName}
              required
            />
          </div>
          <div>
            <Input
              type="text"
              name="lastName"
              placeholder={t('lastName.placeholder')}
              value={formData.lastName}
              onChange={handleInputChange}
              error={!!errors.lastName}
              required
            />
          </div>
        </div>

        <Input
          type="email"
          name="email"
          placeholder={t('email.placeholder')}
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          required
        />

        <Input
          type="password"
          name="password"
          placeholder={t('password.placeholder')}
          value={formData.password}
          onChange={handleInputChange}
          error={!!errors.password}
          required
        />

        <Input
          type="password"
          name="confirmPassword"
          placeholder={t('confirmPassword.placeholder')}
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={!!errors.confirmPassword}
          required
        />

        {errors.submit && <div className={styles.error}>{errors.submit}</div>}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? t('button.loading') : t('button.default')}
        </Button>

        <div className={styles.loginLinkContainer}>
          <span className={styles.loginText}>{t('footer.haveAccount')} </span>
          <Link href={`/login?returnUrl=${encodeURIComponent(returnUrl)}`}>
            {t('footer.signIn')}
          </Link>
        </div>
      </form>
    </AuthCard>
  );
};

export { SignUpForm };

