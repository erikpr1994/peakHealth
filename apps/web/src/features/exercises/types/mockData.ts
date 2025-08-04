import { CATEGORY, DIFFICULTY, EQUIPMENT, MUSCLE_GROUP } from './constants';
import { Exercise, ExerciseVariant, Routine } from './exercise';
import { createExerciseId, createExerciseVariantId } from './ids';

// Mock exercise variants
const benchPressVariants: ExerciseVariant[] = [
  {
    id: createExerciseVariantId('bench-press-basic'),
    name: 'Bench Press',
    description:
      'A fundamental upper body exercise targeting the chest, triceps, and shoulders.',
    focus: 'Overall Chest',
    difficulty: DIFFICULTY.INTERMEDIATE,
    equipment: [EQUIPMENT.BARBELL, EQUIPMENT.BENCH],
    muscleGroups: [
      MUSCLE_GROUP.CHEST,
      MUSCLE_GROUP.TRICEPS,
      MUSCLE_GROUP.SHOULDERS,
    ],
    instructions: [
      'Lie flat on the bench with feet planted on the ground',
      'Grip the barbell with hands slightly wider than shoulder-width',
      'Lower the bar to your chest with control',
      'Press the bar back up to starting position',
    ],
    steps: [
      {
        title: 'Starting Position',
        description:
          'Lie flat on the bench with your feet planted firmly on the floor. Your eyes should be directly under the barbell.',
      },
      {
        title: 'Grip',
        description:
          'Grip the barbell with hands slightly wider than shoulder-width apart. Wrap your thumbs around the bar for safety.',
      },
      {
        title: 'Lowering Phase',
        description:
          'Lower the bar slowly and under control to your mid-chest. Keep your elbows at approximately a 45-75 degree angle.',
      },
      {
        title: 'Pressing Phase',
        description:
          'Push the bar back up to the starting position by extending your arms. Focus on pushing through your chest muscles.',
      },
      {
        title: 'Breathing',
        description:
          'Inhale during the lowering phase and exhale during the pressing phase.',
      },
    ],
    tips: {
      proTips: [
        'Keep your wrists straight and directly above your elbows.',
        'Maintain a slight arch in your lower back, but keep your butt on the bench.',
        'Drive through your feet for stability and added power.',
        'Keep your shoulder blades retracted and "tucked" throughout the movement.',
        'Focus on pushing yourself away from the bar, rather than pushing the bar away from you.',
      ],
      commonMistakes: [
        'Bouncing the bar off your chest, which can lead to injury.',
        'Lifting your butt off the bench, which reduces stability.',
        'Flaring your elbows out too wide, which can strain your shoulders.',
        'Not lowering the bar to chest level, which reduces the effectiveness.',
        'Using too much weight and sacrificing proper form.',
      ],
    },
    media: {
      images: ['/exercise-images/bench-press.jpg'],
      videos: ['/videos/bench-press.mp4'],
      featuredImage: '/exercise-images/bench-press.jpg',
      featuredVideo: '/videos/bench-press.mp4',
    },
  },
  {
    id: createExerciseVariantId('incline-bench'),
    name: 'Incline Bench Press',
    description: 'Targets upper chest more than flat bench press.',
    focus: 'Upper Chest Focus',
    difficulty: DIFFICULTY.INTERMEDIATE,
    equipment: [EQUIPMENT.BARBELL, EQUIPMENT.INCLINE_BENCH],
    muscleGroups: [
      MUSCLE_GROUP.UPPER_CHEST,
      MUSCLE_GROUP.SHOULDERS,
      MUSCLE_GROUP.TRICEPS,
    ],
    instructions: [
      'Set bench to 30-45 degree incline',
      'Lie back with feet planted firmly',
      'Grip barbell with hands slightly wider than shoulder-width',
      'Lower bar to upper chest with control',
      'Press bar back up to starting position',
    ],
    steps: [
      {
        title: 'Setup',
        description: 'Set the bench to a 30-45 degree incline angle.',
      },
      {
        title: 'Position',
        description: 'Lie back with feet planted firmly on the ground.',
      },
      {
        title: 'Grip',
        description:
          'Grip the barbell with hands slightly wider than shoulder-width.',
      },
      {
        title: 'Execution',
        description:
          'Lower the bar to your upper chest with control, then press back up.',
      },
    ],
    media: {
      images: ['/exercise-images/incline-bench.jpg'],
      featuredImage: '/exercise-images/incline-bench.jpg',
    },
  },
  {
    id: createExerciseVariantId('decline-bench'),
    name: 'Decline Bench Press',
    description: 'Targets lower chest more than flat bench press.',
    focus: 'Lower Chest Focus',
    difficulty: DIFFICULTY.INTERMEDIATE,
    equipment: [EQUIPMENT.BARBELL, EQUIPMENT.DECLINE_BENCH],
    muscleGroups: [
      MUSCLE_GROUP.LOWER_CHEST,
      MUSCLE_GROUP.SHOULDERS,
      MUSCLE_GROUP.TRICEPS,
    ],
    instructions: [
      'Set bench to 15-30 degree decline',
      'Secure feet under the foot pads',
      'Grip barbell with hands slightly wider than shoulder-width',
      'Lower bar to lower chest with control',
      'Press bar back up to starting position',
    ],
    steps: [
      {
        title: 'Setup',
        description: 'Set the bench to a 15-30 degree decline angle.',
      },
      {
        title: 'Position',
        description: 'Secure your feet under the foot pads for stability.',
      },
      {
        title: 'Execution',
        description:
          'Lower the bar to your lower chest with control, then press back up.',
      },
    ],
    media: {
      images: ['/exercise-images/decline-bench.jpg'],
      featuredImage: '/exercise-images/decline-bench.jpg',
    },
  },
  {
    id: createExerciseVariantId('dumbbell-bench'),
    name: 'Dumbbell Bench Press',
    description: 'Allows greater range of motion and stabilizer engagement.',
    focus: 'Stabilizer Focus',
    difficulty: DIFFICULTY.INTERMEDIATE,
    equipment: [EQUIPMENT.DUMBBELL, EQUIPMENT.BENCH],
    muscleGroups: [
      MUSCLE_GROUP.CHEST,
      MUSCLE_GROUP.SHOULDERS,
      MUSCLE_GROUP.TRICEPS,
    ],
    instructions: [
      'Lie flat on bench with dumbbells at chest level',
      'Press dumbbells up until arms are fully extended',
      'Lower dumbbells back to chest with control',
      'Keep core engaged throughout movement',
      'Maintain neutral wrist position',
    ],
    steps: [
      {
        title: 'Setup',
        description: 'Lie flat on the bench with dumbbells at chest level.',
      },
      {
        title: 'Execution',
        description: 'Press the dumbbells up until arms are fully extended.',
      },
      {
        title: 'Control',
        description: 'Lower the dumbbells back to chest with control.',
      },
    ],
    media: {
      images: ['/exercise-images/dumbbell-bench.jpg'],
      featuredImage: '/exercise-images/dumbbell-bench.jpg',
    },
  },
];

const squatVariants: ExerciseVariant[] = [
  {
    id: createExerciseVariantId('squat-basic'),
    name: 'Squat',
    description:
      'A fundamental lower body exercise targeting the legs and glutes.',
    focus: 'Overall Lower Body',
    difficulty: DIFFICULTY.BEGINNER,
    equipment: [EQUIPMENT.BODYWEIGHT],
    muscleGroups: [MUSCLE_GROUP.LEGS, MUSCLE_GROUP.GLUTES],
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower hips back and down as if sitting in a chair',
      'Keep knees tracking over toes',
      'Return to standing position',
    ],
    steps: [
      {
        title: 'Starting Position',
        description: 'Stand with feet shoulder-width apart.',
      },
      {
        title: 'Movement',
        description: 'Lower hips back and down as if sitting in a chair.',
      },
      {
        title: 'Form',
        description: 'Keep knees tracking over toes.',
      },
      {
        title: 'Return',
        description: 'Return to standing position.',
      },
    ],
    media: {
      images: ['/exercise-images/squat.jpg'],
      featuredImage: '/exercise-images/squat.jpg',
    },
  },
  {
    id: createExerciseVariantId('goblet-squat'),
    name: 'Goblet Squat',
    description: 'Squat variation with a dumbbell held at chest level.',
    focus: 'Form Focus',
    difficulty: DIFFICULTY.BEGINNER,
    equipment: [EQUIPMENT.DUMBBELL],
    muscleGroups: [MUSCLE_GROUP.LEGS, MUSCLE_GROUP.GLUTES, MUSCLE_GROUP.CORE],
    instructions: [
      'Hold dumbbell vertically at chest level',
      'Stand with feet shoulder-width apart',
      'Lower into squat position',
      'Keep chest up and core engaged',
      'Return to standing position',
    ],
    steps: [
      {
        title: 'Setup',
        description: 'Hold a dumbbell vertically at chest level.',
      },
      {
        title: 'Position',
        description: 'Stand with feet shoulder-width apart.',
      },
      {
        title: 'Movement',
        description: 'Lower into squat position while keeping chest up.',
      },
    ],
    media: {
      images: ['/exercise-images/goblet-squat.jpg'],
      featuredImage: '/exercise-images/goblet-squat.jpg',
    },
  },
];

const pushUpVariants: ExerciseVariant[] = [
  {
    id: createExerciseVariantId('pushup-basic'),
    name: 'Push-up',
    description:
      'A bodyweight exercise that builds upper body and core strength.',
    focus: 'Overall Upper Body',
    difficulty: DIFFICULTY.BEGINNER,
    equipment: [EQUIPMENT.BODYWEIGHT],
    muscleGroups: [MUSCLE_GROUP.CHEST, MUSCLE_GROUP.TRICEPS, MUSCLE_GROUP.CORE],
    instructions: [
      'Start in plank position with hands under shoulders',
      'Lower body until chest nearly touches ground',
      'Push back up to starting position',
      'Keep core engaged throughout movement',
    ],
    steps: [
      {
        title: 'Starting Position',
        description: 'Start in plank position with hands under shoulders.',
      },
      {
        title: 'Movement',
        description: 'Lower body until chest nearly touches ground.',
      },
      {
        title: 'Return',
        description: 'Push back up to starting position.',
      },
    ],
    media: {
      images: ['/exercise-images/pushup.jpg'],
      featuredImage: '/exercise-images/pushup.jpg',
    },
  },
  {
    id: createExerciseVariantId('incline-pushup'),
    name: 'Incline Push-up',
    description: 'Easier variation with hands elevated.',
    focus: 'Beginner Friendly',
    difficulty: DIFFICULTY.BEGINNER,
    equipment: [EQUIPMENT.BENCH, EQUIPMENT.STEP],
    muscleGroups: [
      MUSCLE_GROUP.CHEST,
      MUSCLE_GROUP.TRICEPS,
      MUSCLE_GROUP.SHOULDERS,
    ],
    instructions: [
      'Place hands on elevated surface (bench, step, etc.)',
      'Keep body in straight line from head to heels',
      'Lower chest toward elevated surface',
      'Push back up to starting position',
      'Maintain core engagement throughout',
    ],
    steps: [
      {
        title: 'Setup',
        description: 'Place hands on an elevated surface like a bench or step.',
      },
      {
        title: 'Form',
        description: 'Keep body in straight line from head to heels.',
      },
      {
        title: 'Movement',
        description: 'Lower chest toward elevated surface, then push back up.',
      },
    ],
    media: {
      images: ['/exercise-images/incline-pushup.jpg'],
      featuredImage: '/exercise-images/incline-pushup.jpg',
    },
  },
  {
    id: createExerciseVariantId('diamond-pushup'),
    name: 'Diamond Push-up',
    description: 'Advanced variation targeting triceps more intensely.',
    focus: 'Tricep Focus',
    difficulty: DIFFICULTY.ADVANCED,
    equipment: [EQUIPMENT.BODYWEIGHT],
    muscleGroups: [MUSCLE_GROUP.TRICEPS, MUSCLE_GROUP.CHEST, MUSCLE_GROUP.CORE],
    instructions: [
      'Form diamond shape with hands under chest',
      'Keep elbows close to body',
      'Lower chest toward hands',
      'Push back up to starting position',
      'Maintain straight body line throughout',
    ],
    steps: [
      {
        title: 'Setup',
        description: 'Form diamond shape with hands under chest.',
      },
      {
        title: 'Form',
        description: 'Keep elbows close to body.',
      },
      {
        title: 'Movement',
        description: 'Lower chest toward hands, then push back up.',
      },
    ],
    media: {
      images: ['/exercise-images/diamond-pushup.jpg'],
      featuredImage: '/exercise-images/diamond-pushup.jpg',
    },
  },
];

// Mock exercises for ExerciseSelectionModal and ExercisesList
export const mockExercises: Exercise[] = [
  {
    id: createExerciseId('bench-press'),
    name: 'Bench Press',
    category: CATEGORY.STRENGTH,
    description:
      'A fundamental upper body exercise targeting the chest, triceps, and shoulders.',
    variants: benchPressVariants,
    mainVariantId: createExerciseVariantId('bench-press-basic'),
    icon: '🏋️',
    iconColor: 'bg-indigo-100 text-indigo-600',
    isFavorite: false,
    isPopular: true,
    rating: 4.8,
    summary: {
      difficultyRange: {
        min: DIFFICULTY.INTERMEDIATE,
        max: DIFFICULTY.INTERMEDIATE,
      },
      equipmentOptions: [
        EQUIPMENT.BARBELL,
        EQUIPMENT.BENCH,
        EQUIPMENT.DUMBBELL,
        EQUIPMENT.INCLINE_BENCH,
        EQUIPMENT.DECLINE_BENCH,
      ],
      primaryMuscleGroups: [
        MUSCLE_GROUP.CHEST,
        MUSCLE_GROUP.TRICEPS,
        MUSCLE_GROUP.SHOULDERS,
        MUSCLE_GROUP.UPPER_CHEST,
        MUSCLE_GROUP.LOWER_CHEST,
      ],
    },
    tags: ['compound', 'upper-body', 'strength'],
  },
  {
    id: createExerciseId('squats'),
    name: 'Squats',
    category: CATEGORY.STRENGTH,
    description:
      'A fundamental lower body exercise targeting the legs and glutes.',
    variants: squatVariants,
    mainVariantId: createExerciseVariantId('squat-basic'),
    icon: '🏋️',
    iconColor: 'bg-indigo-100 text-indigo-600',
    isFavorite: false,
    rating: 4.9,
    summary: {
      difficultyRange: {
        min: DIFFICULTY.BEGINNER,
        max: DIFFICULTY.BEGINNER,
      },
      equipmentOptions: [EQUIPMENT.BODYWEIGHT, EQUIPMENT.DUMBBELL],
      primaryMuscleGroups: [
        MUSCLE_GROUP.LEGS,
        MUSCLE_GROUP.GLUTES,
        MUSCLE_GROUP.CORE,
      ],
    },
    tags: ['compound', 'lower-body', 'strength'],
  },
  {
    id: createExerciseId('push-ups'),
    name: 'Push-ups',
    category: CATEGORY.STRENGTH,
    description:
      'A bodyweight exercise that builds upper body and core strength.',
    variants: pushUpVariants,
    mainVariantId: createExerciseVariantId('pushup-basic'),
    icon: '💪',
    iconColor: 'bg-indigo-100 text-indigo-600',
    isFavorite: false,
    rating: 4.6,
    summary: {
      difficultyRange: {
        min: DIFFICULTY.BEGINNER,
        max: DIFFICULTY.ADVANCED,
      },
      equipmentOptions: [EQUIPMENT.BODYWEIGHT, EQUIPMENT.BENCH, EQUIPMENT.STEP],
      primaryMuscleGroups: [
        MUSCLE_GROUP.CHEST,
        MUSCLE_GROUP.TRICEPS,
        MUSCLE_GROUP.CORE,
        MUSCLE_GROUP.SHOULDERS,
      ],
    },
    tags: ['bodyweight', 'upper-body', 'strength'],
  },
];

// Mock routines for ExerciseDetail
export const mockRoutines: Routine[] = [
  {
    id: 'upper-body',
    name: 'Upper Body Split',
    schedule: 'Mon, Wed, Fri • 12 exercises',
    exercises: 12,
    isSelected: false,
  },
  {
    id: 'push-day',
    name: 'Push Day',
    schedule: 'Tue, Sat • 8 exercises',
    exercises: 8,
    isSelected: false,
  },
  {
    id: 'chest-focus',
    name: 'Chest Focus',
    schedule: 'Thu • 6 exercises',
    exercises: 6,
    isSelected: true,
  },
];

// Legacy mock data for backward compatibility (deprecated)
export const mockExerciseData = mockExercises[0];
