import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileLoading() {
  return (
    <div aria-busy="true" className="space-y-6 lg:space-y-8">
      <span className="sr-only">Loading profile</span>
      <div className="space-y-3">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-5 w-full max-w-lg" />
        <Skeleton className="h-3 w-80 max-w-full" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="p-5 sm:p-6 lg:p-8">
          <div className="flex items-center gap-4">
            <Skeleton className="size-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-9 w-32 rounded-[0.625rem]" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
          <Skeleton className="mt-8 h-6 w-40" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }, (_, index) => (
              <div className="space-y-2" key={index}>
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-11 w-full" />
              </div>
            ))}
            <div className="space-y-2 sm:col-span-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-11 w-full" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-28 w-full" />
            </div>
          </div>
          <Skeleton className="mt-6 h-11 w-36 rounded-[0.625rem]" />
        </Card>
        <div className="space-y-6">
          {Array.from({ length: 2 }, (_, index) => (
            <Card className="p-5 sm:p-6" key={index}>
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-2 h-4 w-56" />
              <Skeleton className="mt-5 h-16 w-full" />
              <Skeleton className="mt-4 h-4 w-4/5" />
              <Skeleton className="mt-2 h-4 w-2/3" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
