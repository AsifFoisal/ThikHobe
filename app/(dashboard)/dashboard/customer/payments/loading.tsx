import { TableSkeleton } from "@/components/dashboard/table-skeleton"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CustomerPaymentsLoading() {
  return (
    <div aria-busy="true" className="space-y-6 lg:space-y-8">
      <span className="sr-only">Loading payment history</span>
      <div className="space-y-3">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-4 w-full max-w-xl" />
        <Skeleton className="h-3 w-72 max-w-full" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-28" />
        </div>
        <Card className="p-5">
          <TableSkeleton rows={5} />
        </Card>
      </div>
    </div>
  )
}
