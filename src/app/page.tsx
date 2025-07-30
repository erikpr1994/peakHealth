"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LandingPage from "@/features/auth/LandingPage";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <LandingPage onGetStarted={() => router.push("/login")} />;
  }

  return null;
}
