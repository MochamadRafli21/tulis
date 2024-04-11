"use client"

import React, { FC, useEffect } from "react"
import { useInView } from "react-intersection-observer"

interface InterSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  onView: () => void
}

export const IntersectionContainer: FC<InterSectionProps> = ({ children, onView }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView) {
      onView()
    }
  }, [inView, onView])

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transition: "opacity 0.5s",
      }}
    >
      {children}
    </div>
  )
}
