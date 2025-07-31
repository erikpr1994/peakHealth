"use client";

import WorkoutTracker from "@/features/workout/WorkoutTracker";
import { useParams, useRouter } from "next/navigation";

export default function WorkoutTrackerPage() {
  const { routineId } = useParams();
  const router = useRouter();

  if (typeof routineId !== "string") {
    // Or a loading spinner
    return <div>Invalid routine</div>;
  }

  return <WorkoutTracker onNavigate={router.push} routineId={routineId} />;
}
