import { Wrench } from "lucide-react"

import { cn } from "@/lib/utils"

interface LogoProps {
  tone?: "default" | "light"
  className?: string
}

export function Logo({ tone = "default", className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid size-9 place-items-center rounded-[0.625rem]",
          tone === "light" ? "bg-paper text-spruce" : "bg-spruce text-paper"
        )}
      >
        <Wrench
          aria-hidden
          className="size-[18px] -rotate-12"
          strokeWidth={2.25}
        />
      </span>
      <span
        className={cn(
          "text-xl leading-none font-bold tracking-[-0.035em]",
          tone === "light" ? "text-paper" : "text-ink"
        )}
      >
        Thik
        <span className="text-ember">Hobe</span>
      </span>
    </span>
  )
}
