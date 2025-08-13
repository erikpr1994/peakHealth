import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Peak Health - Your Ultimate Fitness Companion',
  description:
    'Track workouts, monitor progress, and achieve your fitness goals with Peak Health. Join thousands of users transforming their fitness journey.',
  keywords:
    'fitness, workout tracker, health, exercise, progress tracking, gym',
  authors: [{ name: 'Peak Health Team' }],
  openGraph: {
    title: 'Peak Health - Your Ultimate Fitness Companion',
    description:
      'Track workouts, monitor progress, and achieve your fitness goals with Peak Health.',
    url: 'https://peakhealth.es',
    siteName: 'Peak Health',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Peak Health - Fitness Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peak Health - Your Ultimate Fitness Companion',
    description:
      'Track workouts, monitor progress, and achieve your fitness goals with Peak Health.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <div
          className={`min-h-screen bg-background font-sans antialiased ${inter.className}`}
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
