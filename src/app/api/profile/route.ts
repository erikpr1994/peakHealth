import { NextRequest, NextResponse } from 'next/server';

import { ProfileUpdateData } from '@/features/profile/types/profile';
import { createClient } from '@/lib/supabase/server';
import { safeDateConversion } from '@/lib/utils';

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get user profile data using the database function
    const { data: profileData, error: profileError } = await supabase.rpc(
      'get_user_profile',
      { user_id_param: user.id }
    );

    if (profileError) {
      // eslint-disable-next-line no-console
      console.error('Error fetching profile data:', profileError);
      return NextResponse.json(
        { error: 'Failed to fetch profile data' },
        { status: 500 }
      );
    }

    // Parse the JSONB data
    const profile = profileData?.[0]?.profile_data || {};
    const stats = profileData?.[0]?.stats_data || {};
    const achievements =
      (profileData?.[0]?.achievements_data as unknown[]) || [];

    return NextResponse.json({
      profile: {
        id: user.id,
        ...profile,
        created_at: safeDateConversion(profile.created_at),
        updated_at: safeDateConversion(profile.updated_at),
        onboarding_completed_at: safeDateConversion(
          profile.onboarding_completed_at
        ),
      },
      stats: {
        user_id: user.id,
        total_workouts: stats.total_workouts || 0,
        days_active: stats.days_active || 0,
        hours_trained: stats.hours_trained || 0,
        achievements_count: stats.achievements_count || 0,
        last_updated: safeDateConversion(stats.last_updated) || new Date(),
      },
      achievements: achievements.map((achievement: unknown) => {
        const achievementObj = achievement as Record<string, unknown>;
        return {
          ...achievementObj,
          earned_at: safeDateConversion(achievementObj.earned_at),
        };
      }),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Profile API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const updateData: ProfileUpdateData = await request.json();

    // Update or insert profile data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (profileError) {
      // eslint-disable-next-line no-console
      console.error('Error updating profile:', profileError);
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      profile: {
        id: profile.id,
        bio: profile.bio,
        fitness_level: profile.fitness_level,
        time_available: profile.time_available,
        equipment_access: profile.equipment_access,
        experience: profile.experience,
        goals: profile.goals,
        workout_types: profile.workout_types,
        limitations: profile.limitations,
        motivation: profile.motivation,
        onboarding_completed_at: safeDateConversion(
          profile.onboarding_completed_at
        ),
        created_at: safeDateConversion(profile.created_at),
        updated_at: safeDateConversion(profile.updated_at),
      },
      message: 'Profile updated successfully',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Profile update API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
