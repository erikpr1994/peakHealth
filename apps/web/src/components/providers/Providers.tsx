'use client';

import { SWRProvider } from './SWRProvider';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import { ToastProvider } from '@peakhealth/ui';
import { HypertuneProvider } from '../../../generated/hypertune.react';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps): React.ReactElement => {
  return (
    <SWRProvider>
      <ToastProvider>
        <AuthProvider>
          <HypertuneProvider
            createSourceOptions={{
              token: process.env.NEXT_PUBLIC_HYPERTUNE_TOKEN || '',
            }}
            rootArgs={{
              context: {
                user: {
                  id: 'anonymous',
                  anonymousId: 'anonymous',
                  email: '',
                },
                environment:
                  (process.env.NODE_ENV as
                    | 'development'
                    | 'production'
                    | 'test') || 'development',
              },
            }}
          >
            {children}
          </HypertuneProvider>
        </AuthProvider>
      </ToastProvider>
    </SWRProvider>
  );
};
