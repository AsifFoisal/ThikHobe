import { StatCardSkeleton } from "@/components/dashboard/StatCard"
import { cn } from "@/lib/utils"

export function StatGridSkeleton({
  count = 4,
  className,
}: {
  count?: number
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "grid gap-4 sm:grid-cols-2",
        count === 3 ? "xl:grid-cols-3" : "xl:grid-cols-4",
        className
      )}
    >
      {Array.from({ length: count }, (_, index) => (
        <StatCardSkeleton key={index} />
      ))}
    </div>
  )
}
