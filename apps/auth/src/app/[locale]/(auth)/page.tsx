import { redirect } from 'next/navigation';

export default function LocaleAuthRootPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  redirect(`/${locale}/login`);
}

