"use client"

import { useState } from "react"

import { previewToast } from "@/lib/preview-toast"
import { cn } from "@/lib/utils"

interface AvailabilityToggleProps {
  serviceTitle: string
  initialAvailable: boolean
  disabled?: boolean
  disabledReason?: string
}

export function AvailabilityToggle({
  serviceTitle,
  initialAvailable,
  disabled = false,
  disabledReason,
}: AvailabilityToggleProps) {
  const [available, setAvailable] = useState(initialAvailable)
  const [announcement, setAnnouncement] = useState("")

  return (
    <div className="inline-flex items-center gap-2">
      <button
        aria-checked={available}
        aria-label={`Availability for ${serviceTitle}`}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border p-0.5 transition-colors focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-45",
          available
            ? "border-fern bg-fern"
            : "border-line-strong bg-sage-strong"
        )}
        disabled={disabled}
        onClick={() => {
          const next = !available
          setAvailable(next)
          setAnnouncement(
            `Preview only — availability is not saved. Preview is now ${
              next ? "available" : "unavailable"
            }.`
          )
          previewToast("Availability is not saved.")
        }}
        role="switch"
        title={disabled ? disabledReason : undefined}
        type="button"
      >
        <span
          aria-hidden
          className={cn(
            "size-5 rounded-full bg-card shadow-sm transition-transform duration-200",
            available ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
      <span className="text-xs text-muted-ink">
        {disabled
          ? disabledReason
          : available
            ? "Available"
            : "Unavailable"}
      </span>
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </div>
  )
}
