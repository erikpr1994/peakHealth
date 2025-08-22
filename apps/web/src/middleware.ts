// Deep import to avoid bundling browser client in Edge runtime
import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import getHypertune from './lib/hypertune/getHypertune';
import { routing } from './i18n/routing';

// Create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Skip internationalization for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Handle internationalization first
  const intlResponse = intlMiddleware(request);
  if (intlResponse) return intlResponse;

  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  // Initialize Hypertune with request for Edge runtime compatibility
  const hypertune = await getHypertune({}, request);

  // Check Hypertune flag (remove in production if not needed)
  hypertune.roadmap({ fallback: false });

  // Flush logs - call directly since waitUntil is not available in middleware
  hypertune.flushLogs();

  // Lightweight auth check in Edge without importing Supabase SDK
  const cookies = request.cookies.getAll();

  // Supabase chunked cookie names look like: sb-<projectRef>-auth-token.0 / .1
  const hasSupabaseAuthToken = cookies.some(c =>
    /^sb-[^-]+-auth-token(\.\d+)?$/.test(c.name)
  );
  const _hasCrossDomainAuthToken = Boolean(
    request.cookies.get('auth-token')?.value
  );

  // For now, let's be more strict and require Supabase auth token
  // The cross-domain auth token might not be properly validated
  const isAuthenticated = hasSupabaseAuthToken;

  // Handle root route logic
  if (request.nextUrl.pathname === '/') {
    if (isAuthenticated) {
      // If authenticated, redirect to dashboard with default locale
      return NextResponse.redirect(
        new URL(`/${routing.defaultLocale}/dashboard`, request.url)
      );
    } else {
      // If not authenticated, redirect to landing app
      const landingUrl =
        process.env.NEXT_PUBLIC_WEB_APP_URL || 'http://localhost:3024';
      return NextResponse.redirect(new URL(landingUrl));
    }
  }

  // Define protected routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/calendar',
    '/exercises',
    '/routines',
    '/workout-tracker',
    '/equipment',
    '/gyms',
    '/health',
    '/performance',
    '/suggestions',
    '/trainer-and-clubs',
    '/account-settings',
    '/app-settings',
    '/help-support',
  ];

  // No local auth routes anymore
  const authRoutes: string[] = [];

  // Check if the pathname matches any protected route, accounting for locale prefixes
  const isProtectedRoute = protectedRoutes.some(route => {
    // Check for exact match or locale-prefixed match
    return (
      request.nextUrl.pathname === route ||
      request.nextUrl.pathname.startsWith(
        `/${routing.defaultLocale}${route}`
      ) ||
      request.nextUrl.pathname.startsWith(`/es${route}`)
    );
  });

  const isAuthRoute = authRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Redirect unauthenticated users to external landing for protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const landing =
      process.env.NEXT_PUBLIC_WEB_APP_URL || 'http://localhost:3024';
    return NextResponse.redirect(new URL(landing));
  }

  // (Kept for completeness) Redirect authenticated users away from any auth routes
  if (isAuthRoute && isAuthenticated) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
