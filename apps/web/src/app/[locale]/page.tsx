import { redirect } from 'next/navigation';
import { use } from 'react';

export default function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): never {
  // Redirect to the dashboard for the current locale
  const { locale } = use(params);
  redirect(`/${locale}/dashboard`);
}
