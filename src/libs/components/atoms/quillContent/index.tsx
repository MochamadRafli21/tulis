"use client"

import { cn } from '@/libs/utils/cn'
import React from 'react';

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string

}


export const QuilContent = ({ content, className }: ContentProps) => {
  return (
    <div className={cn(className)} dangerouslySetInnerHTML={{ __html: content }} />
  )
}
