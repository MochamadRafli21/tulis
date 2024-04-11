"use client"

import { useDisplay } from "../display-context";

export default function ContentDisplay({ children }: { children: React.ReactNode }) {
  const { on } = useDisplay();
  return on ? children : null;
}
