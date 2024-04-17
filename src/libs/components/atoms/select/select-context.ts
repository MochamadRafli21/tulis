"use client"

import { createContext, useContext } from 'react';

export interface SelectContext {
  index: number;
  setIndex: (i: number) => void;
  selectedPosition: number | undefined;
  setSelected: (s: number) => void;
  dataLength: number;
  setDataLength: (l: number) => void;
}

export const SelectContext = createContext<SelectContext>({
  index: 0,
  setIndex: () => { },
  selectedPosition: undefined,
  setSelected: () => { },
  dataLength: 0,
  setDataLength: () => { }
});

export function useSelect() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select compound components must be rendered within the Select component');
  }
  return context;
}
