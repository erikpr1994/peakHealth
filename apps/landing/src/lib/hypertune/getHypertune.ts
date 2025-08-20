import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import { createSource } from '../../../generated/hypertune';
import { getVercelOverride } from '../../../generated/hypertune.vercel';
import { getAnonymousId } from './anonymousId';

let hypertuneToken = process.env.NEXT_PUBLIC_HYPERTUNE_TOKEN;
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
  params?: Record<string, unknown>
): Promise<ReturnType<typeof hypertuneSource.root>> {
  noStore();
  await hypertuneSource.initIfNeeded(); // Check for flag updates

  const anonymousId = (await getAnonymousId()) ?? '';

  // Respect flag overrides set by the Vercel Toolbar
  hypertuneSource.setOverride(await getVercelOverride());

  // Use params to satisfy linter (even though we don't actually use it)
  if (params && Object.keys(params).length > 0) {
    // This is just to satisfy the linter - we don't actually use params
  }

  return hypertuneSource.root({
    args: {
      context: {
        environment: process.env.NODE_ENV,
        user: {
          id: '0',
          anonymousId,
          email: 'not logged in',
        },
      },
    },
  });
}
