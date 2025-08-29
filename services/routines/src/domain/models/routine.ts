import mongoose, { Schema, Document } from 'mongoose';
import { 
  UserCreatedRoutine, 
  Workout, 
  StrengthWorkout, 
  RunningWorkout, 
  TrailRunningWorkout,
  StrengthWorkoutSection,
  RunningWorkoutSection,
  SectionType,
  Difficulty,
  Goal,
  ISODateString,
  ObjectId,
  SetType,
  RepType,
  UnilateralMode,
  ProgressionMethod
} from '@peakhealth/routines-types';

// Define schema for base set
const baseSetSchema = new Schema({
  _id: { type: String, required: true },
  setNumber: { type: Number, required: true },
  setType: { 
    type: String, 
    enum: ['working', 'warmup', 'drop', 'failure'],
    required: true 
  },
  repType: { 
    type: String, 
    enum: ['fixed', 'range', 'time', 'max'],
    required: true 
  },
  notes: { type: String },
  restAfter: { type: String } // DurationString
}, { discriminatorKey: 'setType', _id: false });

// Define schema for strength set
const strengthSetSchema = new Schema({
  reps: { type: Number },
  repsMin: { type: Number },
  repsMax: { type: Number },
  weight: { type: Number },
  rpe: { type: Number },
  duration: { type: Number },
  tempo: {
    eccentric: { type: Number },
    eccentric_pause: { type: Number },
    concentric: { type: Number },
    concentric_pause: { type: Number }
  },
  unilateralSide: { 
    type: String, 
    enum: ['left', 'right'] 
  }
});

// Define schema for bodyweight set
const bodyweightSetSchema = new Schema({
  reps: { type: Number },
  repsMin: { type: Number },
  repsMax: { type: Number },
  duration: { type: Number },
  rpe: { type: Number },
  unilateralSide: { 
    type: String, 
    enum: ['left', 'right'] 
  }
});

// Define schema for mobility set
const mobilitySetSchema = new Schema({
  duration: { type: Number },
  reps: { type: Number },
  holdTime: { type: String } // DurationString
});

// Define schema for base exercise
const baseExerciseSchema = new Schema({
  _id: { type: String, required: true },
  exerciseId: { type: String, required: true },
  exerciseVariantId: { type: String, required: true },
  orderIndex: { type: Number, required: true },
  restBetweenSets: { type: String }, // DurationString
  restAfter: { type: String }, // DurationString
  notes: { type: String }
}, { discriminatorKey: 'type', _id: false });

// Define schema for strength exercise
const strengthExerciseSchema = new Schema({
  type: { 
    type: String, 
    enum: ['strength'],
    required: true,
    default: 'strength'
  },
  progressionMethod: { 
    type: String, 
    enum: [
      'linear', 
      'percentage', 
      'rpe', 
      'time-under-tension', 
      'dual-linear', 
      'widowmaker', 
      'myo-reps', 
      'amrap', 
      'pyramid', 
      'wave-loading', 
      'cluster-sets', 
      'rest-pause'
    ]
  },
  sets: [strengthSetSchema],
  unilateralMode: { 
    type: String, 
    enum: ['alternating', 'sequential', 'simultaneous'] 
  },
  supersetGroupId: { type: String }
});

// Define schema for bodyweight exercise
const bodyweightExerciseSchema = new Schema({
  type: { 
    type: String, 
    enum: ['bodyweight'],
    required: true,
    default: 'bodyweight'
  },
  sets: [bodyweightSetSchema],
  progressionMethod: { 
    type: String, 
    enum: [
      'linear', 
      'percentage', 
      'rpe', 
      'time-under-tension', 
      'dual-linear', 
      'widowmaker', 
      'myo-reps', 
      'amrap', 
      'pyramid', 
      'wave-loading', 
      'cluster-sets', 
      'rest-pause'
    ]
  },
  unilateralMode: { 
    type: String, 
    enum: ['alternating', 'sequential', 'simultaneous'] 
  }
});

// Define schema for mobility exercise
const mobilityExerciseSchema = new Schema({
  type: { 
    type: String, 
    enum: ['mobility'],
    required: true,
    default: 'mobility'
  },
  sets: [mobilitySetSchema],
  unilateralMode: { 
    type: String, 
    enum: ['alternating', 'sequential', 'simultaneous'] 
  }
});

// Define schema for tabata exercise
const tabataExerciseSchema = new Schema({
  type: { 
    type: String, 
    enum: ['tabata'],
    required: true,
    default: 'tabata'
  },
  unilateralMode: { 
    type: String, 
    enum: ['alternating', 'sequential', 'simultaneous'] 
  }
});

// Define schema for the base workout section
const baseSectionSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: [
      'basic',
      'emom',
      'tabata',
      'circuit',
      'intervals',
      'tempo',
      'fartlek',
      'hill_repeats',
      'warmup',
      'cooldown'
    ],
    required: true 
  },
  orderIndex: { type: Number, required: true },
  restAfter: { type: String }, // DurationString
  notes: { type: String },
  exercises: [baseExerciseSchema]
}, { discriminatorKey: 'type', _id: false });

// Define schema for basic section
const basicSectionSchema = new Schema({
  // No additional fields beyond base section
});

// Define schema for warmup section
const warmupSectionSchema = new Schema({
  targetMuscleGroups: [{ type: String }],
  duration: { type: Number, required: true }, // minutes
  intensity: { 
    type: String, 
    enum: ['light', 'moderate'],
    required: true 
  }
});

// Define schema for cooldown section
const cooldownSectionSchema = new Schema({
  duration: { type: Number, required: true }, // minutes
  stretchingFocus: [{ type: String }]
});

// Define schema for EMOM section
const emomSectionSchema = new Schema({
  emomDuration: { type: Number, required: true }, // minutes
  rounds: { type: Number, required: true },
  restBetweenRounds: { type: String } // DurationString
});

// Define schema for tabata section
const tabataSectionSchema = new Schema({
  workInterval: { type: String, required: true }, // DurationString
  restInterval: { type: String, required: true }, // DurationString
  rounds: { type: Number, required: true }
  // Note: exercises field is already in the base schema
});

// Define schema for circuit section
const circuitSectionSchema = new Schema({
  rounds: { type: Number, required: true },
  restBetweenRounds: { type: String, required: true }, // DurationString
  restBetweenExercises: { type: String } // DurationString
});

// Define schema for interval section
const intervalSectionSchema = new Schema({
  rounds: { type: Number, required: true },
  workDistance: { type: Number }, // meters
  workDuration: { type: String }, // DurationString
  restDuration: { type: String, required: true }, // DurationString
  intensity: { 
    type: String, 
    enum: ['aerobic', 'anaerobic', 'vo2max'],
    required: true 
  }
});

// Define schema for tempo section
const tempoSectionSchema = new Schema({
  distance: { type: Number }, // miles/km
  duration: { type: String, required: true }, // DurationString
  targetPace: { type: String, required: true } // e.g., "7:30/mile"
});

// Define schema for fartlek section
const fartlekSectionSchema = new Schema({
  duration: { type: String, required: true }, // DurationString
  description: { type: String, required: true }
});

// Define schema for hill repeats section
const hillRepeatsSectionSchema = new Schema({
  repeats: { type: Number, required: true },
  hillLength: { type: Number }, // meters
  restType: { 
    type: String, 
    enum: ['jog_down', 'walk_down', 'static'],
    required: true 
  }
});

// Define schema for base workout
const baseWorkoutSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  orderIndex: { type: Number, required: true },
  objective: { type: String },
  notes: { type: String },
  sections: [baseSectionSchema]
}, { discriminatorKey: 'type', _id: false });

// Define schema for strength workout
const strengthWorkoutSchema = new Schema({
  type: { 
    type: String, 
    enum: ['strength'],
    required: true,
    default: 'strength'
  }
  // sections is already defined in the base schema
});

// Define schema for running workout
const runningWorkoutSchema = new Schema({
  type: { 
    type: String, 
    enum: ['running'],
    required: true,
    default: 'running'
  }
  // sections is already defined in the base schema
});

// Define schema for trail running workout
const trailRunningWorkoutSchema = new Schema({
  type: { 
    type: String, 
    enum: ['trail-running'],
    required: true,
    default: 'trail-running'
  }
  // sections is already defined in the base schema
});

// Define the UserCreatedRoutine schema
const userCreatedRoutineSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  difficulty: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true 
  },
  goal: { 
    type: String, 
    enum: [
      'strength', 
      'hypertrophy', 
      'endurance', 
      'power', 
      'weight_loss', 
      'general_fitness', 
      'mobility', 
      'sport_specific'
    ],
    required: true 
  },
  duration: { 
    type: Number, 
    required: true,
    min: 1,
    max: 52
  },
  objectives: [{ type: String }],
  workouts: [baseWorkoutSchema],
  
  // Metadata
  schemaVersion: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
  
  // UserCreatedRoutine specific fields
  userId: { type: String, required: true },
  createdBy: { type: String, required: true },
  routineType: { 
    type: String, 
    enum: ['user-created'],
    required: true,
    default: 'user-created'
  },
  
  // User-specific progress and status
  isActive: { type: Boolean, required: true, default: false },
  isFavorite: { type: Boolean, required: true, default: false },
  completedWorkouts: { type: Number, required: true, default: 0 },
  totalWorkouts: { type: Number, required: true, default: 0 },
  lastUsed: { type: String }
});

// Create discriminator models for sections
const SectionModel = mongoose.model('Section', baseSectionSchema);
SectionModel.discriminator('basic', basicSectionSchema);
SectionModel.discriminator('warmup', warmupSectionSchema);
SectionModel.discriminator('cooldown', cooldownSectionSchema);
SectionModel.discriminator('emom', emomSectionSchema);
SectionModel.discriminator('tabata', tabataSectionSchema);
SectionModel.discriminator('circuit', circuitSectionSchema);
SectionModel.discriminator('intervals', intervalSectionSchema);
SectionModel.discriminator('tempo', tempoSectionSchema);
SectionModel.discriminator('fartlek', fartlekSectionSchema);
SectionModel.discriminator('hill_repeats', hillRepeatsSectionSchema);

// Create discriminator models for exercises
const ExerciseModel = mongoose.model('Exercise', baseExerciseSchema);
ExerciseModel.discriminator('strength', strengthExerciseSchema);
ExerciseModel.discriminator('bodyweight', bodyweightExerciseSchema);
ExerciseModel.discriminator('mobility', mobilityExerciseSchema);
ExerciseModel.discriminator('tabata', tabataExerciseSchema);

// Create discriminator models for sets
const SetModel = mongoose.model('Set', baseSetSchema);
// Note: We're using setType as the discriminator key, but we still need to register the discriminators
// with different names to avoid conflicts
SetModel.discriminator('strengthSet', strengthSetSchema);
SetModel.discriminator('bodyweightSet', bodyweightSetSchema);
SetModel.discriminator('mobilitySet', mobilitySetSchema);

// Create discriminator models for workouts
const WorkoutModel = mongoose.model('Workout', baseWorkoutSchema);
WorkoutModel.discriminator('strength', strengthWorkoutSchema);
WorkoutModel.discriminator('running', runningWorkoutSchema);
WorkoutModel.discriminator('trail-running', trailRunningWorkoutSchema);

// Create and export the model
export interface UserCreatedRoutineDocument extends Document, Omit<UserCreatedRoutine, '_id'> {
  _id: mongoose.Types.ObjectId;
}

export const UserCreatedRoutineModel = mongoose.model<UserCreatedRoutineDocument>(
  'UserCreatedRoutine', 
  userCreatedRoutineSchema
);

export default UserCreatedRoutineModel;

