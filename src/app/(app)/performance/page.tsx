"use client";

import Performance from "@/features/performance/Performance";
import { useRouter } from "next/navigation";

export default function PerformancePage() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    router.push(`/${page}`);
  };

  return <Performance onNavigate={handleNavigate} />;
}
