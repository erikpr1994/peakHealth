import { getTranslations } from 'next-intl/server';

import { AccessDeniedPage as AccessDeniedComponent } from '@/features/auth';

export const dynamic = 'force-static';
export const revalidate = false;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'accessDenied' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

const AccessDeniedPage = (): React.JSX.Element => {
  return <AccessDeniedComponent />;
};

export default AccessDeniedPage;

