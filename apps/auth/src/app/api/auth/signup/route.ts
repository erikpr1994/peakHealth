import { validateEmail, validatePassword } from '@peakhealth/auth-utils';
import { NextRequest, NextResponse } from 'next/server';

import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      returnUrl?: string;
    };

    const { email, password, firstName, lastName } = body;

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: passwordValidation.errors[0] || 'Password is invalid' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Check if user already exists - we'll let Supabase handle this during signup
    // The signup will fail if the user already exists

    // Create user with environment-specific email confirmation
    const isDevelopment = process.env.NODE_ENV === 'development';
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: isDevelopment, // Only auto-confirm in development
      user_metadata: {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
      },
      app_metadata: {
        roles: ['user'], // Default role
        groups: ['free'], // Default group
      },
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Signup error:', error);
      return NextResponse.json(
        { error: 'Failed to create account' },
        { status: 500 }
      );
    }

    if (!data.user) {
      return NextResponse.json(
        { error: 'Failed to create account' },
        { status: 500 }
      );
    }

    // Set cross-domain cookie for session management
    const response = NextResponse.json(
      {
        message: 'Account created successfully',
        user: {
          id: data.user.id,
          email: data.user.email,
        },
      },
      { status: 201 }
    );

    // Note: createUser doesn't return a session by default
    // The user will need to sign in separately to get a session

    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
