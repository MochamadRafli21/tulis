"use client"

import { cn } from '@/libs/utils/cn'
import React from 'react';

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string

}

export const QuilContent = ({ content, className }: ContentProps) => {
  return (
    <div className='ql-container ql-snow !border-none'>
      <div className={cn("ql-editor", className)} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
