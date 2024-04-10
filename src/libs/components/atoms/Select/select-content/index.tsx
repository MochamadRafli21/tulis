"use client"

import React from 'react'
import { useSelect } from "../select-context";
import { cn } from '@/libs/utils/cn'
interface SelectProps {
  children: React.ReactNode,
}

export default function SelectContent({ children }: SelectProps) {
  const { setSelected, selectedPosition, setDataLength, index } = useSelect();

  const childrenArray = React
    .Children
    .toArray(children)

  React.useEffect(() => {
    setDataLength(childrenArray.length)
  }, [childrenArray.length, setDataLength])


  return <ul>
    {
      childrenArray.map((child, position) => {
        if (!React.isValidElement(child)) {
          return null
        }
        const childClick = child.props.onClick
        const onClick = () => {
          setSelected(position)
          if (childClick) {
            childClick(position)
          }
        }
        const clone = React.cloneElement(child as React.ReactElement, {
          "className": cn(selectedPosition === position ? 'bg-slate-400' :
            position === index ? 'bg-slate-100' :
              'hover:bg-slate-100 focus:bg-slate-100', child.props.className)
        })
        return <li
          key={position}
          onClick={onClick}
        >
          {clone}
        </li>
      })
    }
  </ul>
}
