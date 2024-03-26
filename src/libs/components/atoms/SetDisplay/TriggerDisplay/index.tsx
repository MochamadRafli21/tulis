"use client"

import { useDisplay } from "../Context";

export default function TriggerDisplay({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
  const { toggle } = useDisplay();
  const updateState = () => {
    if (onClick) {
      onClick();
    }
    toggle()
  }

  return <div onClick={updateState}>{children}</div>;
}
