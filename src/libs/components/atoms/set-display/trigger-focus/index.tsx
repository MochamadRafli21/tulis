"use client"

import React from 'react'
import { useDisplay } from "../display-context";

export default function TriggerFocusDisplay({ children, onFocus, onBlur
}: {
  children: React.ReactNode,
  onFocus?: () => void,
  onBlur?: () => void,
  targetState?: boolean
}) {
  const { setActive, setBlur } = useDisplay();

  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    }
    setActive();
  }

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
    setBlur();
  }

  const clone = React.cloneElement(children as React.ReactElement, {
    onFocus: handleFocus,
    onBlur: handleBlur
  })

  return clone;
}
