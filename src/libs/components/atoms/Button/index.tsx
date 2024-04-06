import { cn } from '@/libs/utils/cn'
import React, { FC } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

export const buttonStyles = cva('bg-gray-200 hover:bg-gray-300 font-semibold py-2 px-4 rounded', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
    },
    variant: {
      primary: 'bg-primary-500 hover:bg-primary-600 text-white',
      secondary: 'bg-secondary-300 hover:bg-secondary-400 text-black-800',
      danger: 'bg-red-300 hover:bg-red-400 text-red-800',
      bordered: 'bg-transparent hover:bg-gray-200 text-gray-800 border border-gray-300',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
})

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonStyles> { }


export const Button: FC<ButtonProps> = ({ className, size, variant, ...props }) => {

  return (
    <button
      className={cn(buttonStyles({ size, variant, className }))}
      {...props}
    />
  )
}
