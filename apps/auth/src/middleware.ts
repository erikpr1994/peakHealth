import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

// Create the middleware with next-intl
const intlMiddleware = createMiddleware({
  // The locales supported by the application
  locales: routing.locales,
  // The default locale to use if no locale matches
  defaultLocale: routing.defaultLocale,
  // Whether to add a prefix for the default locale
  localePrefix: routing.localePrefix,
});

// Export the middleware handler
export default function middleware(request: NextRequest) {
  // Skip middleware for paths that don't need internationalization
  const publicPatterns = [
    // Static files
    /^\/(?:_next|favicon\.ico|robots\.txt|sitemap\.xml|manifest\.json)/,
    // API routes
    /^\/api\//,
  ];

  // Skip middleware for paths that match the public patterns
  if (publicPatterns.some((pattern) => pattern.test(request.nextUrl.pathname))) {
    return;
  }

  // Apply the intl middleware for all other paths
  return intlMiddleware(request);
}

// Configure the matcher for the middleware
export const config = {
  // Match all paths except for:
  // - API routes (/api/*)
  // - Static files (_next/*)
  // - Other static files (favicon.ico, robots.txt, etc.)
  matcher: ['/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)'],
};

