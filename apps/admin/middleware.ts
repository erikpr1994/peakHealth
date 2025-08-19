import { NextResponse, type NextRequest } from 'next/server';
import getHypertune from './src/lib/hypertune/getHypertune';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next();

  // Initialize Hypertune
  const hypertune = await getHypertune();

  // Check Hypertune flag (remove in production if not needed)
  hypertune.roadmap({ fallback: false });

  // Flush logs
  // Use NextResponse.next() context for waitUntil
  response.waitUntil(hypertune.flushLogs());

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
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
