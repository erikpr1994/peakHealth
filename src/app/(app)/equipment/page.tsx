"use client";

import Equipment from "@/features/equipment/Equipment";
import { useRouter } from "next/navigation";

export default function EquipmentPage() {
  const router = useRouter();

  const handleNavigate = (page: string, id?: string) => {
    const path = id ? `/${page}/${id}` : `/${page}`;
    router.push(path);
  };

  return <Equipment onNavigate={handleNavigate} />;
}
