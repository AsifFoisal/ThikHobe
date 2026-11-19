import { TableSkeleton } from "@/components/dashboard/table-skeleton"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CustomerBookingsLoading() {
  return (
    <div aria-busy="true" className="space-y-6 lg:space-y-8">
      <span className="sr-only">Loading bookings</span>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-10 w-60 max-w-full" />
          <Skeleton className="h-5 w-full max-w-lg" />
          <Skeleton className="h-3 w-80 max-w-full" />
        </div>
        <Skeleton className="h-9 w-36 rounded-[0.625rem]" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Card className="p-5">
          <TableSkeleton rows={6} />
        </Card>
      </div>
    </div>
  )
}
