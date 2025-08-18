import type { Metadata } from 'next';
import './globals.css';
import '@peakhealth/ui/design-system';
import '@peakhealth/ui/components';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'Peak Health Admin Dashboard',
  description: 'Admin dashboard for Peak Health platform',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element => {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        <AuthProvider>
          <div className="h-screen flex w-full bg-background overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-0">
              <Header />
              <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
