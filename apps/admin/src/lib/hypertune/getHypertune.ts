// Using Next.js server-only features
import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import { createSource, type Environment } from '../../../generated/hypertune';
import { getVercelOverride } from '../../../generated/hypertune.vercel';

let hypertuneToken = process.env.NEXT_PUBLIC_HYPERTUNE_TOKEN;
if (!hypertuneToken) {
  // In test environment, provide a mock token to prevent errors
  if (process.env.NODE_ENV === 'test') {
    hypertuneToken = 'mock-token-for-tests';
  } else {
    throw new Error('NEXT_PUBLIC_HYPERTUNE_TOKEN is not defined');
  }
}

const hypertuneSource = createSource({
  token: hypertuneToken,
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

export default async function getHypertune(
  params?: Record<string, unknown>
): Promise<ReturnType<typeof hypertuneSource.root>> {
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
