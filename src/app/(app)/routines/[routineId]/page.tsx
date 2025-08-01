"use client";

import { useParams } from "next/navigation";

import RoutineDetail from "@/features/routines/RoutineDetail";

export default function RoutineDetailPage() {
  const { routineId } = useParams();
  return <RoutineDetail routineId={routineId as string} />;
}
