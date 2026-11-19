import { ChartSkeleton } from "@/components/dashboard/chart-skeleton"
import { StatGridSkeleton } from "@/components/dashboard/stat-grid-skeleton"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CustomerOverviewLoading() {
  return (
    <div aria-busy="true" className="space-y-6 lg:space-y-8">
      <span className="sr-only">Loading customer overview</span>
      <div className="space-y-3">
        <Skeleton className="h-10 w-72 max-w-full" />
        <Skeleton className="h-5 w-full max-w-lg" />
        <Skeleton className="h-3 w-64 max-w-full" />
      </div>
      <StatGridSkeleton />
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="overflow-hidden p-5 sm:p-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-2 h-4 w-56" />
          <div className="mt-5 space-y-4">
            {Array.from({ length: 5 }, (_, index) => (
              <div className="flex items-center gap-3" key={index}>
                <Skeleton className="size-11 rounded-[0.625rem]" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            ))}
          </div>
        </Card>
        <ChartSkeleton fill />
      </div>
      <Card className="p-5 sm:p-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-2 h-4 w-64" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton className="h-32 w-full" key={index} />
          ))}
        </div>
      </Card>
    </div>
  )
}
