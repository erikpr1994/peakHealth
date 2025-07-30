"use client";

import Gyms from "@/features/gyms/Gyms";
import { useRouter } from "next/navigation";

export default function GymsPage() {
  const router = useRouter();

  const handleNavigate = (page: string, id?: string) => {
    const path = id ? `/${page}/${id}` : `/${page}`;
    router.push(path);
  };

  return <Gyms onNavigate={handleNavigate} />;
}
