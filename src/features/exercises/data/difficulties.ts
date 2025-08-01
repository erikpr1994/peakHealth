export const difficulties = ['Beginner', 'Intermediate', 'Advanced'] as const;

export type Difficulty = (typeof difficulties)[number];
