"use client"

import { useDisplay } from "../Context";

export default function ContentHidden({ children }: { children: React.ReactNode }) {
  const { on } = useDisplay();
  return on ? null : children;
}
