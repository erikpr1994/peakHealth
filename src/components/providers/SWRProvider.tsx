"use client";

import { SWRConfig } from "swr";
import { ReactNode } from "react";
import { swrConfig } from "@/lib/swr";

interface SWRProviderProps {
  children: ReactNode;
}

export const SWRProvider = ({ children }: SWRProviderProps) => {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
};
