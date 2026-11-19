import { Skeleton } from "@/components/ui/Skeleton"

export default function ServiceDetailsLoading() {
  return (
    <div aria-busy="true" className="container-page pt-8 pb-16 lg:pt-10">
      <span className="sr-only">Loading service…</span>
      <Skeleton className="h-3 w-64 max-w-full" />

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-14">
        <div>
          <div className="flex gap-2">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-28 rounded-full" />
          </div>
          <Skeleton className="mt-4 h-12 w-full max-w-lg" />
          <Skeleton className="mt-3 h-12 w-3/4 max-w-md" />
          <Skeleton className="mt-5 h-5 w-full max-w-xl" />
          <Skeleton className="mt-2 h-5 w-4/5 max-w-lg" />
          <Skeleton className="mt-8 aspect-[4/3] w-full rounded-2xl" />
          <Skeleton className="mt-8 h-44 w-full rounded-xl" />
        </div>
        <Skeleton className="h-[28rem] w-full rounded-xl" />
      </div>
    </div>
  )
}
