'use client';

import { useAuth } from '@peakhealth/auth';
import NextLink from 'next/link';
import React, { useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage = () => {
  const { login, isAuthOperationLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});

    // Validate required fields
    const errors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await login(email, password);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            Peak Health
          </CardTitle>
          <CardDescription>
            Welcome back! Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" data-testid="login-error">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                data-testid="email-input"
              />
              {validationErrors.email && (
                <div className="text-sm text-red-600" data-testid="email-error">
                  {validationErrors.email}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                data-testid="password-input"
              />
              {validationErrors.password && (
                <div
                  className="text-sm text-red-600"
                  data-testid="password-error"
                >
                  {validationErrors.password}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isAuthOperationLoading}
              data-testid="login-button"
            >
              {isAuthOperationLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <NextLink
              href="/signup"
              className="text-sm text-muted-foreground hover:text-primary underline"
            >
              Don&apos;t have an account? Sign up
            </NextLink>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
