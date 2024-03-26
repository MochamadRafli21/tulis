"use client"

import { createContext, useContext } from 'react';

export interface DisplayContextValue {
  on: boolean;
  toggle: () => void;
}

export const DisplayContext = createContext<DisplayContextValue>({
  on: false,
  toggle: () => { },
});

export function useDisplay() {
  const context = useContext(DisplayContext);
  if (!context) {
    throw new Error('Toggle compound components must be rendered within the Toggle component');
  }
  return context;
}
