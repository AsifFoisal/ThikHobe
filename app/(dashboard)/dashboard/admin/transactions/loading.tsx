import { ChartSkeleton } from "@/components/dashboard/ChartSkeleton"
import { StatGridSkeleton } from "@/components/dashboard/StatGridSkeleton"
import { TableSkeleton } from "@/components/dashboard/TableSkeleton"
import { Card } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"

export default function AdminTransactionsLoading() {
  return (
    <div aria-busy="true" className="space-y-6 lg:space-y-8">
      <span className="sr-only">Loading transactions</span>
      <div className="space-y-3">
        <Skeleton className="h-10 w-60 max-w-full" />
        <Skeleton className="h-5 w-full max-w-lg" />
        <Skeleton className="h-3 w-72 max-w-full" />
      </div>
      <StatGridSkeleton count={3} />
      <ChartSkeleton />
      <Card className="p-5">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="mt-4">
          <TableSkeleton rows={6} />
        </div>
      </Card>
    </div>
  )
}
