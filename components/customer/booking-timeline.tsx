import { Check, XCircle } from "lucide-react"

import { Card } from "@/components/ui/card"
import { formatDateTime } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Booking } from "@/types"

const TIMELINE_STEPS = [
  {
    key: "requested",
    label: "Request submitted",
    description: "Your repair request entered the technician's queue.",
  },
  {
    key: "accepted",
    label: "Technician accepted",
    description: "The technician confirmed the job and the preferred date.",
  },
  {
    key: "in_progress",
    label: "Repair in progress",
    description: "The device is with the technician and the repair is underway.",
  },
  {
    key: "completed",
    label: "Repair completed",
    description: "The work is finished and the final amount has been confirmed.",
  },
  {
    key: "paid",
    label: "Payment received",
    description: "The final amount has been paid and the job is closed.",
  },
] as const

function getCurrentStepIndex(booking: Booking) {
  if (booking.status === "rejected" || booking.status === "cancelled") {
    return null
  }

  if (booking.status === "completed" && booking.paymentStatus === "paid") {
    return 4
  }

  return {
    requested: 0,
    accepted: 1,
    in_progress: 2,
    completed: 3,
  }[booking.status]
}

export function BookingTimeline({ booking }: { booking: Booking }) {
  const currentIndex = getCurrentStepIndex(booking)

  if (currentIndex === null) {
    const rejected = booking.status === "rejected"
    const closedAt = booking.timeline?.find(
      (entry) => entry.status === booking.status
    )?.at

    return (
      <Card className="p-5 sm:p-6">
        <h2 className="type-h3">Job timeline</h2>
        <div className="mt-5 flex items-start gap-3 rounded-lg bg-paper p-4">
          <span
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-full",
              rejected
                ? "bg-status-red-soft text-status-red"
                : "bg-status-gray-soft text-status-gray"
            )}
          >
            <XCircle aria-hidden className="size-5" strokeWidth={1.8} />
          </span>
          <div>
            <p className="font-semibold text-ink">
              {rejected ? "Request rejected" : "Booking cancelled"}
            </p>
            <p className="mt-1 text-sm leading-6 text-muted-ink">
              {rejected
                ? "This request closed before a repair timeline began. Contact support if you need more detail."
                : "This booking was cancelled before the repair started. No further timeline steps were recorded."}
            </p>
            {closedAt ? (
              <p className="mt-1 text-xs text-muted-ink">
                {formatDateTime(closedAt)}
              </p>
            ) : null}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-5 sm:p-6">
      <div>
        <h2 className="type-h3">Job timeline</h2>
        <p className="mt-1 text-sm leading-6 text-muted-ink">
          Completed, current, and pending stages for this repair.
        </p>
      </div>

      <ol aria-label="Job timeline" className="mt-6">
        {TIMELINE_STEPS.map((step, index) => {
          const state =
            index < currentIndex
              ? "complete"
              : index === currentIndex
                ? "current"
                : "pending"
          const at = booking.timeline?.find(
            (entry) => entry.status === step.key
          )?.at

          return (
            <li
              aria-current={state === "current" ? "step" : undefined}
              className="relative flex gap-4 pb-8 last:pb-0"
              key={step.key}
            >
              {index < TIMELINE_STEPS.length - 1 ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-9 bottom-0 left-4 w-px",
                    state === "complete" ? "bg-fern/35" : "bg-line"
                  )}
                />
              ) : null}

              <span
                className={cn(
                  "relative z-10 grid size-8 shrink-0 place-items-center rounded-full border",
                  state === "complete" && "border-fern bg-fern text-paper",
                  state === "current" &&
                    "border-ember bg-ember-soft text-ember",
                  state === "pending" &&
                    "border-line bg-card text-muted-ink"
                )}
              >
                {state === "complete" ? (
                  <Check aria-hidden className="size-4" strokeWidth={2.2} />
                ) : (
                  <span
                    aria-hidden
                    className={cn(
                      "size-1.5 rounded-full",
                      state === "current" ? "bg-current" : "bg-line-strong"
                    )}
                  />
                )}
              </span>

              <div className="min-w-0 pt-0.5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      state === "pending" ? "text-muted-ink" : "text-ink"
                    )}
                  >
                    {step.label}
                  </p>
                  <span
                    className={cn(
                      "text-[11px] font-semibold tracking-[0.12em] uppercase",
                      state === "complete" && "text-fern",
                      state === "current" && "text-ember-ink",
                      state === "pending" && "text-muted-ink"
                    )}
                  >
                    {state === "complete"
                      ? "Completed"
                      : state === "current"
                        ? "Current stage"
                        : "Pending"}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-6 text-muted-ink">
                  {step.description}
                </p>
                {at ? (
                  <p className="mt-1 text-xs text-muted-ink">
                    {formatDateTime(at)}
                  </p>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>
    </Card>
  )
}
