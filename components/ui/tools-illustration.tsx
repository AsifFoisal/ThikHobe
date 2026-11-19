import { Cog, Wrench } from "lucide-react"

import { cn } from "@/lib/utils"

export function ToolsIllustration({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative grid size-48 place-items-center", className)}
    >
      <span className="absolute inset-0 rounded-full bg-sage" />
      <span className="absolute inset-4 rounded-full border border-dashed border-fern/30" />
      <span className="absolute top-6 right-6 grid size-11 place-items-center rounded-full border border-line bg-card text-ember shadow-sm">
        <Cog className="size-5" strokeWidth={1.6} />
      </span>
      <span className="absolute top-11 left-8 size-2.5 rounded-full bg-fern/50" />
      <span className="absolute right-10 bottom-9 size-2 rounded-full bg-ember/70" />
      <span className="absolute bottom-14 left-6 size-1.5 rounded-full bg-spruce/40" />
      <Wrench
        className="relative size-20 -rotate-12 text-spruce"
        strokeWidth={1.2}
      />
    </div>
  )
}
