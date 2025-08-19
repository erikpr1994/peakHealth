import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { Inter } from 'next/font/google';
import { notFound, redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { routing } from '@/i18n/routing';

import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams(): { locale: string }[] {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Validate locale and redirect to default if invalid
  if (!hasLocale(routing.locales, locale)) {
    redirect(`/${routing.defaultLocale}`);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const messages = require(`../../../locales/${locale}/index.json`);

    return {
      title: messages.metadata.title,
      description: messages.metadata.description,
    };
  } catch {
    return {
      title: 'Peak Health - Authentication',
      description: 'Sign in or create an account to access Peak Health',
    };
  }
}

const LocaleLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> => {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;

  // Validate locale and redirect to default if invalid
  if (!hasLocale(routing.locales, locale)) {
    redirect(`/${routing.defaultLocale}`);
  }

  // Enable static rendering
  setRequestLocale(locale);

  let messages;
  try {
    // eslint-disable-next-line no-unsanitized/method
    messages = (await import(`../../../locales/${locale}/index.json`)).default;
  } catch {
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
};

export default LocaleLayout;
