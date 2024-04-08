"use client"

import React, { useState } from 'react';
import { SelectContext } from './SelectContext';
import SelectContent from './SelectContent';
import SelectControl from './SelectControl';

function SelectProvider({ children, defaultSelected }: { children: React.ReactNode, defaultSelected?: number }) {
  const [index, setCurrentIndex] = useState(0);
  const [dataLength, setDataLength] = useState(0);
  const [selectedPosition, setPosition] = useState(defaultSelected);

  const setIndex = (i: number) => {
    setCurrentIndex(i);
  }

  const setSelected = (i: number) => {
    setPosition(i);
  }

  const contextValue = {
    index,
    setIndex,
    setSelected,
    selectedPosition,
    dataLength,
    setDataLength
  };

  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  );
}

SelectProvider.Control = SelectControl;
SelectProvider.Content = SelectContent;

export default SelectProvider;
