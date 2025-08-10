import {
  createServerClient,
  type CookieMethodsServer,
  type CookieOptions,
} from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(): Promise<NextResponse> {
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
          getAll(): { name: string; value: string }[] {
            return cookieStore?.getAll() || [];
          },
          setAll(
            cookiesToSet: {
              name: string;
              value: string;
              options: CookieOptions;
            }[]
          ): void {
            try {
              cookiesToSet.forEach(({ name, options, value }) =>
                cookieStore?.set(name, value, options)
              );
            } catch {
              // ignore
            }
          },
        }
      : {
          getAll(): { name: string; value: string }[] {
            return [] as { name: string; value: string }[];
          },
          setAll(): void {
            // no-op
          },
        };

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: cookieAdapter,
    });

    // Sign out the user
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
