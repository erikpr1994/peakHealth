// Re-export workout calculation functions from domain layer
// This maintains backward compatibility while organizing code by responsibility

export {
  calculateWorkoutDuration,
  parseRestTime,
  generateSetsForProgression,
  addApproachSets,
} from '../domain/calculations';
