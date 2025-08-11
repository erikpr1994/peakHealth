# Routines Feature - Planning Questions

This document contains all the questions we need to answer to properly plan and implement the remaining work for the Routines feature.

## 🏗️ **Data Architecture Questions**

### **Q1.1: Database Schema Design** ✅ **RESOLVED**

**Question**: How should routines be structured in the database? Should we use a normalized approach or JSON storage for complex workout data?

**Context**: The current routines feature has complex nested data structures (routines → workouts → sections → exercises → sets). We need to decide on the optimal database schema.

**Options**:

- **Option A**: Fully normalized tables (routines, workouts, sections, exercises, sets) ✅ **SELECTED**
- **Option B**: Hybrid approach (routines table + JSON columns for complex data)
- **Option C**: Document-based approach (JSON storage for entire routines)

**Decision**: **Option A - Fully normalized tables**

**Rationale**:

- Better data integrity and consistency
- Superior query performance for complex operations
- Easier to scale and optimize individual tables
- More flexible for future features and integrations
- Better support for analytics and reporting
- Easier to implement routine sharing and versioning

**Implementation**: Will use normalized tables: routines, workouts, workout_sections, exercises, exercise_sets, trail_running_data, trail_running_intervals

**Considerations**:

- Query performance for different use cases
- Data consistency and integrity
- Flexibility for future changes
- Migration complexity

---

### **Q1.2: Routine Versioning** ✅ **RESOLVED**

**Question**: How should we handle routine versioning? Should users be able to modify routines without affecting historical data?

**Context**: Users might want to modify their routines over time, but we need to preserve historical workout data that references specific routine versions.

**Decision**: **Option B - Mutable routines with version history**

**Implementation**:

- **Mutable Routines**: Users can modify existing routines easily
- **Version History**: Track all changes with timestamps and user info
- **Revert Capability**: Allow users to revert to previous versions
- **Change Tracking**: Show what changed between versions

**Rationale**:

- **User-Friendly**: Easy to modify routines without creating duplicates
- **Data Integrity**: Can always revert to previous versions if needed
- **History Tracking**: Users can see how their routines evolved
- **Storage Efficient**: No need to duplicate entire routine data

**Considerations**:

- Data storage requirements
- User experience complexity
- Historical data preservation
- Performance impact

---

### **Q1.3: Routine Sharing & Collaboration** ✅ **RESOLVED**

**Question**: How should we handle routine sharing and collaboration? Should there be public/private routines?

**Context**: Users might want to share routines with others or collaborate on routine creation.

**Decision**: **No sharing features for MVP - Future scope**

**Implementation**:

- **MVP**: All routines are private to the user
- **Future**: Will be implemented as part of social features
- **Data Structure**: Design database to support future sharing capabilities
- **User Experience**: Focus on individual routine management

**Rationale**:

- **MVP Focus**: Concentrate on core routine functionality
- **Social Features**: Sharing will be part of broader social platform
- **Development Speed**: Faster MVP delivery without sharing complexity
- **Future Scalability**: Database design supports future sharing features

**Considerations**:

- User privacy and control
- Implementation complexity
- Community building potential
- Data ownership

---

## 🎯 **User Experience Questions**

### **Q2.1: Routine Creation Flow** ✅ **RESOLVED**

**Question**: How should the routine creation flow be optimized? Should we have templates or guided creation?

**Context**: The current routine creation is quite complex. We need to make it more user-friendly, especially for beginners.

**Options**:

- **Option A**: Template-based creation (choose from pre-built templates)
- **Option B**: Guided wizard (step-by-step creation) ✅ **FREE USERS**
- **Option C**: Hybrid approach (templates + customization) ✅ **BASIC PAYING USERS**
- **Option D**: AI-assisted creation (smart recommendations) ✅ **PREMIUM USERS** (Future scope)

**Decision**: **Tiered approach based on user subscription level**

**Implementation**:

- **Free Users**: Guided wizard (step-by-step creation)
- **Basic Paying Users**: Hybrid approach (templates + customization)
- **Premium Users**: AI-assisted creation (smart recommendations) - _Post-MVP_

**Rationale**:

- **Free tier**: Guided wizard provides value while encouraging upgrade
- **Basic tier**: Templates + customization offers significant value for paid users
- **Premium tier**: AI features as premium differentiator
- **MVP scope**: Focus on Options B and C for initial release

**Considerations**:

- User skill levels (beginner vs advanced)
- Time to create first routine
- Customization flexibility
- Implementation complexity

---

### **Q2.2: Routine Complexity Management** ✅ **RESOLVED**

**Question**: How should we handle routine complexity? Should we have beginner/advanced modes?

**Context**: Different users have different needs - beginners need simplicity, advanced users need power features.

**Decision**: **Option A - Progressive disclosure (show advanced features on demand)**

**Implementation**:

- **Current Approach**: Maintain existing progressive disclosure design
- **User Experience**: All users see same interface, complexity revealed as needed
- **Learning Curve**: Users naturally progress from simple to advanced features
- **Consistency**: Single codebase, easier to maintain

**Rationale**:

- **Proven Design**: Current implementation works well
- **User-Friendly**: No mode switching confusion
- **Natural Progression**: Users learn advanced features organically
- **Maintenance**: Single interface easier to maintain and improve

**Considerations**:

- User onboarding experience
- Feature discoverability
- Interface complexity
- Maintenance overhead

---

### **Q2.3: Workout Tracker Integration** ✅ **RESOLVED**

**Question**: How should we integrate with the workout tracker? Should routines automatically create workout sessions?

**Context**: Routines need to connect with the workout tracker for actual execution and progress tracking.

**Decision**: **Option C - Hybrid (suggested sessions with manual override)**

**Implementation**:

- **Dashboard Integration**: Show next scheduled workout with "Start" button for immediate execution
- **Manual Creation**: Users can also manually create workout sessions from routines
- **UI Flexibility**: Different entry points based on context (dashboard vs routine detail)
- **Data Consistency**: Maintain connection between routine plan and actual execution

**Rationale**:

- **User Experience**: Quick start from dashboard for convenience
- **Flexibility**: Manual creation for users who prefer more control
- **Context Awareness**: Different UI patterns for different use cases
- **Future Planning**: Can evolve based on user behavior and preferences

**Considerations**:

- User control and flexibility
- Workflow automation
- Data consistency
- Implementation complexity

---

## 🔧 **Feature Scope Questions**

### **Q3.1: Routine Templates & Community** ✅ **RESOLVED**

**Question**: Should we support routine templates and community sharing in the MVP?

**Context**: Pre-built templates could significantly improve user onboarding, but community features add complexity.

**Decision**: **Option A - Basic templates only (curated by us)**

**Implementation**:

- **MVP**: Curated templates for common workout types
- **Quality Control**: All templates reviewed and optimized
- **User Onboarding**: Templates help users get started quickly
- **Future**: Can evolve to community features later

**Rationale**:

- **User Value**: Templates significantly improve onboarding experience
- **Controlled Quality**: Curated templates ensure good user experience
- **Implementation Speed**: Faster than building community features
- **Foundation**: Sets up structure for future community features

**Considerations**:

- Development timeline
- User value proposition
- Content moderation needs
- Technical complexity

---

### **Q3.2: AI Recommendations** ✅ **RESOLVED**

**Question**: How should we handle routine recommendations and AI suggestions?

**Context**: AI could help users create better routines based on their goals, experience, and preferences.

**Decision**: **Option A - No AI in MVP**

**Implementation**:

- **MVP**: Use existing exercise selector without AI recommendations
- **Current State**: Exercise selector is already built and functional
- **Future**: Can add AI recommendations in later iterations
- **User Experience**: Focus on core functionality first

**Rationale**:

- **Existing Functionality**: Exercise selector already works well
- **MVP Focus**: Concentrate on core routine management features
- **Development Speed**: Faster MVP delivery without AI complexity
- **Future Enhancement**: Can add AI features when needed

**Considerations**:

- Development complexity
- User value
- Data requirements
- Future roadmap alignment

---

### **Q3.3: Import/Export Functionality** ✅ **RESOLVED**

**Question**: Should we support routine import/export from other platforms?

**Context**: Users might want to migrate routines from other fitness apps or share routines across platforms.

**Decision**: **Option A - No import/export in MVP**

**Implementation**:

- **MVP**: Focus on core routine creation and management
- **User Experience**: Users create new routines in the platform
- **Future**: Can add import/export functionality later
- **Data Migration**: Users can manually recreate routines if needed

**Rationale**:

- **MVP Focus**: Concentrate on core functionality
- **User Migration**: Most users will create new routines
- **Implementation Speed**: Faster MVP delivery
- **Future Feature**: Can add import/export when needed

**Considerations**:

- User migration needs
- Platform compatibility
- Data format standardization
- Development effort

---

## ⚡ **Technical Implementation Questions**

### **Q4.1: Real-time Collaboration** ✅ **RESOLVED**

**Question**: How should we handle real-time collaboration on routines?

**Context**: Multiple users might want to edit the same routine simultaneously (e.g., trainer and client).

**Decision**: **Option A - No real-time collaboration**

**Implementation**:

- **MVP**: Focus on individual user experience
- **User Experience**: Single user routine management
- **Future**: Can add collaboration when trainer platform is ready
- **Development**: Faster MVP delivery without collaboration complexity

**Rationale**:

- **MVP Simplicity**: Focus on individual user experience
- **Implementation Speed**: Faster development without collaboration complexity
- **Future Feature**: Can add collaboration when trainer platform is ready
- **User Focus**: Most MVP users will be individual users

**Considerations**:

- Technical complexity
- User experience
- Conflict resolution
- Infrastructure requirements

---

### **Q4.2: Performance Optimization** ✅ **RESOLVED**

**Question**: How should we optimize performance for users with many routines?

**Context**: Power users might have dozens of routines, which could impact performance.

**Decision**: **Option A - Basic pagination/loading**

**Implementation**:

- **MVP**: Basic pagination and loading states
- **User Experience**: Sufficient performance for initial user base
- **Future**: Can add advanced optimization as user base grows
- **Development**: Faster MVP delivery with basic performance features

**Rationale**:

- **MVP Simplicity**: Start with basic performance features
- **User Experience**: Sufficient for initial user base
- **Implementation Speed**: Faster development
- **Future Optimization**: Can add advanced features as user base grows

**Considerations**:

- User experience
- Technical complexity
- Infrastructure costs
- Scalability

---

### **Q4.3: Offline Functionality** ✅ **RESOLVED**

**Question**: How should we handle offline functionality for routine creation?

**Context**: Users might want to create or edit routines without internet connectivity.

**Decision**: **Option A - No offline support**

**Implementation**:

- **MVP**: Online-only functionality
- **User Experience**: Requires internet connection
- **Future**: Can add offline support later
- **Development**: Faster MVP delivery without offline complexity

**Rationale**:

- **MVP Focus**: Concentrate on core online functionality
- **Implementation Speed**: Faster development without offline complexity
- **User Expectations**: Most users expect online functionality
- **Future Feature**: Can add offline support when needed

**Considerations**:

- User experience
- Data consistency
- Implementation complexity
- Storage requirements

---

## 🔗 **Integration Questions**

### **Q5.1: Exercise Library Integration** ✅ **RESOLVED**

**Question**: How should we integrate with the exercise library? Should exercises be embedded or referenced?

**Context**: Routines reference exercises, but we need to decide how this relationship works.

**Options**:

- **Option A**: Embedded exercises (copy data into routine)
- **Option B**: Referenced exercises (link to exercise library) ✅ **SELECTED**
- **Option C**: Hybrid (reference with fallback to embedded)
- **Option D**: Dynamic loading (load exercises on demand)

**Decision**: **Option B - Referenced exercises with local storage sync**

**Implementation**:

- **Database**: Store exercise IDs as references (not embedded data)
- **Local Storage**: Download entire exercise library to user's device
- **Sync Strategy**: Sync exercise data when online, use local cache when offline
- **Storage Efficiency**: Minimal database storage, comprehensive offline support

**Rationale**:

- **Database Efficiency**: Only store exercise IDs, not duplicate data
- **Offline Support**: Full exercise library available offline via local storage
- **Performance**: Fast local lookups, no API calls for exercise data
- **Sync Strategy**: Update local cache when online, seamless offline experience
- **Storage Optimization**: No redundant data in database

**Considerations**:

- Data consistency
- Performance
- Offline functionality
- Exercise updates

---

### **Q5.2: User Authentication Integration** ✅ **RESOLVED**

**Question**: How should routines integrate with user authentication and data ownership?

**Context**: Routines need to be associated with users and respect privacy/access controls.

**Options**:

- **Option A**: Simple user association
- **Option B**: Role-based access (owner, editor, viewer) ✅ **MVP SELECTED**
- **Option C**: Advanced permissions system ✅ **FUTURE SCOPE**
- **Option D**: Organization-based access ✅ **FUTURE SCOPE**

**Decision**: **Option B for MVP, evolving to C+D combination for future**

**Implementation**:

- **MVP**: Role-based access (owner, editor, viewer) for trainer/client relationships
- **Future**: Advanced permissions system + organization-based access for professional platform
- **Evolution Path**: Start with basic roles, add granular permissions, then organization support

**Rationale**:

- **MVP Speed**: Option B provides essential collaboration without overcomplicating
- **Future Scalability**: C+D combination supports professional platform needs
- **Development Efficiency**: Builds foundation for advanced features
- **User Value**: Enables trainer/client relationships from the start

**Considerations**:

- Security requirements
- User privacy
- Collaboration features
- Implementation complexity

---

### **Q5.3: Dashboard Integration**

**Question**: How should routines integrate with the dashboard? What routine data should be displayed?

**Context**: The dashboard should show relevant routine information for quick access and overview.

**Options**:

- **Option A**: Basic routine list and progress
- **Option B**: Advanced analytics and insights
- **Option C**: Smart recommendations
- **Option D**: Full routine management

**Considerations**:

- Dashboard complexity
- User value
- Performance impact
- Feature overlap

---

## 📊 **Analytics & Insights Questions**

### **Q6.1: Progress Tracking** ✅ **RESOLVED**

**Question**: How should we track and display routine progress and completion?

**Context**: Users need to see their progress through routines and understand their performance.

**Decision**: **Option A - Basic completion tracking for MVP, with progression to advanced features**

**Implementation**:

- **MVP**: Basic completion tracking and simple progress indicators
- **Post-MVP**: Advanced metrics and analytics (Option B)
- **Premium Feature**: Goal-based progress and AI insights (Option C) in Premium Routine Management
- **Progressive Enhancement**: Build foundation, then add complexity

**Rationale**:

- **MVP Foundation**: Start with basic tracking to validate core functionality
- **User Value**: Basic progress tracking provides immediate value
- **Implementation Speed**: Faster MVP delivery with simple tracking
- **Future Roadmap**: Clear progression path to advanced features

**Considerations**:

- User motivation
- Data requirements
- Implementation complexity
- Value proposition

---

### **Q6.2: Performance Analytics** ✅ **RESOLVED**

**Question**: What performance analytics should we provide for routines?

**Context**: Users want to understand how their routines are performing and where they can improve.

**Decision**: **Option A - Basic workout completion stats for MVP, with roadmap to all options**

**Implementation**:

- **MVP**: Basic workout completion statistics and simple analytics
- **Phase 2**: Advanced performance metrics (Option B)
- **Phase 3**: Comparative analytics (Option C)
- **Phase 4**: Predictive insights (Option D)
- **Progressive Enhancement**: Build comprehensive analytics suite over time

**Rationale**:

- **MVP Foundation**: Start with basic analytics to validate user value
- **Incremental Development**: Build analytics capabilities progressively
- **User Value**: Each phase adds meaningful insights
- **Technical Complexity**: Manage implementation complexity through phases

**Considerations**:

- User value
- Data complexity
- Implementation effort
- Privacy concerns

---

## 🎯 **Priority Questions for MVP**

### **Immediate Decisions Needed**

1. **Q1.1**: Database schema design (affects all other decisions)
2. **Q2.1**: Routine creation flow (core user experience)
3. **Q5.1**: Exercise library integration (blocking dependency)
4. **Q5.2**: User authentication integration (security requirement)

### **Secondary Decisions**

5. **Q1.2**: Routine versioning (data integrity)
6. **Q2.3**: Workout tracker integration (core functionality)
7. **Q3.1**: Templates vs community (user onboarding)
8. **Q4.2**: Performance optimization (scalability)

### **Future Considerations**

9. **Q1.3**: Routine sharing (community features)
10. **Q3.2**: AI recommendations (advanced features)
11. **Q4.1**: Real-time collaboration (enterprise features)
12. **Q6.2**: Performance analytics (insights)

---

## 📝 **Next Steps**

1. **Review and prioritize** these questions based on MVP requirements
2. **Answer high-priority questions** first to unblock development
3. **Document decisions** and their rationale
4. **Update implementation plan** based on decisions
5. **Create technical specifications** for chosen approaches

---

## 🔗 **Related Documentation**

- [Routines Feature README](./README.md)
- [User App MVP Scope](../../app-overview/user-app/mvp-scope.md)
- [Premium Routine Management](../premium-routine-management/README.md)
- [Project TODO](../../todo.md)
