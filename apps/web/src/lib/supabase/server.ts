import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Return null if environment variables are not available (e.g., during build time)
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are not available');
    return null;
  }

  // Try to access request cookies; fall back to a no-op adapter (e.g., during build or SSG)
  let cookieStore: Awaited<ReturnType<typeof cookies>> | null = null;
  try {
    // In Next.js 15, cookies() can be async in some contexts
    cookieStore = await cookies();
  } catch {
    cookieStore = null;
  }

  const cookieAdapter = cookieStore
    ? {
        getAll() {
          return cookieStore!.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: any;
          }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore!.set(name, value, options)
            );
          } catch {
            // Ignore set attempts from Server Components without a mutable response
          }
        },
      }
    : {
        getAll() {
          return [] as { name: string; value: string }[];
        },
        setAll() {
          // no-op when cookies API is unavailable (build/SSG)
        },
      };

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: cookieAdapter as any,
  });
}
