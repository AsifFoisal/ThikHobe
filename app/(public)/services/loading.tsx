import { ServiceCardSkeleton } from "@/components/services/ServiceCardSkeleton"
import { Skeleton } from "@/components/ui/Skeleton"

export default function ServicesLoading() {
  return (
    <div aria-busy="true" className="container-page pt-10 pb-16 lg:pt-14">
      <span className="sr-only">Loading services…</span>
      <div className="max-w-3xl">
        <Skeleton className="h-10 w-80 max-w-full" />
        <Skeleton className="mt-4 h-5 w-full max-w-xl" />
        <Skeleton className="mt-2 h-5 w-3/4 max-w-md" />
        <Skeleton className="mt-4 h-4 w-64 max-w-full" />
      </div>

      <div className="mt-8 rounded-xl border border-line bg-card p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_9.5rem_10rem_10.5rem_auto]">
          <Skeleton className="h-10 w-full sm:col-span-2 lg:col-span-1" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full lg:w-28" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }, (_, index) => (
          <ServiceCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
