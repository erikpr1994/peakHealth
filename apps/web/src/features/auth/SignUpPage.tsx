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

const SignUpPage = () => {
  const { signUp, isAuthOperationLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});

    // Validate required fields
    const errors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errors.password =
        'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await signUp(email, password, name);
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
          <CardDescription>Create your Peak Health account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" data-testid="signup-error">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name"
                required
                data-testid="name-input"
              />
              {validationErrors.name && (
                <div className="text-sm text-red-600" data-testid="name-error">
                  {validationErrors.name}
                </div>
              )}
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                data-testid="confirm-password-input"
              />
              {validationErrors.confirmPassword && (
                <div
                  className="text-sm text-red-600"
                  data-testid="confirm-password-error"
                >
                  {validationErrors.confirmPassword}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isAuthOperationLoading}
              data-testid="signup-button"
            >
              {isAuthOperationLoading ? 'Loading...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <NextLink
              href="/login"
              className="text-sm text-muted-foreground hover:text-primary underline"
            >
              Already have an account? Sign in
            </NextLink>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
