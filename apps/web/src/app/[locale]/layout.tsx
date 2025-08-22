import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import AppLayout from './(app)/layout';

import './(app)/globals.css';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}): Promise<React.JSX.Element> {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as string)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <AppLayout>{children}</AppLayout>
    </NextIntlClientProvider>
  );
}
