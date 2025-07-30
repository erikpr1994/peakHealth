"use client";

import AccountSettings from "@/features/settings/AccountSettings";
import { useRouter } from "next/navigation";

export default function AccountSettingsPage() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    router.push(`/${page}`);
  };

  return <AccountSettings onNavigate={handleNavigate} />;
}
