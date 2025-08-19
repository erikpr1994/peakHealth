import { redirect } from 'next/navigation';

const LocaleAuthRootPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<never> => {
  const { locale } = await params;
  redirect(`/${locale}/login`);
};

export default LocaleAuthRootPage;
