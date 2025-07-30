"use client";

import Profile from "@/features/profile/Profile";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    router.push(`/${page}`);
  };

  return <Profile onNavigate={handleNavigate} />;
}
