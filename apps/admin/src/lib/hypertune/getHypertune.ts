// Using Next.js server-only features
import 'server-only';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { unstable_noStore as noStore } from 'next/cache';
import { createSource, type Environment } from '../../../generated/hypertune';
import { getVercelOverride } from '../../../generated/hypertune.vercel';

const hypertuneToken = process.env.NEXT_PUBLIC_HYPERTUNE_TOKEN;
if (!hypertuneToken) {
  // In test environment, provide a mock token to prevent errors
  if (process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line no-console
    console.warn(
      'NEXT_PUBLIC_HYPERTUNE_TOKEN is not defined in test environment, using mock token'
    );
  } else {
    throw new Error('NEXT_PUBLIC_HYPERTUNE_TOKEN is not defined');
  }
}

const hypertuneSource = createSource({
  token: hypertuneToken || 'mock-token-for-tests',
});

// Map NODE_ENV to the expected Environment type
function getEnvironment(): Environment {
  const nodeEnv = process.env.NODE_ENV;

  switch (nodeEnv) {
    case 'development':
    case 'production':
    case 'test':
      return nodeEnv;
    default:
      // Default to development for unknown environments
      return 'development';
  }
}

export default async function getHypertune(params?: {
  headers?: ReadonlyHeaders;
  cookies?: ReadonlyRequestCookies;
}): Promise<ReturnType<typeof hypertuneSource.root>> {
  noStore();
  await hypertuneSource.initIfNeeded(); // Check for flag updates

  // Respect flag overrides set by the Vercel Toolbar
  hypertuneSource.setOverride(await getVercelOverride());

  return hypertuneSource.root({
    args: {
      context: {
        environment: getEnvironment(),
        user: {
          anonymousId: '0',
          id: '0', // This will be replaced with the actual user ID in a real implementation
          email: 'admin@example.com', // This will be replaced with the actual user email
        },
      },
    },
  });
}
