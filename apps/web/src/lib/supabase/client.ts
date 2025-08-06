import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Return null if environment variables are not available (e.g., during build time)
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are not available');
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
