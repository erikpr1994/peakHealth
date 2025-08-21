import React from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';

// Force static generation with no revalidation
export const dynamic = 'force-static';
export const revalidate = false;

const LoginPage = (): React.JSX.Element => {
  return <LoginForm />;
};

export default LoginPage;
