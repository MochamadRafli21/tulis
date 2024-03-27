import { cn } from '@/libs/utils/cn'

export const MasonryContainer = ({ children, className }:
  { children: React.ReactNode, className?: string }) => {

  return <div className={cn(className, "columns-1 md:columns-2 lg:columns-3 gap-3")}>
    {children}
  </div>
}
