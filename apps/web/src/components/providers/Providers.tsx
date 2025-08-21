'use client';

import { SWRProvider } from './SWRProvider';
import { AuthProvider, useAuth } from '@/features/auth/context/AuthContext';
import { ToastProvider } from '@peakhealth/ui';
import { HypertuneProvider } from '../../../generated/hypertune.react';

interface ProvidersProps {
  children: React.ReactNode;
}

function HypertuneWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <HypertuneProvider
      createSourceOptions={{
        token: process.env.NEXT_PUBLIC_HYPERTUNE_TOKEN || '',
      }}
      rootArgs={{
        context: {
          user: {
            id: user?.id || '',
            email: user?.email || '',
          },
          environment:
            (process.env.NODE_ENV as 'development' | 'production' | 'test') ||
            'development',
          anonymousUser: {
            id: '', // Empty string since we don't need anonymous tracking for authenticated users
          },
        },
      }}
    >
      {children}
    </HypertuneProvider>
  );
}

export const Providers = ({ children }: ProvidersProps): React.ReactElement => {
  return (
    <SWRProvider>
      <ToastProvider>
        <AuthProvider>
          <HypertuneWrapper>{children}</HypertuneWrapper>
        </AuthProvider>
      </ToastProvider>
    </SWRProvider>
  );
};
