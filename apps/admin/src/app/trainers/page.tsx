'use client';

import { TrainerList } from '@/components/TrainerList';

export default function TrainersPage() {
  return (
    <TrainerList
      scopeInfo={{
        scope: 'general',
        label: 'System Wide',
        color: 'secondary',
      }}
      onViewTrainer={(trainerId: number) => {
        // Handle trainer view - will be implemented with Next.js routing
      }}
    />
  );
}
