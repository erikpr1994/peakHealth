import WorkoutTracker from "@/features/workout/WorkoutTracker";
import { useParams } from "next/navigation";

export default function WorkoutTrackerPage() {
  const { routineId } = useParams();
  return <WorkoutTracker onNavigate={() => {}} routineId={routineId} />;
}
