'use client';

import {
  validateEmail,
  validatePassword,
  formatAuthError,
} from '@peakhealth/auth-utils';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './page.module.css';

import { AuthCard, Input, Button, BackButton } from '@/features/shared';
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

  // Helper function to map password validation errors to translation keys
  const getPasswordErrorMessage = (validationErrors: string[]): string => {
    if (validationErrors.length === 0) return '';

    // Map the first error to the appropriate translation key
    const firstError = validationErrors[0];

    if (firstError.includes('at least 8 characters')) {
      return t('password.tooShort');
    }
    if (firstError.includes('lowercase letter')) {
      return t('password.noLowercase');
    }
    if (firstError.includes('uppercase letter')) {
      return t('password.noUppercase');
    }
    if (firstError.includes('number')) {
      return t('password.noNumber');
    }

    // Fallback to generic error
    return t('password.invalid');
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
      if (!passwordValidation.isValid) {
        newErrors.password = getPasswordErrorMessage(passwordValidation.errors);
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('confirmPassword.required');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('confirmPassword.mismatch');
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('firstName.required');
    }

    if (!formData.lastName.trim()) {
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

    void (async (): Promise<void> => {
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
    <div className={styles.container}>
      <AuthCard title={t('title')} subtitle={t('subtitle')}>
        <div className={styles.backButtonContainer}>
          <BackButton variant="secondary" size="sm" />
        </div>

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
    </div>
  );
};

export { SignUpForm };
