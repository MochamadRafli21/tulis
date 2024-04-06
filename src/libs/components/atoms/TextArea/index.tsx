import { cn } from '@/libs/utils/cn'
import React, { FC } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

export const textAreaStyles = cva('py-2 px-4 rounded border-b border-gray-300 focus:outline-none w-full', {
  variants: {
    inputSize: {
      xs: ["h-6", "text-xs", "px-2", "py-0"],
      sm: ["h-8", "text-sm", "px-2", "py-2"],
      md: ["h-10", "text-md", "px-2", "py-2"],
      lg: ["h-12", "text-lg", "px-2", "py-2"],
      xl: ["h-24", "text-4xl", "px-2", "py-2"],
    },
    variant: {
      bordered: 'bg-transparent text-slate-600 border border-slate-300',
      primary: ["bg-transparent", "text-slate-600"],
      secondary: ["bg-gray-100", "text-slate-900"],
      danger: ["bg-transparent", "border-b border-red-500", "text-slate-900"],
    },
  },
  defaultVariants: {
    inputSize: 'md',
    variant: 'primary',
  },
})

interface TextAreaProps extends VariantProps<typeof textAreaStyles>, React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

export const TextArea: FC<TextAreaProps> = ({ className, inputSize, variant, onChange, ...props }) => {
  return (
    <textarea
      onChange={onChange}
      className={
        cn(textAreaStyles({ inputSize, variant, className }))}
      {...props}
    />
  )
}
