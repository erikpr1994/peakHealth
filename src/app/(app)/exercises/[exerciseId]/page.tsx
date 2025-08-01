"use client";

import { useParams } from "next/navigation";

import ExerciseDetail from "@/features/exercises/ExerciseDetail";

export default function ExerciseDetailPage() {
  const { exerciseId } = useParams();
  return <ExerciseDetail exerciseId={exerciseId as string} />;
}
