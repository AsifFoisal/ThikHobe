import { TableSkeleton } from "@/components/dashboard/table-skeleton"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminBookingsLoading() {
  return (
    <div aria-busy="true" className="space-y-6 lg:space-y-8">
      <span className="sr-only">Loading bookings</span>
      <div className="space-y-3">
        <Skeleton className="h-10 w-60 max-w-full" />
        <Skeleton className="h-5 w-full max-w-lg" />
        <Skeleton className="h-3 w-72 max-w-full" />
      </div>
      <Card className="overflow-hidden p-5">
        <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-3 w-44" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <div className="flex flex-wrap gap-2 py-4">
          {Array.from({ length: 7 }, (_, index) => (
            <Skeleton className="h-8 w-24 rounded-full" key={index} />
          ))}
        </div>
        <TableSkeleton rows={7} />
      </Card>
    </div>
  )
}
