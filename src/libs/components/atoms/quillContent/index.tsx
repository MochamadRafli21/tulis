"use client"

import React from 'react';

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string

}

export const QuilContent = ({ content, className }: ContentProps) => {
  return (
    <div className={className}>
      <div className='ql-container ql-snow !border-none'>
        <div className={"ql-editor"} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}
