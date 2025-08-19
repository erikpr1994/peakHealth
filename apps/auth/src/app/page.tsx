import { routing } from '@/i18n/routing';
import { redirect } from 'next/navigation';

const RootPage = (): React.JSX.Element => {
  redirect(`/${routing.defaultLocale}/login`);
  // This is unreachable, but needed for TypeScript
  return <></>;
};

export default RootPage;
