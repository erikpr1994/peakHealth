import { getTranslations } from 'next-intl/server';

import { AppSelector } from '@/features/auth';

export const dynamic = 'force-static';
export const revalidate = false;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'appSelector' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

const AppsPage = (): React.JSX.Element => {
  return <AppSelector />;
};

export default AppsPage;

