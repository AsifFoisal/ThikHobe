import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

interface FilterSelectProps {
  id: string
  label: string
  options: { value: string; label: string }[]
  name?: string
  defaultValue?: string
  className?: string
}

export function FilterSelect({
  id,
  label,
  options,
  name,
  defaultValue,
  className,
}: FilterSelectProps) {
  return (
    <div className={className}>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <select
          className={cn(
            "h-10 w-full appearance-none rounded-[0.625rem] border border-line-strong bg-card px-3 pr-9 text-sm text-ink transition-colors focus-visible:border-fern focus-visible:ring-2 focus-visible:ring-fern/20 focus-visible:outline-none"
          )}
          defaultValue={defaultValue}
          id={id}
          name={name}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-ink"
        />
      </div>
    </div>
  )
}
