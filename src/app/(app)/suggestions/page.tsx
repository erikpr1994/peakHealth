"use client";

import Suggestions from "@/features/suggestions/Suggestions";
import { useRouter } from "next/navigation";

export default function SuggestionsPage() {
  const router = useRouter();

  const handleNavigate = (page: string, id?: string) => {
    const path = id ? `/${page}/${id}` : `/${page}`;
    router.push(path);
  };

  return <Suggestions onNavigate={handleNavigate} />;
}
