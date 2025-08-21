import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import '@peakhealth/ui/design-system';
import '@peakhealth/ui/components';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { HypertuneProvider } from '../../generated/hypertune.react';
import getHypertune from '@/lib/hypertune/getHypertune';

export const metadata: Metadata = {
  title: 'Peak Health Admin Dashboard',
  description: 'Admin dashboard for Peak Health platform',
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.JSX.Element> => {
  const hypertune = await getHypertune();

  const serverDehydratedState = hypertune.dehydrate();
  const serverRootArgs = hypertune.getRootArgs();

  const hypertuneToken = process.env.NEXT_PUBLIC_HYPERTUNE_TOKEN;
  if (!hypertuneToken) {
    throw new Error('NEXT_PUBLIC_HYPERTUNE_TOKEN is not defined');
  }

  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        <HypertuneProvider
          createSourceOptions={{
            token: hypertuneToken,
          }}
          dehydratedState={serverDehydratedState}
          rootArgs={serverRootArgs}
        >
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
        </HypertuneProvider>
      </body>
    </html>
  );
};

export default RootLayout;
