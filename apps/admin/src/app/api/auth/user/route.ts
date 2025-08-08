import {
  createServerClient,
  type CookieMethodsServer,
  type CookieOptions,
} from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Missing Supabase environment variables' },
        { status: 500 }
      );
    }

    let cookieStore: Awaited<ReturnType<typeof cookies>> | null = null;
    try {
      cookieStore = await cookies();
    } catch {
      cookieStore = null;
    }

    const cookieAdapter: CookieMethodsServer = cookieStore
      ? {
          getAll() {
            return cookieStore?.getAll() || [];
          },
          setAll(
            cookiesToSet: {
              name: string;
              value: string;
              options: CookieOptions;
            }[]
          ) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore?.set(name, value, options)
              );
            } catch {
              // ignore
            }
          },
        }
      : {
          getAll() {
            return [] as { name: string; value: string }[];
          },
          setAll() {
            // no-op
          },
        };

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: cookieAdapter,
    });

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ user: null });
    }

    // Check if user has admin access
    const hasAdminAccess =
      user.app_metadata?.user_types?.includes('admin') ||
      user.app_metadata?.primary_user_type === 'admin';

    if (!hasAdminAccess) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
