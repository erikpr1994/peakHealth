import { createClient } from '@supabase/supabase-js';
import { execSync } from 'child_process';
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

    // Step 1: Reset the database
    console.log('\n📊 Resetting Supabase database...');
    try {
      execSync('supabase db reset', { stdio: 'inherit' });
      console.log('✅ Database reset successful');
    } catch (error) {
      console.error('❌ Database reset failed:', error.message);
      console.log('Make sure Supabase is running: pnpm supabase:start');
      return;
    }

    // Step 2: Create admin user
    console.log('\n👤 Creating admin user...');

    // Check if user already exists
    const { data: users, error: userError } =
      await supabase.auth.admin.listUsers();

    if (userError) {
      console.error('Error fetching users:', userError);
      return;
    }

    const existingUser = users.users.find(
      u => u.email === 'erikpastorrios1994@gmail.com'
    );

    if (existingUser) {
      console.log('User already exists, updating permissions...');

      // Update existing user with admin permissions
      const { data: updatedUser, error: updateError } =
        await supabase.auth.admin.updateUserById(existingUser.id, {
          app_metadata: {
            user_types: ['admin', 'trainer', 'regular'],
            primary_user_type: 'admin',
            groups: ['admin', 'beta', 'premium', 'free'],
            permissions: {
              admin_access: true,
              manage_users: true,
              manage_content: true,
              manage_feature_flags: true,
              view_analytics: true,
              manage_system_settings: true,
            },
          },
        });

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
          email: 'erikpastorrios1994@gmail.com',
          password: 'password123', // You can change this
          email_confirm: true,
          user_metadata: {
            name: 'Erik',
            fullName: 'Erik Pastor Rios',
          },
          app_metadata: {
            user_types: ['admin', 'trainer', 'regular'],
            primary_user_type: 'admin',
            groups: ['admin', 'beta', 'premium', 'free'],
            permissions: {
              admin_access: true,
              manage_users: true,
              manage_content: true,
              manage_feature_flags: true,
              view_analytics: true,
              manage_system_settings: true,
            },
          },
        });

      if (createError) {
        console.error('Error creating user:', createError);
        return;
      }

      console.log('✅ Admin user created successfully');
      console.log('User ID:', newUser.user.id);
    }

    console.log('\n🎉 Development database setup complete!');
    console.log('');
    console.log('📋 Your admin credentials:');
    console.log('   Email: erikpastorrios1994@gmail.com');
    console.log('   Password: password123');
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
