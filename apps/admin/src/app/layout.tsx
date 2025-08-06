import type { Metadata } from 'next';
import './globals.css';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'Peak Health Admin Dashboard',
  description: 'Admin dashboard for Peak Health platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        <div className="h-screen flex w-full bg-background overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-0">
            <Header />
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
