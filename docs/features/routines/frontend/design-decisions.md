# Frontend Design Decisions

This document captures the key architectural and user experience decisions made for the frontend of the Routines feature, migrated from the legacy `_archive/questions.md` file to preserve the rationale behind the design.

---

## 🎯 **User Experience Questions**

### **Q: How should the routine creation flow be optimized?**

- **Decision**: A tiered approach based on user subscription level.
- **Implementation**:
  - **Free Users**: Guided wizard (step-by-step creation).
  - **Basic Paying Users**: Hybrid approach (templates + customization).
  - **Premium Users**: AI-assisted creation (smart recommendations) - _Post-MVP_.
- **Rationale**: This provides clear value at each subscription tier, encouraging upgrades while still offering a great experience for free users.

### **Q: How should routine complexity be managed?**

- **Decision**: Use a "progressive disclosure" model.
- **Implementation**: Maintain a single, consistent interface for all users. Advanced features are present but not obtrusive, allowing users to discover them as their needs become more complex.
- **Rationale**: This avoids the confusion of separate "beginner" or "advanced" modes and allows users to learn organically. It is also more maintainable.

### **Q: How should the feature integrate with the workout tracker?**

- **Decision**: A hybrid approach with a primary "quick start" and manual override.
- **Implementation**:
  - The dashboard will prominently feature a "Start Today's Workout" button for the next scheduled session.
  - Users can also manually initiate any workout from the routine detail page.
- **Rationale**: This provides both convenience for users following a schedule and flexibility for those who need to adjust their plan on the fly.

---

## 🔧 **Feature Scope Questions**

### **Q: Should routine templates and community sharing be in the MVP?**

- **Decision**: Basic, curated templates in the MVP; community features are post-MVP.
- **Rationale**: Providing high-quality, curated templates offers immediate value and improves onboarding. Deferring community/social sharing features avoids significant complexity (moderation, permissions, etc.) and allows for a faster MVP delivery.

### **Q: Should the MVP include AI recommendations?**

- **Decision**: No AI in the MVP.
- **Rationale**: The core value is in the routine creation and execution tools. AI is a powerful enhancement, but it's a significant undertaking and should be added as a premium feature once the core platform is validated.

### **Q: Should the MVP include import/export functionality?**

- **Decision**: No import/export in the MVP.
- **Rationale**: This is a power-user feature. The priority for the MVP is to provide a great experience for creating routines _within_ the platform.
