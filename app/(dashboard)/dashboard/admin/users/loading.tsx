import { TableSkeleton } from "@/components/dashboard/table-skeleton"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminUsersLoading() {
  return (
    <div aria-busy="true" className="space-y-6 lg:space-y-8">
      <span className="sr-only">Loading users</span>
      <div className="space-y-3">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-full max-w-xl" />
        <Skeleton className="h-3 w-80 max-w-full" />
      </div>
      <Card className="p-5">
        <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-3 w-28" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <div className="flex flex-col gap-2 py-4 sm:flex-row">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 sm:w-44" />
          <Skeleton className="h-10 w-20" />
        </div>
        <TableSkeleton rows={6} />
      </Card>
    </div>
  )
}
