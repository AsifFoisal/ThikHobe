import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CustomerBookingDetailLoading() {
  return (
    <div aria-busy="true" className="space-y-6 lg:space-y-8">
      <span className="sr-only">Loading booking</span>
      <div className="space-y-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-11 w-full max-w-2xl" />
        <Skeleton className="h-5 w-80 max-w-full" />
        <Skeleton className="h-3 w-64 max-w-full" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr] xl:items-start">
        <div className="space-y-6">
          <Card className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row">
              <Skeleton className="h-48 w-full sm:w-56" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-40 rounded-full" />
                <Skeleton className="h-6 w-52" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </Card>
          <Card className="p-5 sm:p-6">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="mt-2 h-4 w-64" />
            <Skeleton className="mt-5 h-10 w-full" />
            <div className="mt-6 space-y-6">
              {Array.from({ length: 5 }, (_, index) => (
                <div className="flex gap-4" key={index}>
                  <Skeleton className="size-8 shrink-0 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card className="p-5 sm:p-6">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="mt-3 h-5 w-32 rounded-full" />
          <div className="mt-5 space-y-4 border-t border-line pt-4">
            {Array.from({ length: 5 }, (_, index) => (
              <div className="flex justify-between gap-4" key={index}>
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-28" />
              </div>
            ))}
          </div>
          <Skeleton className="mt-5 h-10 w-full" />
        </Card>
      </div>
    </div>
  )
}
