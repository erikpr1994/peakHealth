# PeakHealth App Documentation

This directory contains app-level documentation for the PeakHealth fitness application, including user personas, business strategy, and technical architecture that apply across all apps.

## App Architecture

PeakHealth consists of multiple interconnected applications designed to serve different user types while maintaining a unified ecosystem:

### 🏠 [User App](./user-app/)

The main application for end users (athletes, fitness enthusiasts, health-conscious individuals).

**Key Characteristics:**

- **Self-managed users**: Full control over their training and health plans
- **Trainer-managed users**: Guided by health professionals while maintaining user autonomy
- **Progressive complexity**: Features adapt based on user experience level and management type
- **Comprehensive health**: Beyond just training to complete health management

**User Types:**

- Trail Runners (Competition-Focused)
- City Race Runners (Road Racing)
- Bodybuilding Competitors
- Health-Conscious Individuals
- Weight Loss Journey Users

### 🏥 [Professional Platform](./professional-platform/)

A unified platform for health professionals to manage and support their clients.

**Key Characteristics:**

- **Role-based access**: Professionals see and manage only what's relevant to their expertise
- **Cross-professional collaboration**: Different specialists can work together on client health
- **Client management tools**: Professional-grade tools for managing multiple clients
- **Integration with user app**: Seamless communication and data sharing

**Professional Types:**

- **Personal Trainers**: Training plan creation and modification
- **Physiotherapists**: Injury management, recovery routines, recommendations
- **Nutritionists**: Meal planning, supplementation, nutrition integration
- **Doctors**: Health monitoring, medical recommendations
- **Other Health Professionals**: Specialized health services

### 🔗 [Shared Components](./shared/)

Common elements shared across all applications.

**Components:**

- Technical architecture and system design
- Design principles and user experience guidelines
- Data models and integration patterns
- Security and privacy frameworks

## Documentation Structure

### User App Documentation

- **[User App Overview](./user-app/README.md)**: Complete user app explanation
- **[User Personas](./user-app/user-personas.md)**: Comprehensive personas with management type attributes
- **[Business Strategy](./user-app/business-strategy.md)**: User app positioning and strategy

### Professional Platform Documentation

- **[Professional Platform Overview](./professional-platform/README.md)**: Complete professional platform explanation
- **[Professional Personas](./professional-platform/professional-personas.md)**: Health professional personas and capabilities
- **[Business Strategy](./professional-platform/business-strategy.md)**: Professional platform positioning and strategy

### Shared Documentation

- **[Technical Architecture](./shared/technical-architecture.md)**: System design and integration patterns
- **[Design Principles](./shared/design-principles.md)**: Core design guidelines and UX principles

## Feature Documentation

Feature-specific documentation is organized in the `docs/features/` directory:

- **Premium Routine Management**: `docs/features/premium-routine-management/`
- **Onboarding System**: `docs/features/onboarding-system/`
- **Platform Integrations**: `docs/features/platform-integrations/`
- **Nutrition Management**: `docs/features/nutrition-management/`
- **Coach Platform**: `docs/features/coach-platform/`
- **Calendar Integration**: `docs/features/calendar-integration/`

## Key Principles

### Multi-App Integration

- **Unified data model** across all applications
- **Seamless user experience** when moving between apps
- **Role-based access control** for professional features
- **Cross-platform communication** for collaborative health management

### User Management Types

- **Self-Managed**: Full user control with optional professional guidance
- **Trainer-Managed**: Professional oversight with user autonomy
- **Hybrid Models**: Users can switch between management types
- **Professional Collaboration**: Multiple professionals can support one user

### Feature Distribution

- **User App**: Core health and fitness features, routine management, progress tracking
- **Professional Platform**: Client management, professional tools, collaboration features
- **Shared Features**: Calendar integration, platform integrations, data analytics

## Quick Links

- [User App Documentation](./user-app/)
- [Professional Platform Documentation](./professional-platform/)
- [Shared Components](./shared/)
- [Feature Documentation](../features/)
- [Project TODO](../todo.md)

---

_This documentation provides the foundation for all app development and ensures consistency across the PeakHealth ecosystem._
