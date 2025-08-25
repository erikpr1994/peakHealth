import { WorkoutExecution } from '@/features/workout-tracking/workout-execution';

interface WorkoutPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = await params;
  return (
    <main className="min-h-screen bg-background">
      <WorkoutExecution workoutId={id} />
    </main>
  );
}
