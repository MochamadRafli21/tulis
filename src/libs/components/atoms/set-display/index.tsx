"use client"

import React, { useState } from 'react';
import { DisplayContext } from './display-context';
import ContentDisplay from './content-display';
import ContentHidden from './content-hidden';
import TriggerDisplay from './trigger-display';
import TriggerFocusDisplay from './trigger-focus';

function SetDisplay({ children, defaultOn }: { children: React.ReactNode, defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn ?? false);

  const toggle = () => {
    setOn((prevState) => !prevState);
  };

  const setActive = () => {
    setOn(true)
  }

  const setBlur = () => {
    setOn(false)
  }

  const contextValue = {
    on,
    toggle,
    setActive,
    setBlur
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
SetDisplay.ToggleFocusDisplay = TriggerFocusDisplay;

export default SetDisplay;
