'use client';

import { SWRProvider } from './SWRProvider';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import { ToastProvider } from '@peakhealth/ui';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps): React.ReactElement => {
  console.log('Providers component rendering');
  return (
    <SWRProvider>
      <AuthProvider>
        <ToastProvider>
          {children}
          {/* Debug element to verify ToastProvider is working */}
          <div id="toast-debug" style={{ display: 'none' }}>ToastProvider is active</div>
        </ToastProvider>
      </AuthProvider>
    </SWRProvider>
  );
};
