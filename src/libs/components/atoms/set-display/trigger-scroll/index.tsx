"use client"

import React from 'react'
import { IntersectionContainer } from "@/libs/components/atoms";
import { useDisplay } from "../display-context";

export default function TriggerScroll({ children, onView
}: {
  children: React.ReactNode,
  onView?: () => void,
}) {
  const { setActive } = useDisplay();

  const handleView = () => {
    if (onView) {
      onView();
    }
    setActive();
  }


  return (
    <IntersectionContainer onView={handleView}>
      {children}
    </IntersectionContainer>
  );
}
