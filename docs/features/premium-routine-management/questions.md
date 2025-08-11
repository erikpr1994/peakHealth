# Questions & Feedback - Premium Routine Management

This document contains all questions that need answers to finalize the feature design. Questions are organized by category and marked with their status.

## Question Status Legend

- 🔴 **PENDING**: Question needs an answer
- 🟡 **ANSWERED**: Question has been answered but not yet integrated into design
- 🟢 **RESOLVED**: Question answered and design updated accordingly

---

## Phase Calculation Logic

### 🟢 Q1.1: Automatic Phase Duration Calculation

**Question**: Should the system automatically calculate phase durations based on competition date?

**Context**: For trail runners, if they set a competition date 6 months away, should the system automatically suggest:

- Base Building: 2 months
- Build Phase: 2 months
- Peak Phase: 2 months

**Sub-questions**:

- What's the minimum/maximum recommended training time for different competition types?
- Should there be different phase structures for different race distances?
- How should the system handle very short (1-2 months) or very long (12+ months) preparation periods?

**Impact**: This affects the core user experience and automation level of the system.

**Answer**: YES, with intelligent recommendations and user control:

**System Approach**:

- **Automatic calculation** of phase durations based on start date and competition date
- **Recommendations only** - users have final decision and can override
- **AI-powered analysis** using competition type and characteristics
- **Integration with health/performance stats** from platforms like Strava, Garmin Connect

**Competition Validation**:

- **Alert system** for competitions too close to current date
- **Recommend alternative objectives** when timeline is insufficient
- **Competition-specific analysis** based on type and characteristics

**User Control**:

- **Accept/reject recommendations** - users must explicitly accept the proposed structure
- **Override capability** - users can modify phase durations and structures
- **Flexible timelines** for Health/Weight Loss users

**Implementation**:

- AI-powered competition analysis and timeline recommendations
- Integration with fitness platforms for personalized recommendations (future iteration)
- Phase-by-phase review workflow with overall plan overview
- Smart defaults approach (similar to routine smartDefaults.ts)
- Adaptive planning based on phase outcomes
- Alternative suggestions when timeline is insufficient

**Future Considerations**:

- Platform integrations will be handled in separate integration feature
- Trial periods for trainer-managed users (routine feature consideration)
- Competition change handling (open question for future)

---

### 🔴 Q1.2: Multiple Competitions Handling

**Question**: How should the system handle multiple competitions in one season?

**Context**: Trail runners often have supporting races before their main competition.

**Sub-questions**:

- Should supporting races be treated as part of the main competition training?
- How should the system handle conflicting training requirements between races?
- Should there be automatic tapering and recovery periods between races?

**Impact**: This affects calendar integration and training plan complexity.

---

### 🔴 Q1.3: Health/Weight Loss Phase Duration

**Question**: Should phase durations be user-defined or system-recommended for health/weight loss goals?

**Context**: Unlike competitions with fixed dates, health goals might be more flexible.

**Sub-questions**:

- Should the system recommend phase durations based on goal type and timeline?
- How should the system handle goal adjustments mid-season?
- Should there be different phase structures for different goal types?

**Impact**: This affects the flexibility and guidance level for different user types.

---

### 🟢 Q1.4: Bodybuilding Phase Structure

**Question**: How should the system handle bodybuilding's distinct bulking/cutting phases?

**Context**: Bodybuilding has very different phase structures compared to endurance sports.

**Sub-questions**:

- Should the system have predefined bulking/cutting phase templates?
- How should nutrition and supplementation be integrated into phase planning?
- Should there be specialized "peak week" planning for competitions?

**Impact**: This affects the system's ability to serve bodybuilding competitors effectively.

**Answer**: YES to all aspects, with nutrition as a future feature:

**Predefined Templates**:

- **Bulking Phase**: 4-6 months, focus on muscle mass development, higher volume training
- **Cutting Phase**: 2-3 months, focus on fat loss and conditioning, modified training protocols
- **Peak Week**: 1 week, specialized competition preparation with day-by-day protocols
- **Recovery**: 1-2 months, post-competition rest and maintenance

**Phase Transitions**:

- **Dramatic Changes**: System handles the significant differences between bulking and cutting
- **Training Protocol Adjustments**: Volume, intensity, and exercise selection changes
- **Recovery Management**: Different recovery patterns for each phase

**Nutrition Integration**:

- **Future Feature**: Will be a separate feature integrated with Premium Routine Management
- **Universal Importance**: Nutrition is crucial for all user types, not just bodybuilding
- **Integration Points**: Will connect with phase planning for comprehensive health management

**Implementation**:

- Bodybuilding-specific phase templates in MVP
- Peak week planning with specialized protocols
- Phase transition management and training adjustments
- Nutrition integration planned for future iteration

---

### 🔴 Q1.5: City Race vs Trail Running Differences

**Question**: Should city race runners have different phase structures than trail runners?

**Context**: Both are running-focused but may have different training approaches.

**Sub-questions**:

- Should city runners have more emphasis on pace-based training?
- How should the system handle multiple races (10K, half, marathon) in one season?
- Should there be different recovery patterns for road vs trail running?

**Impact**: This affects the precision of training plans for different running disciplines.

---

## Routine Assignment

### 🔴 Q2.1: Multiple Routine Assignment

**Question**: Can users assign multiple routines to the same phase?

**Context**: A phase might need strength, cardio, and mobility routines.

**Sub-questions**:

- Should there be limits on how many routines can be assigned to a phase?
- How should the system handle routine frequency conflicts?
- Should there be recommended routine combinations for different phases?

**Impact**: This affects the flexibility and complexity of phase planning.

---

### 🔴 Q2.2: Routine Conflict Resolution

**Question**: How should the system handle routine conflicts (e.g., two strength routines on same day)?

**Context**: Users might assign routines that would conflict with each other.

**Sub-questions**:

- Should the system detect and warn about conflicts?
- Should it automatically suggest alternative scheduling?
- Should users be able to override conflict warnings?

**Impact**: This affects user experience and training plan quality.

---

### 🔴 Q2.3: Routine Progression

**Question**: How should routines evolve through phases?

**Context**: The same routine might need to be modified as training progresses.

**Sub-questions**:

- Should users create new routines for each phase?
- Should the system suggest routine modifications?
- Should there be automatic progression rules (e.g., increase weight, decrease reps)?

**Impact**: This affects the relationship between the routine system and season planning.

---

### 🔴 Q2.4: Bodybuilding-Specific Routines

**Question**: How should the system handle bodybuilding's phase-specific training protocols?

**Context**: Bodybuilding routines change dramatically between bulking and cutting phases.

**Sub-questions**:

- Should there be specialized routine templates for bulking vs cutting?
- How should the system handle volume/intensity changes between phases?
- Should there be integration with nutrition and supplementation tracking?

**Impact**: This affects the system's ability to serve bodybuilding competitors.

---

## Progress Tracking

### 🔴 Q3.1: Metrics by Persona

**Question**: What metrics should be tracked for each persona?

**Context**: Different user types need different progress indicators.

**Sub-questions**:

- **Trail Runner**: Distance, pace, elevation, race times?
- **City Race Runner**: Pace zones, BQ progress, race times?
- **Bodybuilding Competitor**: Physique photos, measurements, strength gains?
- **Health/Fitness**: Body composition, strength gains, consistency?
- **Weight Loss**: Weight, body fat, measurements, adherence?

**Impact**: This affects the progress visualization and motivation features.

---

### 🔴 Q3.2: Missed Workout Handling

**Question**: How should the system handle missed workouts or phase adjustments?

**Context**: Life happens and users will miss workouts.

**Sub-questions**:

- Should the system automatically adjust the training plan?
- Should there be catch-up workouts or plan modifications?
- How should this affect phase progression?

**Impact**: This affects the robustness and user experience of the system.

---

### 🔴 Q3.3: Phase Progression Control

**Question**: Should there be automatic phase progression or manual user control?

**Context**: Should phases automatically advance or require user confirmation?

**Sub-questions**:

- Should phases auto-advance based on time or completion criteria?
- Should users be able to manually advance or delay phases?
- Should there be notifications when phase transitions are due?

**Impact**: This affects the automation level and user control.

---

### 🔴 Q3.4: Competition-Specific Tracking

**Question**: How should the system track progress toward competition goals?

**Context**: Different competition types need different progress indicators.

**Sub-questions**:

- **Running**: Should there be BQ time calculators and pace predictions?
- **Bodybuilding**: Should there be physique assessment tools and conditioning tracking?
- **General**: Should there be goal achievement probability calculations?

**Impact**: This affects the motivation and guidance features for competitive users.

---

## Calendar Integration

### 🔴 Q4.1: Calendar Conflict Handling

**Question**: How should the system handle calendar conflicts with existing events?

**Context**: Users have existing commitments that might conflict with training.

**Sub-questions**:

- Should the system detect conflicts and suggest alternatives?
- Should users be able to mark certain events as non-negotiable?
- How should the system handle recurring conflicts?

**Impact**: This affects the practical usability of the calendar integration.

---

### 🔴 Q4.2: Manual Routine Adjustments

**Question**: Should users be able to manually adjust scheduled routines?

**Context**: Users might want to move workouts around or skip them.

**Sub-questions**:

- Should manual changes affect the overall season plan?
- Should there be a history of manual adjustments?
- How should the system handle frequent manual changes?

**Impact**: This affects user flexibility and plan integrity.

---

### 🔴 Q4.3: Recovery Scheduling

**Question**: How should recovery and rest days be automatically scheduled?

**Context**: Recovery is crucial for training success.

**Sub-questions**:

- Should rest days be automatically scheduled based on workout intensity?
- Should there be deload weeks built into phases?
- How should recovery periods be customized for different users?

**Impact**: This affects training plan quality and injury prevention.

---

### 🔴 Q4.4: Multi-Race Scheduling

**Question**: How should the system handle scheduling for multiple races in one season?

**Context**: City race runners often have multiple races (10K, half, marathon) in one season.

**Sub-questions**:

- Should supporting races be automatically scheduled as training milestones?
- How should the system handle tapering periods between races?
- Should there be different scheduling rules for different race distances?

**Impact**: This affects the planning complexity for multi-race seasons.

---

## User Experience

### 🔴 Q5.1: Recommendation Level

**Question**: Should the system provide phase recommendations or require user input?

**Context**: Balance between automation and user control.

**Sub-questions**:

- Should there be a guided setup wizard for new users?
- Should expert users be able to bypass recommendations?
- How much customization should be available?

**Impact**: This affects onboarding and user satisfaction.

---

### 🔴 Q5.2: Planning to Execution Transition

**Question**: How should the interface handle the transition between planning and execution?

**Context**: Users need to move from planning their season to executing it.

**Sub-questions**:

- Should there be a clear distinction between planning and execution modes?
- How should progress be visualized during execution?
- Should users be able to modify plans during execution?

**Impact**: This affects the overall user workflow and experience.

---

### 🔴 Q5.3: Customization vs Guidance

**Question**: What level of customization should be available vs. guided experience?

**Context**: Balance between flexibility and simplicity.

**Sub-questions**:

- Should there be beginner, intermediate, and expert modes?
- What features should be available in each mode?
- How should users progress between modes?

**Impact**: This affects the target audience and feature complexity.

---

### 🔴 Q5.4: Persona-Specific Onboarding

**Question**: Should there be different onboarding experiences for different personas?

**Context**: Trail runners, bodybuilders, and weight loss users have very different needs.

**Sub-questions**:

- Should the setup wizard adapt based on user goals?
- Should there be persona-specific templates and examples?
- How should the system guide users toward appropriate features?

**Impact**: This affects the initial user experience and feature adoption.

---

### 🔴 Q5.5: Trial Period for Trainer-Managed Users

**Question**: Should there be trial periods for users managed by trainers?

**Context**: Some users work with trainers who might want learning periods for new routines.

**Sub-questions**:

- Should there be learning weeks when starting new strength routines?
- How should trial periods integrate with the season planning system?
- Should trial periods be trainer-controlled or system-suggested?

**Impact**: This affects the trainer-user relationship and routine adoption.

**Related Features**: Routine Management (future feature consideration)

---

## Competitive Differentiation

### 🔴 Q6.1: KULG Differentiation

**Question**: How should we differentiate from KULG's running analytics focus?

**Context**: KULG excels at running analytics but is limited to running only.

**Sub-questions**:

- Should we emphasize our multi-sport capabilities in the UI?
- How should we position our comprehensive planning vs their analytics focus?
- Should we offer similar coach collaboration features?

**Impact**: This affects our competitive positioning and feature prioritization.

---

### 🔴 Q6.2: TrainingPeaks Differentiation

**Question**: How should we differentiate from TrainingPeaks' professional tools?

**Context**: TrainingPeaks is the industry standard but has legacy UX and rigid models.

**Sub-questions**:

- Should we emphasize our modern, intuitive interface?
- How should we position our flexible planning vs their rigid periodization?
- Should we target the same professional coach market?

**Impact**: This affects our target market and feature development priorities.

---

### 🔴 Q6.3: Feature Parity vs Innovation

**Question**: Should we match competitor features or focus on unique capabilities?

**Context**: We need to decide between feature parity and innovation.

**Sub-questions**:

- Which competitor features are essential to match?
- What unique features should we prioritize?
- How should we balance imitation vs innovation?

**Impact**: This affects development priorities and competitive positioning.

---

## Priority Questions

These questions should be answered first as they affect the core system design:

1. **Q1.1** - Automatic Phase Duration Calculation
2. **Q1.4** - Bodybuilding Phase Structure
3. **Q2.1** - Multiple Routine Assignment
4. **Q3.3** - Phase Progression Control
5. **Q5.1** - Recommendation Level
6. **Q6.1** - KULG Differentiation

---

_Last Updated: [Current Date]_
_Total Questions: 22_
_Pending: 22 | Answered: 0 | Resolved: 0_
