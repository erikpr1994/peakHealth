"use client";

import Health from "@/features/health/Health";
import { useRouter } from "next/navigation";

export default function HealthPage() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    router.push(`/${page}`);
  };

  return <Health onNavigate={handleNavigate} />;
}
