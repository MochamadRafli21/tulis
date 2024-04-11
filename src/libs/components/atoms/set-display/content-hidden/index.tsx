"use client"

import { useDisplay } from "../display-context";

export default function ContentHidden({ children }: { children: React.ReactNode }) {
  const { on } = useDisplay();
  return on ? null : children;
}
