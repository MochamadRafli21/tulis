import { cn } from '@/libs/utils/cn'

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("border border-gray-200 rounded-lg min-w-[200px]", className)}>
      {children}
    </div>
  )
}

export default Card;
