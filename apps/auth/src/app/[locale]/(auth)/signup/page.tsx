import React from 'react';
import { SignUpForm } from '@/features/auth/components/SignUpForm';

// Force static generation with no revalidation
export const dynamic = 'force-static';
export const revalidate = false;

const SignUpPage = (): React.JSX.Element => {
  return <SignUpForm />;
};

export default SignUpPage;
