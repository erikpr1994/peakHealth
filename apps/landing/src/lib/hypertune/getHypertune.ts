import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import { createSource } from '../../../generated/hypertune';
import { getVercelOverride } from '../../../generated/hypertune.vercel';
import { getAnonymousId } from './anonymousId';

let hypertuneToken = process.env.NEXT_PUBLIC_HYPERTUNE_TOKEN || '';
if (!hypertuneToken) {
  if (process.env.NODE_ENV === 'test') {
    hypertuneToken = 'mock-token-for-tests';
  } else {
    throw new Error('NEXT_PUBLIC_HYPERTUNE_TOKEN is not defined');
  }
}

const hypertuneSource = createSource({
  token: hypertuneToken,
});

export default async function getHypertune(
  // eslint-disable-next-line no-unused-vars
  _params?: Record<string, unknown>
): Promise<ReturnType<typeof hypertuneSource.root>> {
  noStore();
  await hypertuneSource.initIfNeeded(); // Check for flag updates

  const anonymousId = (await getAnonymousId()) ?? '';

  // Respect flag overrides set by the Vercel Toolbar
  hypertuneSource.setOverride(await getVercelOverride());

  return hypertuneSource.root({
    args: {
      context: {
        environment: process.env.NODE_ENV as
          | 'development'
          | 'production'
          | 'test',
        user: {
          id: '', // Empty string for anonymous users
          email: '', // Empty string for anonymous users
        },
        anonymousUser: {
          id: anonymousId, // Use the anonymous ID for anonymous user tracking
        },
      },
    },
  });
}
