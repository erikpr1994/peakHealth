import { execSync } from 'child_process';

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: 'apps/web/.env.local' });

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
          },
        }
      );

      if (updateError) {
        console.error('Error updating user:', updateError);
        return;
      }

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

      console.log('✅ Admin user created successfully');
      console.log('User ID:', newUser.user.id);
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
