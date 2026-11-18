import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  description?: string
  action?: ReactNode
  tone?: "light" | "dark"
  className?: string
}

export function SectionHeading({
  title,
  description,
  action,
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8",
        className
      )}
    >
      <div className="max-w-2xl">
        <h2
          className={cn("type-h2", tone === "dark" ? "text-paper" : "text-ink")}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-3 max-w-[58ch] text-[0.9375rem] leading-7",
              tone === "dark" ? "text-sage" : "text-muted-ink"
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
