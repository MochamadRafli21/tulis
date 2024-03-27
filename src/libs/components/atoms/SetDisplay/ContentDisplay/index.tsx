"use client"

import { useDisplay } from "../Context";

export default function ContentDisplay({ children }: { children: React.ReactNode }) {
  const { on } = useDisplay();
  return on ? children : null;
}
