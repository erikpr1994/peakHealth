import { AppSelector } from '@/features/auth/components/AppSelector';

// Force static generation with no revalidation
export const dynamic = 'force-static';
export const revalidate = false;

const AppSelectorPage = (): React.JSX.Element => {
  return <AppSelector />;
};

export default AppSelectorPage;
