import type { LucideIcon } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string
  hint?: string
  icon: LucideIcon
  className?: string
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-muted-ink uppercase">
            {label}
          </p>
          <p className="tabular mt-3 text-3xl leading-none font-bold tracking-[-0.03em] text-ink">
            {value}
          </p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-[0.625rem] bg-sage text-spruce">
          <Icon aria-hidden className="size-4" strokeWidth={1.9} />
        </span>
      </div>
      {hint ? <p className="mt-3 text-xs leading-5 text-muted-ink">{hint}</p> : null}
    </Card>
  )
}

export function StatCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("rounded-xl border border-line bg-card p-5", className)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-2.5 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
        <Skeleton className="size-9 rounded-[0.625rem]" />
      </div>
      <Skeleton className="mt-3 h-3 w-28" />
    </div>
  )
}
