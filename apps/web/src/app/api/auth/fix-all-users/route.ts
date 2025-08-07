import { NextResponse } from 'next/server';

import { createAdminClient } from '@/lib/supabase/admin';

export async function POST() {
  try {
    const adminClient = createAdminClient();
    if (!adminClient) {
      return NextResponse.json(
        { error: 'Admin client not available' },
        { status: 503 }
      );
    }

    // Get all users
    const { data: users, error: usersError } =
      await adminClient.auth.admin.listUsers();

    if (usersError) {
      console.error('Error listing users:', usersError);
      return NextResponse.json(
        { error: 'Failed to list users' },
        { status: 500 }
      );
    }

    const results = [];
    let successCount = 0;
    let errorCount = 0;

    for (const user of users.users) {
      try {
        console.log(`Processing user: ${user.email} (${user.id})`);

        // Check current app_metadata
        const currentMetadata = user.app_metadata || {};
        console.log('Current app_metadata:', currentMetadata);

        // Generate new JWT claims
        const { data: claims, error: claimsError } = await adminClient.rpc(
          'generate_user_jwt_claims',
          { user_id_param: user.id }
        );

        if (claimsError) {
          console.error(
            `Error generating claims for ${user.email}:`,
            claimsError
          );
          results.push({
            user_id: user.id,
            email: user.email,
            status: 'error',
            error: claimsError.message,
          });
          errorCount++;
          continue;
        }

        if (!claims) {
          console.log(`No claims generated for ${user.email}`);
          results.push({
            user_id: user.id,
            email: user.email,
            status: 'no_claims',
            current_metadata: currentMetadata,
          });
          continue;
        }

        // Check if claims are different from current metadata
        const claimsChanged =
          JSON.stringify(currentMetadata) !== JSON.stringify(claims);

        if (claimsChanged) {
          // Update user's app_metadata with new claims
          const { error: updateError } =
            await adminClient.auth.admin.updateUserById(user.id, {
              app_metadata: claims,
            });

          if (updateError) {
            console.error(`Error updating ${user.email}:`, updateError);
            results.push({
              user_id: user.id,
              email: user.email,
              status: 'update_error',
              error: updateError.message,
              generated_claims: claims,
            });
            errorCount++;
          } else {
            console.log(`Successfully updated ${user.email}`);
            results.push({
              user_id: user.id,
              email: user.email,
              status: 'updated',
              old_metadata: currentMetadata,
              new_metadata: claims,
            });
            successCount++;
          }
        } else {
          console.log(`No changes needed for ${user.email}`);
          results.push({
            user_id: user.id,
            email: user.email,
            status: 'no_changes',
            metadata: currentMetadata,
          });
        }
      } catch (error) {
        console.error(`Error processing ${user.email}:`, error);
        results.push({
          user_id: user.id,
          email: user.email,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        errorCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${users.users.length} users`,
      summary: {
        total: users.users.length,
        success: successCount,
        errors: errorCount,
        no_changes: results.filter(r => r.status === 'no_changes').length,
      },
      results: results,
    });
  } catch (error) {
    console.error('Fix all users API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
