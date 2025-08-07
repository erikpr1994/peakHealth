import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // Check if user is authenticated by getting the session
  let session = null;
  let user = null;

  try {
    const {
      data: { session: userSession },
    } = await supabase.auth.getSession();
    session = userSession;

    if (session) {
      const {
        data: { user: userData },
      } = await supabase.auth.getUser();
      user = userData;
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('Auth session missing')
    ) {
      // Expected for unauthenticated users
    } else {
      console.error('Unexpected auth error in middleware:', error);
    }
  }

  // Check if user has admin access
  const hasAdminAccess =
    user?.app_metadata?.user_types?.includes('admin') ||
    user?.app_metadata?.primary_user_type === 'admin';

  // If not authenticated, redirect to auth app domain
  if (!session) {
    const currentDomain = request.nextUrl.hostname;
    const authDomain =
      process.env.NODE_ENV === 'development'
        ? 'localhost:3000'
        : `auth.${currentDomain.replace(/^admin\./, '')}`;

    const authUrl = new URL('/', `http://${authDomain}`);
    authUrl.searchParams.set('redirect', request.url);
    return NextResponse.redirect(authUrl);
  }

  // If authenticated but not admin, redirect to access denied on auth app
  if (!hasAdminAccess) {
    const currentDomain = request.nextUrl.hostname;
    const authDomain =
      process.env.NODE_ENV === 'development'
        ? 'localhost:3000'
        : `auth.${currentDomain.replace(/^admin\./, '')}`;

    const accessDeniedUrl = new URL('/access-denied', `http://${authDomain}`);
    return NextResponse.redirect(accessDeniedUrl);
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
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
