'use client';

import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface User {
  id: string;
  email: string;
  app_metadata: {
    user_types: string[];
    primary_user_type: string;
    groups: string[];
    permissions: Record<string, boolean>;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasUserType: (userType: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const userFetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const data = await response.json();
  return data.user;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const { data: user, mutate: mutateUser } = useSWR<User | null>(
    '/api/auth/user',
    userFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await mutateUser();
      } else if (event === 'SIGNED_OUT') {
        await mutateUser(null);
        router.push('/login');
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [mutateUser, router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const hasPermission = (permission: string) => {
    return user?.app_metadata?.permissions?.[permission] || false;
  };

  const hasUserType = (userType: string) => {
    return user?.app_metadata?.user_types?.includes(userType) || false;
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        logout,
        hasPermission,
        hasUserType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
