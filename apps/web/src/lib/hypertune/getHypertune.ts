import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';
import * as hypertune from '../../../generated/hypertune';
import { createAdminClient } from '../supabase/admin';

type Environment = 'development' | 'production' | 'test';

function getEnvironment(): Environment {
  const env = process.env.NODE_ENV;
  if (env === 'production') return 'production';
  if (env === 'test') return 'test';
  return 'development';
}

async function getUserFromCookies(
  request?: NextRequest
): Promise<hypertune.User | null> {
  try {
    let userCookie: { name: string; value: string } | undefined;

    if (request) {
      // Edge runtime context (middleware)
      userCookie = request.cookies.get('user');
    } else {
      // Server-side context
      const cookieStore = await cookies();
      userCookie = cookieStore.get('user');
    }

    if (!userCookie?.value) {
      // No user cookie - this shouldn't happen in the web app
      // as anonymous users are redirected to landing
      return null;
    }

    const user = JSON.parse(userCookie.value);

    // Authenticated user - use actual user ID and email
    return {
      id: user.id || '',
      email: user.email || '',
    };
  } catch {
    // Fallback for any parsing errors
    return null;
  }
}

export default async function getHypertune(
  params?: Record<string, unknown>,
  request?: NextRequest
): Promise<ReturnType<typeof hypertuneSource.root>> {
  const hypertuneSource = hypertune.createSource({
    token: process.env.NEXT_PUBLIC_HYPERTUNE_TOKEN || '',
    variableValues: {},
    override: null,
    key: typeof window === 'undefined' ? 'server' : 'client',
  });

  const user = await getUserFromCookies(request);
  const environment = getEnvironment();

  const context: hypertune.Context = {
    user: user || {
      id: '',
      email: '',
    },
    environment,
    anonymousUser: {
      id: '', // Empty string since we don't need anonymous tracking for authenticated users
    },
  };

  return hypertuneSource.root({ args: { context } });
}
