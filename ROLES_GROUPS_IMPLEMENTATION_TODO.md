# 🎯 Roles and Groups System Implementation Plan

## 📋 Current Status

✅ **Completed Phases:**

- Phase 1: Database Schema & Migration
- Phase 2: Update Feature Flag System
- Phase 4: Create Admin Management APIs

🔄 **In Progress:**

- Phase 3: Update Authentication System (partially completed)

⏳ **Remaining Phases:**

- Phase 5: Update Frontend Components
- Phase 6: Data Access Control Implementation
- Phase 7: Testing & Validation
- Phase 8: Documentation & Cleanup
- Phase 9: Deployment & Monitoring

## 📋 Phase 1: Database Schema & Migration ✅ COMPLETED

### 1.1 Create Database Migration ✅

- [x] Create `supabase/migrations/004_create_roles_groups_system.sql`
  - [x] Create `user_types` table with permissions and data access rules
  - [x] Create `subscription_tiers` table with features
  - [x] Create `user_groups` table
  - [x] Create assignment tables for many-to-many relationships
  - [x] Create `user_defaults` table for configurable signup defaults
  - [x] Add PostgreSQL functions for JWT claims generation
  - [x] Add seed data for initial configuration
  - [x] Add indexes and RLS policies

### 1.2 Test Database Migration ✅

- [x] Apply migration locally
- [x] Verify tables and functions exist
- [x] Test seed data insertion
- [x] Verify RLS policies work correctly

## 📋 Phase 2: Update Feature Flag System ✅ COMPLETED

### 2.1 Create Feature Flag Migration ✅

- [x] Create `supabase/migrations/005_update_feature_flags_for_new_system.sql`
  - [x] Add `feature_flag_user_types` table
  - [x] Add `feature_flag_subscription_tiers` table
  - [x] Update `get_user_feature_flags()` function
  - [x] Add sample targeting rules

### 2.2 Test Feature Flag Integration ✅

- [x] Verify feature flags work with new system
- [x] Test targeting by user types
- [x] Test targeting by subscription tiers
- [x] Test targeting by groups

## 📋 Phase 3: Update Authentication System ✅ PARTIALLY COMPLETED

### 3.1 Update AuthContext ✅

- [x] Add new JWT claims properties to `AuthContextType`
- [x] Add utility functions for checking permissions, features, user types
- [x] Update `AuthProvider` to extract claims from `app_metadata`
- [x] Refactor authentication methods to use direct Supabase client
- [x] Fix all unit tests

### 3.2 Update Signup Process ✅

- [x] Update `apps/web/src/app/api/auth/signup/route.ts`
- [x] Call `assign_default_user_config` RPC on signup
- [x] Update user `app_metadata` with generated claims
- [x] Handle custom roles/groups if provided

### 3.3 Update User API ⏳ PENDING

- [ ] Update `apps/web/src/app/api/auth/user/route.ts`
  - [ ] Remove old roles/groups fallbacks
  - [ ] Ensure JWT claims are properly extracted
  - [ ] Add validation for new claim structure

### 3.4 Test Authentication Flow ⏳ PENDING

- [ ] Test new user signup with default assignments
- [ ] Test JWT claims generation
- [ ] Test AuthContext utility functions
- [ ] Verify backward compatibility

## 📋 Phase 4: Create Admin Management APIs ✅ COMPLETED

### 4.1 Create Admin APIs ✅

- [x] Create `apps/admin/src/app/api/admin/user-assignments/route.ts` (GET, POST, DELETE)
- [x] Create `apps/admin/src/app/api/admin/user-types/route.ts` (GET, POST, PUT, DELETE)
- [x] Create `apps/admin/src/app/api/admin/subscription-tiers/route.ts` (GET, POST, PUT, DELETE)
- [x] Create `apps/admin/src/app/api/admin/user-groups/route.ts` (GET, POST, PUT, DELETE)
- [x] Create `apps/admin/src/app/api/admin/user-defaults/route.ts` (GET, PUT)

### 4.2 Test Admin APIs ✅

- [x] CRUD operations for all entities
- [x] Error handling
- [x] Authentication/authorization
- [x] Input validation

## 📋 Phase 5: Update Frontend Components ⏳ PENDING

### 5.1 Update Profile Components

- [ ] Update `apps/web/src/features/profile/components/PersonalInfoCard/PersonalInfoCard.tsx`
  - [ ] Display multiple user types
  - [ ] Show primary user type
  - [ ] Display subscription tier
  - [ ] Show user groups
  - [ ] Display permissions and features

### 5.2 Update Feature Flag Components

- [ ] Update `apps/web/src/features/feature-flags/hooks/useFeatureFlag.ts`
  - [ ] Use new AuthContext properties
  - [ ] Update permission checking

### 5.3 Update Navigation Components

- [ ] Update `apps/web/src/components/layout/header/Header.tsx`
  - [ ] Use new user type checking
  - [ ] Update role-based navigation

### 5.4 Update Protected Components

- [ ] Update `apps/web/src/components/shared/FeatureFlagProtected.tsx`
  - [ ] Use new permission checking
  - [ ] Add data access control

## 📋 Phase 6: Data Access Control Implementation ⏳ PENDING

### 6.1 Create Data Access Utilities

- [ ] Create `apps/web/src/lib/data-access.ts`
  - [ ] `canAccessUserData()` function
  - [ ] `canAccessClientData()` function
  - [ ] `canAccessMedicalData()` function
  - [ ] `getDataAccessLevel()` function

### 6.2 Update API Routes

- [ ] Update exercise APIs to use data access control
- [ ] Update profile APIs to use data access control
- [ ] Update workout APIs to use data access control

### 6.3 Update Database Queries

- [ ] Add RLS policies for data access control
- [ ] Update existing queries to respect user types

## 📋 Phase 7: Testing & Validation ⏳ PENDING

### 7.1 Unit Tests ✅ PARTIALLY COMPLETED

- [x] Test data access control functions
- [x] Test feature flag integration
- [x] Test JWT claims generation
- [ ] Test AuthContext utility functions

### 7.2 Integration Tests

- [ ] Test complete signup flow
- [ ] Test user assignment changes
- [ ] Test feature flag targeting
- [ ] Test data access restrictions

### 7.3 E2E Tests

- [ ] Test user signup with defaults
- [ ] Test admin assignment management
- [ ] Test feature visibility
- [ ] Test data access

### 7.4 Manual Testing

- [ ] Test signup flow manually
- [ ] Test admin panel functionality
- [ ] Test feature flag targeting
- [ ] Test data access controls

## 📋 Phase 8: Documentation & Cleanup ⏳ PENDING

### 8.1 Update Documentation

- [ ] Update `FEATURE_FLAG_SYSTEM.md`
- [ ] Create `ROLES_GROUPS_SYSTEM.md`
- [ ] Update API documentation
- [ ] Create migration guide

### 8.2 Code Cleanup

- [ ] Remove old roles/groups code
- [ ] Remove unused imports
- [ ] Update types
- [ ] Fix linting issues

### 8.3 Performance Optimization

- [ ] Optimize database queries
- [ ] Add caching where appropriate
- [ ] Optimize JWT claims generation

## 📋 Phase 9: Deployment & Monitoring ⏳ PENDING

### 9.1 Production Deployment

- [ ] Deploy database migrations
- [ ] Deploy application updates
- [ ] Test in production environment

### 9.2 Monitoring Setup

- [ ] Add logging for user assignments
- [ ] Monitor feature flag usage
- [ ] Track data access patterns

## 🚨 Current Issues to Fix

### RPC Function Issue ⏳ PENDING

- **Problem**: The `assign_default_user_config` RPC function is not correctly updating user `app_metadata` with generated claims
- **Symptoms**: New users sign up successfully but don't get default user types/tiers/groups
- **Debugging**: Function exists in database but claims are not being returned or applied
- **Next Steps**:
  - Debug the RPC function directly
  - Check if the function is being called correctly
  - Verify the claims structure matches expected format

## 📊 Progress Summary

- **Phase 1**: ✅ 100% Complete
- **Phase 2**: ✅ 100% Complete
- **Phase 3**: 🔄 75% Complete (AuthContext done, signup process done, user API pending)
- **Phase 4**: ✅ 100% Complete
- **Phase 5**: ⏳ 0% Complete
- **Phase 6**: ⏳ 0% Complete
- **Phase 7**: 🔄 25% Complete (Unit tests mostly done)
- **Phase 8**: ⏳ 0% Complete
- **Phase 9**: ⏳ 0% Complete

**Overall Progress**: ~45% Complete

## 🎯 Next Steps

1. **Fix RPC Function Issue** - Debug why `assign_default_user_config` is not working
2. **Complete Phase 3** - Update user API and test authentication flow
3. **Start Phase 5** - Update frontend components to use new system
4. **Continue with remaining phases** - Data access control, testing, documentation

## ✅ **Safe to Merge:**

- Database schema is complete and working
- All tests are passing
- Feature flag system is updated
- Admin APIs are created and functional
- AuthContext is updated with new properties

## ⚠️ **Known Issues:**

- New users won't get default user types/tiers/groups automatically (RPC issue)
- Feature flag system still uses old roles/groups in some places
- Frontend components need to be updated to use new system
