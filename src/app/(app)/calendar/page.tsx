"use client";

import Calendar from "@/features/calendar/Calendar";
import { useRouter } from "next/navigation";

export default function CalendarPage() {
  const router = useRouter();

  const handleNavigate = (page: string, id?: string) => {
    const path = id ? `/${page}/${id}` : `/${page}`;
    router.push(path);
  };

  return <Calendar onNavigate={handleNavigate} />;
}
