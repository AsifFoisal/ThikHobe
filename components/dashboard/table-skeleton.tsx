import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function TableSkeleton({
  rows = 4,
  className,
}: {
  rows?: number
  className?: string
}) {
  return (
    <div aria-hidden className={cn("space-y-3", className)}>
      <div className="flex gap-4">
        <Skeleton className="h-3 flex-1" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
      {Array.from({ length: rows }, (_, index) => (
        <div className="flex items-center gap-4" key={index}>
          <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
          <Skeleton className="h-3 flex-1" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      ))}
    </div>
  )
}
