import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

import { LoginForm } from '@/features/auth';
import styles from '@/features/auth/components/page.module.css';

export const dynamic = 'force-static';
export const revalidate = false;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'login' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

const LoginPage = (): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;

