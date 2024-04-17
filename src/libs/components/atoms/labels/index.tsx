import { cn } from '@/libs/utils/cn'
import React, { FC } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

export const labelStyles = cva('text-gray-700', {
  variants: {
    inputSize: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
    },
    variant: {
      primary: 'text-slate-400',
      secondary: 'text-secondary-300',
    },
  },
  defaultVariants: {
    inputSize: 'lg',
    variant: 'primary',
  },
})

interface labelProps extends VariantProps<typeof labelStyles>, React.LabelHTMLAttributes<HTMLLabelElement> { }

export const Label: FC<labelProps> = ({ className, inputSize, variant, onChange, ...props }) => {
  return (
    <label
      className={
        cn(labelStyles({ inputSize, variant, className }))}
      {...props}
    />
  )
}
