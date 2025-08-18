'use client';

import { SWRProvider } from './SWRProvider';
import { AuthProvider } from '@/features/auth/context/AuthContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps): React.ReactElement => {
  return (
    <SWRProvider>
      <AuthProvider>{children}</AuthProvider>
    </SWRProvider>
  );
};
