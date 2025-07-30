"use client";

import AuthPage from "@/features/auth/AuthPage";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  return <AuthPage onAuthenticated={login} />;
}
