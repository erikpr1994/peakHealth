'use client';

import { AuthProvider as BaseAuthProvider } from '@peakhealth/auth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return <BaseAuthProvider>{children}</BaseAuthProvider>;
};
