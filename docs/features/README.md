# Features Documentation

This directory contains documentation for specific features of the PeakHealth application. Each feature has its own subdirectory with comprehensive documentation.

## Available Features

### 🏃‍♂️ [Premium Routine Management](./premium-routine-management/)

Comprehensive season planning system that transforms basic routine creation into structured training periods with clear objectives, phases, and integrated routine management.

**Key Capabilities:**

- Season planning with specific objectives
- Phase-based training organization
- Routine assignment to phases
- Calendar integration and conflict management
- Progress tracking and milestone completion
- AI-powered recommendations with user control

**Target Users:**

- Trail runners and city race runners
- Bodybuilding competitors
- Health-conscious individuals
- Weight loss journey users

### 🔗 [Platform Integrations](./platform-integrations/)

Multi-platform integration system that connects with external fitness platforms to enhance personalized recommendations and provide better training insights.

**Key Capabilities:**

- Multi-platform support (Strava, Garmin Connect, Fitbit, Apple Health)
- Data synchronization and normalization
- Privacy-first approach with user consent
- Enhanced AI recommendations using historical data

**Status**: Future feature (depends on Premium Routine Management foundation)

### 🥗 [Nutrition Management](./nutrition-management/)

Comprehensive nutrition planning and tracking system that integrates with all training phases and user types.

**Key Capabilities:**

- Phase-specific nutrition recommendations
- Goal-oriented nutrition planning
- Integration with training phases
- Universal importance across all user personas

**Status**: Future feature (depends on Premium Routine Management foundation)

## Documentation Structure

Each feature follows a consistent documentation structure:

```
feature-name/
├── README.md                    # Feature overview and quick start
├── feature-overview.md          # Detailed feature explanation
├── user-personas.md             # How this feature serves app personas
├── technical-design.md          # Technical architecture and implementation
├── business-strategy.md         # Feature-specific business strategy
├── questions.md                 # Design questions and feedback
└── todo.md                      # Actionable tasks and progress
```

## Adding New Features

When adding documentation for a new feature:

1. **Create Feature Directory**: `docs/features/feature-name/`
2. **Follow Structure**: Use the standard documentation structure above
3. **Reference App-Level Docs**: Link to relevant app-level documentation
4. **Update This README**: Add the new feature to this list

## App-Level Documentation

For app-level documentation that applies across all features, see:

- **[App Overview](../app-overview/)**: User personas, business strategy, technical architecture
- **[Design Principles](../app-overview/design-principles.md)**: Core design guidelines
- **[Technical Architecture](../app-overview/technical-architecture.md)**: System-wide technical design

## Quick Links

- [App-Level User Personas](../app-overview/user-personas.md)
- [App Business Strategy](../app-overview/business-strategy.md)
- [Premium Routine Management](./premium-routine-management/)

---

_This directory contains feature-specific documentation. For app-level documentation, see [App Overview](../app-overview/)._
