import { cookies } from 'next/headers';
import * as hypertune from '../../../generated/hypertune';
import { createAdminClient } from '../supabase/admin';

type Environment = 'development' | 'production' | 'test';

function getEnvironment(): Environment {
  const env = process.env.NODE_ENV;
  if (env === 'production') return 'production';
  if (env === 'test') return 'test';
  return 'development';
}

async function getUserFromCookies(): Promise<hypertune.User | null> {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');
    if (!userCookie?.value) return null;

    const user = JSON.parse(userCookie.value);
    return {
      id: user.id || 'anonymous',
      anonymousId: user.id ? undefined : user.anonymousId || 'anonymous',
      email: user.email || '',
    };
  } catch {
    return null;
  }
}

export default async function getHypertune(
  params?: Record<string, unknown>
): Promise<ReturnType<typeof hypertuneSource.root>> {
  const hypertuneSource = hypertune.createSource({
    token: process.env.NEXT_PUBLIC_HYPERTUNE_TOKEN || '',
    variableValues: {},
    override: null,
    key: typeof window === 'undefined' ? 'server' : 'client',
  });

  const user = await getUserFromCookies();
  const environment = getEnvironment();

  const context: hypertune.Context = {
    user: user || {
      id: 'anonymous',
      anonymousId: 'anonymous',
      email: '',
    },
    environment,
  };

  return hypertuneSource.root({ args: { context } });
}
