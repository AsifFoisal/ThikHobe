import { CircleAlert, Inbox, LoaderCircle, type LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface StateProps {
  title: string
  description?: string
  icon?: LucideIcon
  action?: ReactNode
  className?: string
}

interface StateShellProps extends Omit<StateProps, "icon"> {
  icon: LucideIcon
  tone?: "quiet" | "error"
}

function StateShell({
  icon: Icon,
  title,
  description,
  action,
  className,
  tone = "quiet",
}: StateShellProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-6 py-14 text-center",
        className
      )}
    >
      <span
        className={cn(
          "grid size-12 place-items-center rounded-full",
          tone === "error"
            ? "bg-status-red-soft text-status-red"
            : "bg-sage text-spruce"
        )}
      >
        <Icon aria-hidden className="size-5" strokeWidth={1.8} />
      </span>
      <p className="mt-4 text-base font-semibold text-ink">{title}</p>
      {description ? (
        <p className="mt-1.5 max-w-sm text-sm leading-6 text-muted-ink">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}

function EmptyState({ icon = Inbox, ...props }: StateProps) {
  return <StateShell icon={icon} {...props} />
}

function ErrorState({ icon = CircleAlert, ...props }: StateProps) {
  return <StateShell icon={icon} tone="error" {...props} />
}

function LoadingState({
  label = "Loading…",
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <div
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-14 text-center",
        className
      )}
      role="status"
    >
      <LoaderCircle
        aria-hidden
        className="size-5 animate-spin text-fern motion-reduce:animate-none"
      />
      <p className="text-sm text-muted-ink">{label}</p>
    </div>
  )
}

export { EmptyState, ErrorState, LoadingState }
