import { ChartSkeleton } from "@/components/dashboard/chart-skeleton"
import { StatGridSkeleton } from "@/components/dashboard/stat-grid-skeleton"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TechnicianOverviewLoading() {
  return (
    <div aria-busy="true" className="space-y-6 lg:space-y-8">
      <span className="sr-only">Loading technician overview</span>
      <div className="space-y-3">
        <Skeleton className="h-10 w-72 max-w-full" />
        <Skeleton className="h-5 w-full max-w-lg" />
        <Skeleton className="h-3 w-64 max-w-full" />
      </div>
      <StatGridSkeleton count={3} />
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="p-5 sm:p-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="mt-2 h-4 w-56" />
          <div className="mt-5 space-y-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div className="flex items-center gap-3" key={index}>
                <Skeleton className="size-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            ))}
          </div>
        </Card>
        <Card className="flex h-full flex-col p-5 sm:p-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-2 h-4 w-52" />
          <Skeleton className="mt-5 h-2 w-full rounded-full" />
          <div className="mt-5 space-y-4">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton className="h-4 w-full" key={index} />
            ))}
          </div>
        </Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <ChartSkeleton fill />
        <Card className="flex h-full flex-col p-5 sm:p-6">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="mt-2 h-4 w-52" />
          <Skeleton className="mt-5 h-24 w-full" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton className="h-4 w-full" key={index} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
