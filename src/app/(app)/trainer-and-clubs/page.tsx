"use client";

import TrainerAndClubs from "@/features/social/TrainerAndClubs";
import { useRouter } from "next/navigation";

export default function TrainerAndClubsPage() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    router.push(`/${page}`);
  };

  return <TrainerAndClubs onNavigate={handleNavigate} />;
}
