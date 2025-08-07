'use client';

import {
  validateEmail,
  validatePassword,
  formatAuthError,
} from '@peakhealth/auth-utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import styles from './page.module.css';

import { AuthCard, Input, Button, Link } from '@/features/shared';

const SignUpForm = (): React.JSX.Element => {
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
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password =
          passwordValidation.errors[0] || 'Password is invalid';
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    void (async () => {
      setIsLoading(true);
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
          throw new Error(data.error ?? 'Signup failed');
        }

        // Redirect to login page with success message
        router.push(
          `/login?message=Account created successfully! Please check your email to verify your account.&returnUrl=${encodeURIComponent(returnUrl)}`
        );
      } catch (error) {
        setErrors({ submit: formatAuthError(error) });
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return (
    <AuthCard title="Create Account" subtitle="Join PeakHealth today">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.nameGrid}>
          <div>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
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
              placeholder="Last Name"
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
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          error={!!errors.password}
          required
        />

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={!!errors.confirmPassword}
          required
        />

        {errors.submit && <div className={styles.error}>{errors.submit}</div>}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <div className={styles.loginLinkContainer}>
          <span className={styles.loginText}>Already have an account? </span>
          <Link href={`/login?returnUrl=${encodeURIComponent(returnUrl)}`}>
            Sign in
          </Link>
        </div>
      </form>
    </AuthCard>
  );
};

export { SignUpForm };
