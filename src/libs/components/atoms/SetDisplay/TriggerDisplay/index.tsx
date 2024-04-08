"use client"

import { useDisplay } from "../Context";

export default function TriggerDisplay({ children, onClick, targetState
}: {
  children: React.ReactNode,
  onClick?: () => void,
  targetState?: boolean
}) {
  const { toggle, setActive, setBlur } = useDisplay();
  const updateState = () => {
    if (onClick) {
      onClick();
    }
    if (targetState === undefined) {
      toggle();
    } else if (targetState) {
      setActive();
    } else {
      setBlur();
    }
  }

  return <div
    onClick={updateState}
  >
    {children}
  </div>;
}
