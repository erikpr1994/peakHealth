export const equipment = [
  'Barbell',
  'Dumbbell',
  'Bodyweight',
  'Machine',
  'Resistance Band',
  'Kettlebell',
  'Cable',
  'Bench',
  'Incline Bench',
  'Decline Bench',
  'Pull-up Bar',
  'Squat Rack',
  'Step',
] as const;

export type Equipment = (typeof equipment)[number];
