import { Card } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"
import { cn } from "@/lib/utils"

export function ChartSkeleton({
  className,
  fill = false,
}: {
  className?: string
  fill?: boolean
}) {
  return (
    <Card
      aria-hidden
      className={cn("flex flex-col p-5 sm:p-6", fill && "h-full", className)}
    >
      <Skeleton className="h-6 w-40" />
      <Skeleton className="mt-2 h-4 w-64 max-w-full" />
      <Skeleton
        className={cn("mt-5 w-full", fill ? "min-h-52 flex-1" : "h-52")}
      />
      <Skeleton className="mt-4 h-3 w-40" />
    </Card>
  )
}
