"use client"

import { createContext, useContext } from 'react';

export interface ScrollContextValue {
  is_done: boolean;
  getMoreData: () => void;
  reset: () => void;
}

export const ScrollContext = createContext<ScrollContextValue>({
  is_done: false,
  getMoreData: () => { },
  reset: () => { }
});

export function useScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('Scroll compound components must be rendered within the Toggle component');
  }
  return context;
}
