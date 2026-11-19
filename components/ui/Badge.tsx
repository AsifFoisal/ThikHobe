import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"
import type { BadgeTone } from "@/types"

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-sage text-spruce",
  brand: "bg-spruce text-paper",
  fern: "bg-fern/10 text-fern",
  accent: "bg-ember-soft text-ember-ink",
  blue: "bg-status-blue-soft text-status-blue",
  indigo: "bg-status-indigo-soft text-status-indigo",
  amber: "bg-status-amber-soft text-status-amber",
  green: "bg-status-green-soft text-status-green",
  red: "bg-status-red-soft text-status-red",
  gray: "bg-status-gray-soft text-status-gray",
}

interface BadgeProps extends ComponentProps<"span"> {
  tone?: BadgeTone
  dot?: boolean
}

function Badge({
  tone = "neutral",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs leading-none font-semibold whitespace-nowrap",
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {dot ? (
        <span aria-hidden className="size-1.5 rounded-full bg-current" />
      ) : null}
      {children}
    </span>
  )
}

export { Badge }
