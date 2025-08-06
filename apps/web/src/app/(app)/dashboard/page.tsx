import { Suspense } from 'react';

import Dashboard from '@/features/dashboard/Dashboard';
import { FEATURE_FLAGS } from '@/features/feature-flags';
import { createClient } from '@/lib/supabase/server';

async function getDashboardFeatureFlag() {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return { isEnabled: false, error: 'Database connection not available' };
    }

    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';

    // Check if dashboard feature is enabled in development environment
    const { data: featureFlag, error } = await supabase
      .from('feature_flags')
      .select(
        `
        *,
        feature_flag_environments!inner(*)
      `
      )
      .eq('name', FEATURE_FLAGS.DASHBOARD_FEATURE)
      .eq('feature_flag_environments.environment', environment)
      .eq('feature_flag_environments.is_enabled', true)
      .single();

    if (error) {
      console.error('Error fetching dashboard feature flag:', error);
      return { isEnabled: false, error: 'Failed to fetch feature flag' };
    }

    return { isEnabled: !!featureFlag, error: null };
  } catch (error) {
    console.error('Dashboard feature flag check error:', error);
    return { isEnabled: false, error: 'Internal server error' };
  }
}

const DashboardPage = async () => {
  const { isEnabled, error } = await getDashboardFeatureFlag();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!isEnabled) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Dashboard Coming Soon
          </h2>
          <p className="text-gray-600">
            This feature is currently under development.
          </p>
        </div>
      </div>
    );
  }

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
