import type { Metadata } from 'next';
import './globals.css';

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
        {children}
      </body>
    </html>
  );
}
