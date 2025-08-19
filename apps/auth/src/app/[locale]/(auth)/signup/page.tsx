import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

import { SignUpForm } from '@/features/auth';
import styles from '@/features/auth/components/page.module.css';

export const dynamic = 'force-static';
export const revalidate = false;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'signup' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

const SignUpPage = (): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpForm />
      </Suspense>
    </div>
  );
};

export default SignUpPage;

