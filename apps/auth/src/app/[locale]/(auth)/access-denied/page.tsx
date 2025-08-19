import { AccessDeniedPage } from '@/features/auth/components/AccessDeniedPage';

// Force static generation with no revalidation
export const dynamic = 'force-static';
export const revalidate = false;

const AccessDenied = (): React.JSX.Element => {
  return <AccessDeniedPage />;
};

export default AccessDenied;
