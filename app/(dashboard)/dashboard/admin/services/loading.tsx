import { TableSkeleton } from "@/components/dashboard/table-skeleton"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminServicesLoading() {
  return (
    <div aria-busy="true" className="space-y-6 lg:space-y-8">
      <span className="sr-only">Loading services</span>
      <div className="space-y-3">
        <Skeleton className="h-10 w-64 max-w-full" />
        <Skeleton className="h-5 w-full max-w-lg" />
        <Skeleton className="h-3 w-80 max-w-full" />
      </div>
      <Card className="overflow-hidden p-5">
        <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-3 w-40" />
          </div>
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
        <div className="flex gap-2 py-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton className="h-8 w-24 rounded-full" key={index} />
          ))}
        </div>
        <TableSkeleton rows={6} />
      </Card>
    </div>
  )
}
