"use client";
import { useEffect } from "react";
import { useKpiStore } from "@/store/useKpiStore";

export default function DataLoader() {
  useEffect(() => {
    useKpiStore.getState().loadFromSupabase();
  }, []);
  return null;
}
