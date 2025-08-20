import 'server-only';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { unstable_noStore as noStore } from 'next/cache';
import { createSource } from '../../../generated/hypertune';
import { getVercelOverride } from '../../../generated/hypertune.vercel';
import { getAnonymousId } from './anonymousId';

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

export default async function getHypertune(_params?: {
  headers?: ReadonlyHeaders;
  cookies?: ReadonlyRequestCookies;
}): Promise<ReturnType<typeof hypertuneSource.root>> {
  noStore();
  await hypertuneSource.initIfNeeded(); // Check for flag updates

  const anonymousId = (await getAnonymousId()) ?? '';

  // Respect flag overrides set by the Vercel Toolbar
  hypertuneSource.setOverride(await getVercelOverride());

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
