// Deep import to avoid bundling browser client in Edge runtime
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  // Lightweight auth check in Edge without importing Supabase SDK
  const accessToken = request.cookies.get('sb-access-token')?.value;
  const isAuthenticated = Boolean(accessToken);

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

  // Define auth routes that should redirect authenticated users
  const authRoutes = ['/login', '/signup'];

  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Redirect unauthenticated users to login for protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth routes to dashboard
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
