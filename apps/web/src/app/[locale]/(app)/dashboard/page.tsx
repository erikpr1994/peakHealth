import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Dashboard from '@/features/dashboard/Dashboard';

const DashboardPage = async () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <Dashboard />
    </Suspense>
  );
};

export default DashboardPage;
