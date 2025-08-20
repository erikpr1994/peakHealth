'use client';

import { SWRProvider } from './SWRProvider';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import { ToastProvider } from '@peakhealth/ui/toast';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps): React.ReactElement => {
  return (
    <SWRProvider>
      <ToastProvider>
        <AuthProvider>{children}</AuthProvider>
      </ToastProvider>
    </SWRProvider>
  );
};
