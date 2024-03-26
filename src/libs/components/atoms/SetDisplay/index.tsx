"use client"

import React, { useState } from 'react';
import { DisplayContext } from './Context';
import ContentDisplay from './ContentDisplay';
import ContentHidden from './ContentHidden';
import TriggerDisplay from './TriggerDisplay';

function SetDisplay({ children, defaultOn }: { children: React.ReactNode, defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn ?? false);

  const toggle = () => {
    setOn((prevState) => !prevState);
  };

  const contextValue = {
    on,
    toggle,
  };

  return (
    <DisplayContext.Provider value={contextValue}>
      {children}
    </DisplayContext.Provider>
  );
}

SetDisplay.ShowContent = ContentDisplay;
SetDisplay.HideContent = ContentHidden;
SetDisplay.ToggleDisplay = TriggerDisplay;

export default SetDisplay;
