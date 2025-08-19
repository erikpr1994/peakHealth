// Using Next.js server-only features
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { unstable_noStore as noStore } from 'next/cache';
import { createSource } from '../../../generated/hypertune';
import { getVercelOverride } from '../../../generated/hypertune.vercel';

const hypertuneToken = process.env.NEXT_PUBLIC_HYPERTUNE_TOKEN;
if (!hypertuneToken) {
  throw new Error('NEXT_PUBLIC_HYPERTUNE_TOKEN is not defined');
}

const hypertuneSource = createSource({
  token: hypertuneToken,
});

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
        environment: process.env.NODE_ENV,
        user: {
          id: '0', // This will be replaced with the actual user ID in a real implementation
          email: 'admin@example.com', // This will be replaced with the actual user email
        },
      },
    },
  });
}
