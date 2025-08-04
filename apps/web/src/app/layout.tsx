import type { Metadata } from 'next';

import './(app)/globals.css';
import { SWRProvider } from '@/components/providers/SWRProvider';
import { AuthProvider } from '@/features/auth/context/AuthContext';

export const metadata: Metadata = {
  title: 'Peak Health',
  description:
    'Your ultimate companion for tracking workouts, monitoring progress, and achieving your fitness goals.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <SWRProvider>
          <AuthProvider>{children}</AuthProvider>
        </SWRProvider>
      </body>
    </html>
  );
};

export default RootLayout;
