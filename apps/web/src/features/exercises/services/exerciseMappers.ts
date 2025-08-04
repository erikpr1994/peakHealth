import type { Exercise, ExerciseVariant } from '../types';
import type {
  Category,
  Difficulty,
  Equipment,
  MuscleGroup,
} from '../types/constants';
import type {
  DatabaseExercise,
  DatabaseExerciseVariant,
  DatabaseInstructionStep,
  DatabaseExerciseTips,
  DatabaseExerciseMedia,
} from '../types/database';

// Helper function to map database category to our enum
export function mapCategory(dbCategory: string): Category {
  switch (dbCategory) {
    case 'Strength':
      return 'Strength';
    case 'Cardio':
      return 'Cardio';
    case 'Flexibility':
      return 'Flexibility';
    case 'Balance':
      return 'Balance';
    default:
      return 'Strength';
  }
}

// Helper function to map database difficulty to our enum
export function mapDifficulty(dbDifficulty: string): Difficulty {
  switch (dbDifficulty) {
    case 'Beginner':
      return 'Beginner';
    case 'Intermediate':
      return 'Intermediate';
    case 'Advanced':
      return 'Advanced';
    case 'Unknown':
      return 'Unknown';
    default:
      return 'Beginner';
  }
}

// Helper function to map database equipment to our enum
export function mapEquipment(dbEquipment: string): Equipment {
  switch (dbEquipment) {
    case 'Barbell':
      return 'Barbell';
    case 'Dumbbell':
      return 'Dumbbell';
    case 'Bodyweight':
      return 'Bodyweight';
    case 'Machine':
      return 'Machine';
    case 'Resistance Band':
      return 'Resistance Band';
    case 'Kettlebell':
      return 'Kettlebell';
    case 'Cable':
      return 'Cable';
    case 'Bench':
      return 'Bench';
    case 'Incline Bench':
      return 'Incline Bench';
    case 'Decline Bench':
      return 'Decline Bench';
    case 'Pull-up Bar':
      return 'Pull-up Bar';
    case 'Squat Rack':
      return 'Squat Rack';
    case 'Step':
      return 'Step';
    default:
      return 'Bodyweight';
  }
}

// Helper function to map database muscle group to our enum
export function mapMuscleGroup(dbMuscleGroup: string): MuscleGroup {
  switch (dbMuscleGroup) {
    case 'Chest':
      return 'Chest';
    case 'Back':
      return 'Back';
    case 'Legs':
      return 'Legs';
    case 'Arms':
      return 'Arms';
    case 'Shoulders':
      return 'Shoulders';
    case 'Core':
      return 'Core';
    case 'Glutes':
      return 'Glutes';
    case 'Biceps':
      return 'Biceps';
    case 'Triceps':
      return 'Triceps';
    case 'Cardio':
      return 'Cardio';
    case 'Full Body':
      return 'Full Body';
    case 'Upper Chest':
      return 'Upper Chest';
    case 'Lower Chest':
      return 'Lower Chest';
    case 'Front Delts':
      return 'Front Delts';
    case 'Obliques':
      return 'Obliques';
    case 'Quadriceps':
      return 'Quadriceps';
    case 'Hamstrings':
      return 'Hamstrings';
    default:
      return 'Core';
  }
}

// Transform database exercise variant to our ExerciseVariant type
export function transformExerciseVariant(
  dbVariant: DatabaseExerciseVariant,
  steps: DatabaseInstructionStep[],
  tips?: DatabaseExerciseTips,
  media?: DatabaseExerciseMedia
): ExerciseVariant {
  return {
    id: dbVariant.id as ExerciseVariant['id'],
    name: dbVariant.name,
    alternativeNames: dbVariant.alternative_names,
    description: dbVariant.description,
    focus: dbVariant.focus,
    difficulty: mapDifficulty(dbVariant.difficulty),
    equipment: dbVariant.equipment.map(mapEquipment),
    muscleGroups: dbVariant.muscle_groups.map(mapMuscleGroup),
    secondaryMuscles: dbVariant.secondary_muscles?.map(mapMuscleGroup),
    isUnilateral: dbVariant.is_unilateral,
    instructions: dbVariant.instructions,
    steps: steps
      .sort((a, b) => a.step_order - b.step_order)
      .map(step => ({
        title: step.title,
        description: step.description,
      })),
    tips: tips
      ? {
          proTips: tips.pro_tips,
          commonMistakes: tips.common_mistakes,
          safetyNotes: tips.safety_notes,
        }
      : undefined,
    media: media
      ? {
          images: media.images,
          videos: media.videos,
          featuredImage: media.featured_image,
          featuredVideo: media.featured_video,
        }
      : undefined,
    prerequisites: undefined, // TODO: Add prerequisites field to DatabaseExerciseTips
    created_at: new Date(dbVariant.created_at),
    updated_at: new Date(dbVariant.updated_at),
  };
}

// Transform database exercise to our Exercise type
export function transformExercise(
  dbExercise: DatabaseExercise,
  variants: ExerciseVariant[]
): Exercise {
  // Calculate summary from variants
  const difficulties = variants.map(v => v.difficulty);
  const allEquipment = new Set<Equipment>();
  const allMuscleGroups = new Set<MuscleGroup>();

  variants.forEach(variant => {
    variant.equipment.forEach(eq => allEquipment.add(eq));
    variant.muscleGroups.forEach(mg => allMuscleGroups.add(mg));
  });

  return {
    id: dbExercise.id as Exercise['id'],
    name: dbExercise.name,
    alternativeNames: dbExercise.alternative_names,
    category: mapCategory(dbExercise.category),
    description: dbExercise.description,
    variants,
    mainVariantId: variants[0]?.id, // Default to first variant, could be enhanced
    icon: dbExercise.icon,
    iconColor: dbExercise.icon_color,
    isFavorite: false, // This will be handled separately for user-specific data
    isPopular: dbExercise.is_popular,
    isNew: dbExercise.is_new,
    rating: dbExercise.rating || undefined,
    summary: {
      difficultyRange: {
        min:
          difficulties.length > 0
            ? (() => {
                const minLevel = Math.min(
                  ...difficulties.map(d => {
                    const levels = {
                      Beginner: 1,
                      Intermediate: 2,
                      Advanced: 3,
                      Unknown: 0,
                    };
                    return levels[d] || 0;
                  })
                );
                const levelToDifficulty = {
                  0: 'Unknown' as Difficulty,
                  1: 'Beginner' as Difficulty,
                  2: 'Intermediate' as Difficulty,
                  3: 'Advanced' as Difficulty,
                };
                return (
                  levelToDifficulty[
                    minLevel as keyof typeof levelToDifficulty
                  ] || 'Unknown'
                );
              })()
            : 'Beginner',
        max:
          difficulties.length > 0
            ? (() => {
                const maxLevel = Math.max(
                  ...difficulties.map(d => {
                    const levels = {
                      Beginner: 1,
                      Intermediate: 2,
                      Advanced: 3,
                      Unknown: 0,
                    };
                    return levels[d] || 0;
                  })
                );
                const levelToDifficulty = {
                  0: 'Unknown' as Difficulty,
                  1: 'Beginner' as Difficulty,
                  2: 'Intermediate' as Difficulty,
                  3: 'Advanced' as Difficulty,
                };
                return (
                  levelToDifficulty[
                    maxLevel as keyof typeof levelToDifficulty
                  ] || 'Unknown'
                );
              })()
            : 'Beginner',
      },
      equipmentOptions: Array.from(allEquipment),
      primaryMuscleGroups: Array.from(allMuscleGroups),
    },
    tags: dbExercise.tags,
    relatedExercises: dbExercise.related_exercise_ids as Exercise['id'][],
    created_at: new Date(dbExercise.created_at),
    updated_at: new Date(dbExercise.updated_at),
  };
}
