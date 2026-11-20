import { Skeleton } from "@/components/ui/Skeleton"

export function ServiceCardSkeleton() {
  return (
    <div
      aria-hidden
      className="flex h-full flex-col rounded-xl border border-line bg-card p-2"
    >
      <Skeleton className="aspect-[4/3] w-full rounded-lg" />
      <div className="flex flex-1 flex-col px-2.5 pt-4 pb-2">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="mt-2 h-4 w-3/5" />
        <Skeleton className="mt-2 h-3 w-20" />

        <div className="mt-3 flex items-center gap-2">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-3 w-28" />
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <Skeleton className="h-10 flex-1 rounded-[0.625rem]" />
          <Skeleton className="size-10 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function FeaturedServicesSkeleton() {
  return (
    <div aria-busy="true" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <span className="sr-only">Loading services…</span>
      {Array.from({ length: 6 }, (_, index) => (
        <ServiceCardSkeleton key={index} />
      ))}
    </div>
  )
}
