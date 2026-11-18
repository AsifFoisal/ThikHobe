import { FeaturedServicesSkeleton } from "@/components/services/service-card-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function PublicLoading() {
  return (
    <div aria-busy="true" className="container-page">
      <span className="sr-only">Loading FixMate…</span>
      <div className="grid gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-16 lg:pt-20 lg:pb-24">
        <div>
          <Skeleton className="h-14 w-full" />
          <Skeleton className="mt-3 h-14 w-4/5" />
          <Skeleton className="mt-6 h-5 w-full max-w-lg" />
          <Skeleton className="mt-2 h-5 w-4/5 max-w-md" />
          <div className="mt-8 flex gap-3">
            <Skeleton className="h-12 w-40 rounded-[0.625rem]" />
            <Skeleton className="h-12 w-32 rounded-[0.625rem]" />
          </div>
          <Skeleton className="mt-9 h-12 w-full max-w-xl rounded-[0.625rem]" />
        </div>
        <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
      </div>
      <div className="pb-16">
        <Skeleton className="h-8 w-72" />
        <div className="mt-10">
          <FeaturedServicesSkeleton />
        </div>
      </div>
    </div>
  )
}
