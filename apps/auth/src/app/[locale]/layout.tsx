import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import { routing } from '@/i18n/routing';

import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams(): { locale: string }[] {
  return routing.locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const messages = require(`../../../locales/${locale}/index.json`);
    
    return {
      title: messages.metadata.title,
      description: messages.metadata.description,
    };
  } catch (error) {
    return {
      title: 'Peak Health - Authentication',
      description: 'Sign in or create an account to access Peak Health',
    };
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}): Promise<JSX.Element> {
  // Validate that the incoming locale is supported
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../../locales/${locale}/index.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

