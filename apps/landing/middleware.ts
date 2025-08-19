import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';
import getHypertune from './src/lib/hypertune/getHypertune';
import { setAnonymousIdIfNeeded } from './src/lib/hypertune/anonymousId';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(
  request: NextRequest,
  context: NextFetchEvent
): Promise<NextResponse | undefined> {
  // Initialize Hypertune
  const hypertune = await getHypertune();

  // Check Hypertune flag (remove in production if not needed)
  hypertune.roadmap({ fallback: false });

  // Ensure logs are flushed
  context.waitUntil(hypertune.flushLogs());

  setAnonymousIdIfNeeded(request, NextResponse.next());

  // Call the next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
