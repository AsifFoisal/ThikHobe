import { Skeleton } from "@/components/ui/skeleton"

export function ServiceCardSkeleton() {
  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-xl border border-line bg-card"
    >
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <div className="flex gap-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="flex items-end justify-between border-t border-line pt-4">
          <div className="space-y-2">
            <Skeleton className="h-2.5 w-16" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-8 w-24 rounded-[0.625rem]" />
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
