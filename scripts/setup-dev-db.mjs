import { execSync } from 'child_process';

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Load environment variables manually
const envPath = 'apps/web/.env.local';
try {
  const envContent = readFileSync(envPath, 'utf8');
  const envVars = envContent.split('\n').reduce((acc, line) => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      acc[key.trim()] = valueParts.join('=').trim();
    }
    return acc;
  }, {});

  Object.entries(envVars).forEach(([key, value]) => {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  });
} catch (error) {
  console.warn('Could not load .env.local file:', error.message);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  console.log(
    'Make sure you have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in apps/web/.env.local'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Sets up the development database with users and sample data
 */
async function setupDevDatabase() {
  try {
    console.log('🚀 Setting up development database...');

    // Step 1: Reset the database (optional in CI/e2e)
    const shouldSkipReset =
      process.env.SKIP_DB_RESET === '1' || process.env.SKIP_DB_RESET === 'true';
    if (shouldSkipReset) {
      console.log('\n⏭️  Skipping Supabase database reset (SKIP_DB_RESET set)');
    } else {
      console.log('\n📊 Resetting Supabase database...');
      try {
        execSync('supabase db reset', { stdio: 'inherit' });
        console.log('✅ Database reset successful');
      } catch (error) {
        console.warn(
          '⚠️  Database reset failed, continuing with user upserts:',
          error.message
        );
        console.log('Make sure Supabase is running: pnpm supabase:start');
        // Intentionally continue to attempt user creation/upsert so tests can proceed
      }
    }

    // Step 2: Create users
    console.log('\n👤 Creating users...');

    // Check if user already exists
    const { data: users, error: userError } =
      await supabase.auth.admin.listUsers();

    if (userError) {
      console.error('Error fetching users:', userError);
      return;
    }

    const adminEmail = 'erikpastorrios1994@gmail.com';
    const trainerEmail = 'trainer@example.com';
    const regularEmail = 'user@example.com';

    const existingAdmin = users.users.find(u => u.email === adminEmail);
    const existingTrainer = users.users.find(u => u.email === trainerEmail);
    const existingRegular = users.users.find(u => u.email === regularEmail);

    // Admin user
    let adminUserId;
    if (existingAdmin) {
      console.log('Admin user already exists, updating permissions...');

      // Update existing user with admin permissions
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        existingAdmin.id,
        {
          app_metadata: {
            groups: ['admin', 'beta', 'premium', 'free'],
            permissions: {
              admin_access: true,
              manage_content: true,
              manage_feature_flags: true,
              manage_system_settings: true,
              manage_users: true,
              view_analytics: true,
            },
            primary_user_type: 'admin',
            user_types: ['admin', 'trainer', 'regular'],
            subscription_tier: 'premium',
            features: [
              'basic_exercises',
              'workout_tracking',
              'progress_advanced',
              'custom_routines',
              'exercise_library',
              'unlimited_routines',
              'advanced_analytics',
              'nutrition_tracking',
              'recovery_tracking',
              'personalized_recommendations',
              'client_management',
              'admin_panel',
            ],
            data_access_rules: {
              own_profile: 'full',
              own_workouts: 'full',
              own_progress: 'full',
              client_profiles: 'full',
              client_workouts: 'full',
              client_progress: 'full',
              medical_records: 'full',
              system_settings: 'full',
            },
          },
        }
      );

      if (updateError) {
        console.error('Error updating user:', updateError);
        return;
      }

      adminUserId = existingAdmin.id;
      console.log('✅ User permissions updated successfully');
    } else {
      console.log('Creating new admin user...');

      // Create new user with admin permissions
      const { data: newUser, error: createError } =
        await supabase.auth.admin.createUser({
          app_metadata: {
            groups: ['admin', 'beta', 'premium', 'free'],
            permissions: {
              admin_access: true,
              manage_content: true,
              manage_feature_flags: true,
              manage_system_settings: true,
              manage_users: true,
              view_analytics: true,
            },
            primary_user_type: 'admin',
            user_types: ['admin', 'trainer', 'regular'],
            subscription_tier: 'premium',
            features: [
              'basic_exercises',
              'workout_tracking',
              'progress_advanced',
              'custom_routines',
              'exercise_library',
              'unlimited_routines',
              'advanced_analytics',
              'nutrition_tracking',
              'recovery_tracking',
              'personalized_recommendations',
              'client_management',
              'admin_panel',
            ],
            data_access_rules: {
              own_profile: 'full',
              own_workouts: 'full',
              own_progress: 'full',
              client_profiles: 'full',
              client_workouts: 'full',
              client_progress: 'full',
              medical_records: 'full',
              system_settings: 'full',
            },
          },
          email: adminEmail,
          email_confirm: true,
          password: 'password123', // You can change this
          user_metadata: {
            fullName: 'Erik Pastor Rios',
            name: 'Erik',
          },
        });

      if (createError) {
        console.error('Error creating user:', createError);
        return;
      }

      adminUserId = newUser.user.id;
      console.log('✅ Admin user created successfully');
      console.log('User ID:', adminUserId);
    }

    // Trainer user (trainer + regular), accessible to Web (via groups) and Pro (via role)
    if (existingTrainer) {
      console.log('Trainer user already exists, updating metadata...');
      const { error: updateTrainerError } =
        await supabase.auth.admin.updateUserById(existingTrainer.id, {
          app_metadata: {
            groups: ['beta', 'premium', 'free'],
            primary_user_type: 'trainer',
            user_types: ['trainer', 'regular'],
            subscription_tier: 'premium',
            permissions: {
              view_exercises: true,
              create_workouts: true,
              track_progress: true,
              view_routines: true,
              manage_clients: true,
              create_routines: true,
              view_client_progress: true,
            },
            features: [
              'basic_exercises',
              'workout_tracking',
              'progress_advanced',
              'custom_routines',
              'exercise_library',
              'unlimited_routines',
              'advanced_analytics',
              'nutrition_tracking',
              'recovery_tracking',
              'personalized_recommendations',
              'client_management',
            ],
            data_access_rules: {
              own_profile: 'full',
              own_workouts: 'full',
              own_progress: 'full',
              client_profiles: 'training_only',
              client_workouts: 'full',
              client_progress: 'full',
            },
          },
          user_metadata: {
            fullName: 'Taylor Trainer',
            name: 'Taylor',
          },
        });
      if (updateTrainerError) {
        console.error('Error updating trainer user:', updateTrainerError);
      } else {
        console.log('✅ Trainer user updated');
      }
    } else {
      console.log('Creating trainer user...');
      const { data: trainerUser, error: createTrainerError } =
        await supabase.auth.admin.createUser({
          app_metadata: {
            groups: ['beta', 'premium', 'free'],
            primary_user_type: 'trainer',
            user_types: ['trainer', 'regular'],
            subscription_tier: 'premium',
            permissions: {
              view_exercises: true,
              create_workouts: true,
              track_progress: true,
              view_routines: true,
              manage_clients: true,
              create_routines: true,
              view_client_progress: true,
            },
            features: [
              'basic_exercises',
              'workout_tracking',
              'progress_advanced',
              'custom_routines',
              'exercise_library',
              'unlimited_routines',
              'advanced_analytics',
              'nutrition_tracking',
              'recovery_tracking',
              'personalized_recommendations',
              'client_management',
            ],
            data_access_rules: {
              own_profile: 'full',
              own_workouts: 'full',
              own_progress: 'full',
              client_profiles: 'training_only',
              client_workouts: 'full',
              client_progress: 'full',
            },
          },
          email: trainerEmail,
          email_confirm: true,
          password: 'password123',
          user_metadata: {
            fullName: 'Taylor Trainer',
            name: 'Taylor',
          },
        });
      if (createTrainerError) {
        console.error('Error creating trainer user:', createTrainerError);
      } else {
        console.log('✅ Trainer user created:', trainerUser.user.id);
      }
    }

    // Regular user (only web)
    if (existingRegular) {
      console.log('Regular user already exists, updating metadata...');
      const { error: updateRegularError } =
        await supabase.auth.admin.updateUserById(existingRegular.id, {
          app_metadata: {
            groups: ['free'],
            primary_user_type: 'regular',
            user_types: ['regular'],
            subscription_tier: 'free',
            permissions: {
              view_exercises: true,
              create_workouts: true,
              track_progress: true,
              view_routines: true,
            },
            features: [
              'basic_exercises',
              'workout_tracking',
              'progress_basic',
              'limited_routines',
            ],
            data_access_rules: {
              own_profile: 'full',
              own_workouts: 'full',
              own_progress: 'full',
            },
          },
          user_metadata: {
            fullName: 'Riley Regular',
            name: 'Riley',
          },
        });
      if (updateRegularError) {
        console.error('Error updating regular user:', updateRegularError);
      } else {
        console.log('✅ Regular user updated');
      }
    } else {
      console.log('Creating regular user...');
      const { data: regularUser, error: createRegularError } =
        await supabase.auth.admin.createUser({
          app_metadata: {
            groups: ['free'],
            primary_user_type: 'regular',
            user_types: ['regular'],
            subscription_tier: 'free',
            permissions: {
              view_exercises: true,
              create_workouts: true,
              track_progress: true,
              view_routines: true,
            },
            features: [
              'basic_exercises',
              'workout_tracking',
              'progress_basic',
              'limited_routines',
            ],
            data_access_rules: {
              own_profile: 'full',
              own_workouts: 'full',
              own_progress: 'full',
            },
          },
          email: regularEmail,
          email_confirm: true,
          password: 'password123',
          user_metadata: {
            fullName: 'Riley Regular',
            name: 'Riley',
          },
        });
      if (createRegularError) {
        console.error('Error creating regular user:', createRegularError);
      } else {
        console.log('✅ Regular user created:', regularUser.user.id);
      }
    }

    // Step 3: Create sample routines for admin user
    console.log('\n💪 Creating sample routines...');

    if (adminUserId) {
      try {
        // Create a sample strength routine
        const { data: strengthRoutine, error: strengthError } = await supabase
          .from('routines')
          .insert({
            user_id: adminUserId,
            name: 'Full Body Strength',
            description:
              'A comprehensive full-body workout targeting all major muscle groups with compound movements. Perfect for intermediate lifters looking to build strength and muscle mass.',
            difficulty: 'Intermediate',
            goal: 'Strength',
            // days_per_week is calculated dynamically from workout days
            duration: 12,
            // Schedule is calculated dynamically from workout days
            objectives: [
              'Build overall strength',
              'Improve compound movements',
              'Increase muscle mass',
            ],
            is_active: true,
            is_favorite: false,
            total_workouts: 24,
            completed_workouts: 9,
            estimated_duration: '45-60 min',
          })
          .select()
          .single();

        if (strengthError) {
          console.error('Error creating strength routine:', strengthError);
        } else {
          console.log('✅ Created strength routine:', strengthRoutine.id);

          // Create a workout for the strength routine
          const { data: strengthWorkout, error: workoutError } = await supabase
            .from('workouts')
            .insert({
              routine_id: strengthRoutine.id,
              name: 'Workout A - Upper Focus',
              type: 'strength',
              objective: 'Upper body strength and hypertrophy',
              schedule: {
                repeatPattern: 'weeks',
                repeatValue: '1',
                selectedDays: ['monday', 'wednesday', 'friday'],
                time: '09:00',
              },
              order_index: 0,
            })
            .select()
            .single();

          if (workoutError) {
            console.error('Error creating strength workout:', workoutError);
          } else {
            console.log('✅ Created strength workout:', strengthWorkout.id);

            // Create a section for the workout
            const { data: section, error: sectionError } = await supabase
              .from('workout_sections')
              .insert({
                workout_id: strengthWorkout.id,
                name: 'Main Sets',
                type: 'basic',
                order_index: 0,
                rest_after: '2 min',
              })
              .select()
              .single();

            if (sectionError) {
              console.error('Error creating section:', sectionError);
            } else {
              console.log('✅ Created workout section:', section.id);

              // Create an exercise for the section
              const { data: exercise, error: exerciseError } = await supabase
                .from('routine_exercises')
                .insert({
                  section_id: section.id,
                  exercise_library_id: '660e8400-e29b-41d4-a716-446655440001', // Bench Press variant
                  order_index: 0,
                  rest_timer: '90s',
                  rest_after: '2 min',
                  progression_method: 'linear',
                  has_approach_sets: false,
                })
                .select()
                .single();

              if (exerciseError) {
                console.error('Error creating exercise:', exerciseError);
              } else {
                console.log('✅ Created exercise:', exercise.id);

                // Create sets for the exercise
                const { error: setsError } = await supabase
                  .from('exercise_sets')
                  .insert([
                    {
                      exercise_id: exercise.id,
                      set_number: 1,
                      reps: '10',
                      weight: '135 lbs',
                      notes: 'Warm-up set',
                    },
                    {
                      exercise_id: exercise.id,
                      set_number: 2,
                      reps: '8',
                      weight: '155 lbs',
                      notes: 'Working set',
                    },
                    {
                      exercise_id: exercise.id,
                      set_number: 3,
                      reps: '6',
                      weight: '175 lbs',
                      notes: 'Working set',
                    },
                  ]);

                if (setsError) {
                  console.error('Error creating sets:', setsError);
                } else {
                  console.log('✅ Created exercise sets');
                }
              }
            }
          }

          // Create a second workout for the strength routine
          const { data: strengthWorkout2, error: workout2Error } =
            await supabase
              .from('workouts')
              .insert({
                routine_id: strengthRoutine.id,
                name: 'Workout B - Lower Focus',
                type: 'strength',
                objective: 'Lower body strength and power',
                schedule: {
                  repeatPattern: 'weeks',
                  repeatValue: '1',
                  selectedDays: ['tuesday', 'thursday'],
                  time: '10:00',
                },
                order_index: 1,
              })
              .select()
              .single();

          if (workout2Error) {
            console.error(
              'Error creating second strength workout:',
              workout2Error
            );
          } else {
            console.log(
              '✅ Created second strength workout:',
              strengthWorkout2.id
            );
          }
        }

        // Create a sample running routine
        const { data: runningRoutine, error: runningError } = await supabase
          .from('routines')
          .insert({
            user_id: adminUserId,
            name: '5K Training Plan',
            description:
              'A structured 8-week training plan to prepare for your first 5K race. Includes progressive distance increases and speed work.',
            difficulty: 'Beginner',
            goal: 'Endurance',
            // days_per_week is calculated dynamically from workout days
            duration: 8,
            // Schedule is calculated dynamically from workout days
            objectives: [
              'Complete a 5K race',
              'Build running endurance',
              'Improve cardiovascular fitness',
            ],
            is_active: false,
            is_favorite: true,
            total_workouts: 32,
            completed_workouts: 12,
            estimated_duration: '30-45 min',
          })
          .select()
          .single();

        if (runningError) {
          console.error('Error creating running routine:', runningError);
        } else {
          console.log('✅ Created running routine:', runningRoutine.id);

          // Create a workout for the running routine
          const { data: runningWorkout, error: runningWorkoutError } =
            await supabase
              .from('workouts')
              .insert({
                routine_id: runningRoutine.id,
                name: 'Easy Run',
                type: 'running',
                objective: 'Build aerobic base and endurance',
                schedule: {
                  repeatPattern: 'days',
                  repeatValue: '2',
                  selectedDays: ['monday'],
                  time: '07:00',
                },
                order_index: 0,
              })
              .select()
              .single();

          if (runningWorkoutError) {
            console.error(
              'Error creating running workout:',
              runningWorkoutError
            );
          } else {
            console.log('✅ Created running workout:', runningWorkout.id);
          }
        }

        // Create a sample hypertrophy routine
        const { data: hypertrophyRoutine, error: hypertrophyError } =
          await supabase
            .from('routines')
            .insert({
              user_id: adminUserId,
              name: 'Muscle Building Split',
              description:
                'A bodybuilding-style split routine focusing on muscle hypertrophy with higher rep ranges and isolation exercises.',
              difficulty: 'Advanced',
              goal: 'Hypertrophy',
              // days_per_week is calculated dynamically from workout days
              duration: 16,
              // Schedule is calculated dynamically from workout days
              objectives: [
                'Maximize muscle growth',
                'Improve muscle definition',
                'Increase training volume',
              ],
              is_active: false,
              is_favorite: false,
              total_workouts: 40,
              completed_workouts: 15,
              estimated_duration: '60-75 min',
            })
            .select()
            .single();

        if (hypertrophyError) {
          console.error(
            'Error creating hypertrophy routine:',
            hypertrophyError
          );
        } else {
          console.log('✅ Created hypertrophy routine:', hypertrophyRoutine.id);
        }
      } catch (error) {
        console.error('Error creating sample routines:', error);
      }
    }

    console.log('\n🎉 Development database setup complete!');
    console.log('');
    console.log('📋 Your admin credentials:');
    console.log(`   Admin:   ${adminEmail} / password123`);
    console.log(`   Trainer: ${trainerEmail} / password123`);
    console.log(`   Regular: ${regularEmail} / password123`);
    console.log('');
    console.log('🔗 Access your applications:');
    console.log('   • Auth App: http://localhost:3000');
    console.log('   • Web App: http://localhost:3001');
    console.log('   • Admin Panel: http://localhost:3002');
    console.log('   • Pro Platform: http://localhost:3003');
    console.log('');
    console.log('💡 You can now run: pnpm dev');
  } catch (error) {
    console.error('Setup error:', error);
  }
}

setupDevDatabase();
