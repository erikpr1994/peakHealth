# Backend Design Decisions

This document captures the key data architecture and integration decisions for the backend of the Routines feature, migrated from the legacy `_archive/questions.md` file to preserve the rationale.

---

## 🏗️ **Data Architecture Questions**

### **Q: How should routines be structured in the database?**

- **Decision**: A fully normalized schema was chosen over a hybrid or JSON-based approach.
- **Rationale**: Although the new backend uses MongoDB (which is flexible), the decision to model the data in a normalized fashion remains. This provides better data integrity, query performance for complex analytics, and scalability compared to storing large, nested JSON blobs. This decision was made when a SQL database was considered, but the principles of data integrity and query performance still apply. The final MongoDB schema uses a "snapshot" model which is a form of denormalization for performance and immutability, but the core library components are designed in a relational/normalized way.

### **Q: How should routine versioning be handled?**

- **Decision**: Template routines are versioned, but user-created routines are not.
- **Rationale**: This has been documented in detail in `docs/features/routines/backend/user-routine-design-decisions.md`. The core idea is that versioning is for reusable library components, while direct editing is more intuitive for personal user routines.

### **Q: How should routine sharing and collaboration be handled?**

- **Decision**: No peer-to-peer sharing in the MVP.
- **Rationale**: Also documented in `user-routine-design-decisions.md`. Sharing is a complex social feature reserved for future development.

---

## 🔗 **Integration Questions**

### **Q: How should the feature integrate with the exercise library?**

- **Decision**: Use a reference-based system with local storage sync for offline access.
- **Implementation**: Routines store only the `ObjectId` of an exercise. The frontend is responsible for fetching the full exercise library, caching it on the device (e.g., in IndexedDB), and resolving these references.
- **Rationale**: This is highly efficient for the database, as it avoids duplicating massive amounts of exercise data. It also provides a robust offline experience for the user, as the entire exercise library can be available on their device.

### **Q: How should user authentication and data ownership be handled?**

- **Decision**: Role-based access (owner, editor, viewer) for the MVP.
- **Rationale**: This provides the necessary permissions for the core trainer-client relationship without the complexity of a fully granular, custom permissions system, which can be built later as the professional platform evolves.

---

## ⚡ **Technical Implementation Questions**

### **Q: Should the feature support real-time collaboration?**

- **Decision**: No real-time collaboration in the MVP.
- **Rationale**: Real-time sync is technically complex and not a core requirement for the initial user and trainer experience. The primary interaction is asynchronous (a trainer builds a plan, a user follows it).

### **Q: How should offline functionality be handled?**

- **Decision**: The Workout Player will have full offline functionality. Routine creation/editing will be online-only for the MVP.
- **Rationale**: Offline support for _performing a workout_ is critical, as gym connectivity is unreliable. We have documented this in detail in the Workout Player page definition. Offline support for the _routine builder_ is a much larger undertaking with complex data-syncing challenges and is a lower priority for the initial release.
