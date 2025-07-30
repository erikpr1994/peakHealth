"use client";

import RoutineDetail from "@/features/routines/RoutineDetail";
import { useParams } from "next/navigation";

export default function RoutineDetailPage() {
  const { routineId } = useParams();
  return <RoutineDetail routineId={routineId as string} />;
}
