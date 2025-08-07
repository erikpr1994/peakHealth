'use client';

import {
  validateEmail,
  formatAuthError,
  buildAppRedirectUrl,
} from '@peakhealth/auth-utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, Suspense } from 'react';

import {
  AuthCard,
  FormGroup,
  Input,
  Button,
  Link,
} from '../../components/AuthCard';

import styles from './page.module.css';

const LoginForm = (): React.JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl =
    searchParams.get('returnUrl') ?? searchParams.get('redirect');
  const message = searchParams.get('message');

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

    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const submitForm = async (): Promise<void> => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = (await response.json()) as { error?: string };

        if (!response.ok) {
          throw new Error(data.error ?? 'Login failed');
        }

        // Check if user has multiple accessible apps
        const appsResponse = await fetch('/api/auth/apps');
        if (appsResponse.ok) {
          const appsData = await appsResponse.json();
          const accessibleApps = appsData.apps.filter(
            (app: { accessible: boolean }) => app.accessible
          );

          if (accessibleApps.length > 1) {
            // Multiple apps available, redirect to app selector
            router.push('/apps');
          } else if (accessibleApps.length === 1) {
            // Single app available, redirect directly
            const appKey = accessibleApps[0].appKey;
            const appRedirectUrl = buildAppRedirectUrl(appKey, {
              returnUrl: returnUrl ?? undefined,
            });
            window.location.href = appRedirectUrl;
          } else {
            // No apps available, redirect to access denied page
            router.push('/access-denied');
          }
        } else {
          // API call failed, redirect to access denied page
          router.push('/access-denied');
        }
      } catch (error) {
        setGeneralError(formatAuthError(error));
      } finally {
        setIsLoading(false);
      }
    };

    void submitForm();
  };

  return (
    <div className={styles.container}>
      <AuthCard
        title="Welcome back"
        subtitle="Sign in to your PeakHealth account"
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          {message && <div className={styles.successMessage}>{message}</div>}

          {generalError && (
            <div className={styles.errorMessage}>{generalError}</div>
          )}

          <FormGroup label="Email" error={errors.email}>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              error={!!errors.email}
              disabled={isLoading}
            />
          </FormGroup>

          <FormGroup label="Password" error={errors.password}>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              error={!!errors.password}
              disabled={isLoading}
            />
          </FormGroup>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className={styles.footer}>
          <p>
            Don&apos;t have an account? <Link href="/signup">Sign up</Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
};

const LoginPage = (): React.JSX.Element => {
  return (
    <Suspense
      fallback={
        <div className={styles.container}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              color: 'white',
              fontSize: '1.2rem',
            }}
          >
            Loading...
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
