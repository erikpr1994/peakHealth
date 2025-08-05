# Auth System Restructure Plan

## Overview

This document outlines the step-by-step plan to restructure the authentication system in the Peak Health monorepo to support multiple subdomain-based apps with proper role/group management using JWT claims.

## Current State Analysis

### What We Have

- ✅ Feature flag system with role/group filtering
- ✅ Auth context and hooks in `@web/`
- ✅ Login/Signup pages in `@web/`
- ✅ Supabase integration with user metadata for roles/groups
- ✅ Basic auth app structure (`@auth/`)

### What We Need

- ✅ Extract auth logic to a shared package
- 🔄 Implement JWT claims for roles/groups
- 🔄 Create proper auth app with subdomain support
- 🔄 Update feature flag system to use JWT claims
- 🔄 Implement proper role/group management

## Proposed Architecture

### JWT Claims Strategy

Instead of storing roles/groups in `user_metadata`, we'll use Supabase's JWT claims:

```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "app_metadata": {
    "roles": ["basic", "premium"],
    "groups": ["free", "beta_testers"],
    "permissions": ["read:profile", "write:workouts"]
  }
}
```

### Benefits of JWT Claims

1. **Performance**: No database queries needed for auth checks
2. **Security**: Claims are signed and can't be tampered with
3. **Real-time**: Claims are included in every request
4. **Scalability**: Reduces database load
5. **Standard**: Follows JWT best practices

## Step-by-Step Implementation Plan

### Phase 1: Extract Auth Logic to Package ✅

**Goal**: Move all auth-related code to a shared package

#### 1.1 Create Auth Package Structure ✅

```
packages/auth/
├── src/
│   ├── types/
│   │   ├── index.ts
│   │   ├── user.ts
│   │   └── auth.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useAuthState.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── services/
│   │   ├── authService.ts
│   │   └── jwtService.ts
│   ├── utils/
│   │   ├── claims.ts
│   │   └── permissions.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

#### 1.2 Move Auth Components ✅

- ✅ Move `AuthContext.tsx` from `@web/` to `@auth/`
- ✅ Move auth hooks and utilities
- ✅ Create proper TypeScript interfaces

#### 1.3 Update Web App ✅

- ✅ Remove auth code from `@web/`
- ✅ Import from `@auth/` package
- ✅ Update imports and dependencies
- ✅ Create client wrapper for Next.js compatibility

### Phase 2: Implement JWT Claims System 🔄

**Goal**: Replace user_metadata with JWT claims

#### 2.1 Database Migration

- Create migration to add JWT claims support
- Update user creation to set default claims
- Add functions to manage claims

#### 2.2 Update Auth Service

- Modify signup to set initial claims
- Add functions to update user claims
- Implement claim validation

#### 2.3 Update Feature Flag System

- Modify feature flag queries to use JWT claims
- Update database functions to accept claims
- Test role/group filtering with claims

### Phase 3: Create Auth App 🔄

**Goal**: Build the dedicated auth app for `auth.peakhealth.es`

#### 3.1 Basic Auth App Structure

```
apps/auth/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── callback/
│   │       └── page.tsx
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── AuthLayout.tsx
│   └── lib/
│       └── supabase.ts
├── package.json
└── next.config.js
```

#### 3.2 Auth App Features

- Login/Signup forms
- OAuth providers (Google, GitHub)
- Password reset
- Email verification
- Redirect handling for different apps

#### 3.3 Subdomain Configuration

- Configure Next.js for subdomain routing
- Set up proper CORS and cookie handling
- Implement app-specific redirects

### Phase 4: Role/Group Management System 🔄

**Goal**: Create proper role/group management

#### 4.1 Role Hierarchy

```
Roles (Hierarchical):
- basic: Basic user features
- premium: Premium features
- pro: Professional features
- admin: Administrative access

Groups (Non-hierarchical):
- free: Free tier users
- beta_testers: Beta testing access
- early_adopters: Early access features
- enterprise: Enterprise features
```

#### 4.2 Permission System

- Define granular permissions
- Map roles to permissions
- Implement permission checking

#### 4.3 Admin Interface

- Role/group assignment UI
- User management interface
- Permission management

### Phase 5: Multi-App Integration 🔄

**Goal**: Connect all apps with proper auth flow

#### 5.1 App-Specific Configuration

- `peakhealth.es` (main app): All authenticated users
- `auth.peakhealth.es` (auth app): Login/signup only
- `admin.peakhealth.es` (admin app): Admin users only
- `pro.peakhealth.es` (pro app): Pro users only

#### 5.2 Cross-App Authentication

- Shared JWT tokens
- Proper redirect handling
- Session management

#### 5.3 Feature Flag Integration

- App-specific feature flags
- Role-based feature access
- Group-based feature access

## Technical Decisions

### Framework Choice

**Recommendation: Next.js for all apps**

**Pros:**

- Consistent with current setup
- Excellent TypeScript support
- Built-in API routes
- Good performance
- Easy deployment

**Alternatives Considered:**

- **Remix**: Good but less ecosystem
- **SvelteKit**: Good but different paradigm
- **Nuxt**: Vue-based, not React

### JWT Claims vs Database Storage

**Recommendation: JWT Claims**

**Pros:**

- Better performance
- Real-time access
- Standard approach
- Reduced database load

**Cons:**

- Claims size limits
- Requires token refresh for updates
- More complex initial setup

### Role/Group System Design

**Recommendation: Hybrid Approach**

- **Roles**: Hierarchical, permission-based
- **Groups**: Non-hierarchical, feature-based
- **Permissions**: Granular, role-mapped

## Implementation Timeline

### Week 1: Phase 1 ✅

- ✅ Create auth package structure
- ✅ Move auth context and hooks
- ✅ Update web app to use package
- ✅ Test basic functionality

### Week 2: Phase 2 🔄

- [ ] Implement JWT claims system
- [ ] Update database functions
- [ ] Modify feature flag system
- [ ] Test claims-based auth

### Week 3: Phase 3 🔄

- [ ] Build auth app structure
- [ ] Implement login/signup forms
- [ ] Configure subdomain routing
- [ ] Test auth flow

### Week 4: Phase 4 🔄

- [ ] Design role/group hierarchy
- [ ] Implement permission system
- [ ] Create admin interface
- [ ] Test role/group management

### Week 5: Phase 5 🔄

- [ ] Configure multi-app setup
- [ ] Implement cross-app auth
- [ ] Test complete flow
- [ ] Documentation and cleanup

## Success Criteria

### Phase 1 ✅

- ✅ Auth package created and working
- ✅ Web app uses auth package
- ✅ No breaking changes
- ✅ All tests passing

### Phase 2 🔄

- [ ] JWT claims working
- [ ] Feature flags use claims
- [ ] Performance improved
- [ ] Security validated

### Phase 3 🔄

- [ ] Auth app functional
- [ ] Subdomain routing working
- [ ] OAuth providers integrated
- [ ] Redirects working

### Phase 4 🔄

- [ ] Role system implemented
- [ ] Group system implemented
- [ ] Admin interface working
- [ ] Permissions enforced

### Phase 5 🔄

- [ ] All apps connected
- [ ] Cross-app auth working
- [ ] Feature flags per app
- [ ] Production ready

## Risk Mitigation

### High Risk Items

1. **JWT Claims Migration**: Could break existing auth
   - **Mitigation**: Gradual migration with fallback
2. **Subdomain Configuration**: Complex setup
   - **Mitigation**: Start with simple setup, iterate
3. **Feature Flag Changes**: Could break existing features
   - **Mitigation**: Maintain backward compatibility

### Medium Risk Items

1. **Package Extraction**: Could introduce bugs
   - **Mitigation**: Thorough testing
2. **Role/Group System**: Could be over-engineered
   - **Mitigation**: Start simple, add complexity as needed

## Next Steps

1. **Start with Phase 2**: Implement JWT claims system
2. **Create detailed technical specs** for each phase
3. **Set up development environment** for multi-app testing
4. **Begin implementation** following the timeline

## Questions to Resolve

1. **JWT Claims Size**: How many roles/groups can we store?
2. **Token Refresh**: How often should we refresh tokens?
3. **Admin Access**: How do we manage admin role assignment?
4. **OAuth Providers**: Which providers should we support?
5. **Deployment**: How do we deploy multiple apps?

---

**Last Updated**: 2024-12-19
**Status**: Phase 1 Completed ✅
**Next Action**: Begin Phase 2 - Implement JWT Claims System
