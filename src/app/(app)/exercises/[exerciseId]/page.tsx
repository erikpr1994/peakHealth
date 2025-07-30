"use client";

import ExerciseDetail from "@/features/exercises/ExerciseDetail";
import { useParams } from "next/navigation";

export default function ExerciseDetailPage() {
  const { exerciseId } = useParams();
  return <ExerciseDetail exerciseId={exerciseId as string} />;
}
