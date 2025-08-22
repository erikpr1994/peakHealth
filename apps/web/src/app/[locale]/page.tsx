import { redirect } from 'next/navigation';

export default function LocalePage({
  params: { locale },
}: {
  params: { locale: string };
}): never {
  // Redirect to the dashboard for the current locale
  redirect(`/${locale}/dashboard`);
}
