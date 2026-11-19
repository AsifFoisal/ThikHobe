import { TableSkeleton } from "@/components/dashboard/table-skeleton"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TechnicianServicesLoading() {
  return (
    <div aria-busy="true" className="space-y-6 lg:space-y-8">
      <span className="sr-only">Loading services</span>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-10 w-56 max-w-full" />
          <Skeleton className="h-5 w-full max-w-lg" />
          <Skeleton className="h-3 w-72 max-w-full" />
        </div>
        <Skeleton className="h-9 w-32 rounded-[0.625rem]" />
      </div>
      <Card className="overflow-hidden p-5">
        <div className="flex items-center justify-between gap-4 border-b border-line pb-5">
          <div className="space-y-2">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-3 w-52" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div className="pt-4">
          <TableSkeleton rows={6} />
        </div>
      </Card>
    </div>
  )
}
