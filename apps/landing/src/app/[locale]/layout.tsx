import { Inter } from 'next/font/google';
import React from 'react';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { routing } from '@/i18n/routing';
import '../globals.css';

import { HypertuneProvider } from '../../../generated/hypertune.react';
import getHypertune from '@/lib/hypertune/getHypertune';

const inter = Inter({ subsets: ['latin'] });

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams(): Promise<
  Array<{ locale: string }>
> {
  return routing.locales.map(locale => ({ locale }));
}

const LocaleLayout = async ({
  children,
  params,
}: LocaleLayoutProps): Promise<React.JSX.Element> => {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const hypertune = await getHypertune();

  const serverDehydratedState = hypertune.dehydrate();
  const serverRootArgs = hypertune.getRootArgs();

  const hypertuneToken = process.env.NEXT_PUBLIC_HYPERTUNE_TOKEN || '';
  if (!hypertuneToken) {
    throw new Error('NEXT_PUBLIC_HYPERTUNE_TOKEN is not defined');
  }

  return (
    <html lang={locale} className="scroll-smooth">
      <body>
        <NextIntlClientProvider locale={locale}>
          <HypertuneProvider
            createSourceOptions={{
              token: hypertuneToken,
            }}
            dehydratedState={serverDehydratedState}
            rootArgs={serverRootArgs}
          >
            <div
              className={`min-h-screen bg-background font-sans antialiased ${inter.className}`}
            >
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </HypertuneProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
