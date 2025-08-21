// Deep import to avoid bundling browser client in Edge runtime
import { NextResponse, type NextRequest } from 'next/server';
import getHypertune from './lib/hypertune/getHypertune';

export async function middleware(request: NextRequest): Promise<NextResponse> {
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
      // If authenticated, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
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

  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );
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
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
