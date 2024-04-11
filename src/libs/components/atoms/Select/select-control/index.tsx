"use client"
import React from 'react'
import { useSelect } from "../select-context";

export default function SelectControl({
  children,
  onKeyUp,
  onSelect
}: { children: React.ReactNode, onKeyUp?: () => void, onSelect?: (i: number) => void }) {
  const { index, setIndex, setSelected, dataLength } = useSelect();
  const updateState = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      const newIndex = index + 1
      if (newIndex < dataLength) {
        setIndex(newIndex)
      }
    } else if (e.key === "ArrowUp" && index > 0) {
      const newIndex = index - 1
      if (newIndex < 0) {
        setIndex(dataLength - 1)
      } else {
        setIndex(newIndex)
      }
    } else if (e.key === "Enter") {
      setSelected(index)
      if (onSelect) {
        onSelect(index)
      }
    }
    if (onKeyUp) {
      onKeyUp()
    }
  }

  const clone = React.cloneElement(children as React.ReactElement, {
    onKeyUp: updateState,
  })

  return clone
}
