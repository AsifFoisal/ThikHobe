import { ShieldCheck, Wallet } from "lucide-react"

import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/components/ui/status-badge"
import { cn } from "@/lib/utils"

const points = [
  "The starting price is visible before you send a request.",
  "The technician confirms the final amount after inspecting the device.",
  "Payment opens only when the job is marked completed.",
]

const rows = [
  {
    label: "Request sent",
    badge: <BookingStatusBadge status="requested" />,
    note: "No payment is taken with the request.",
    dot: "bg-status-blue",
  },
  {
    label: "Technician accepts",
    badge: <BookingStatusBadge status="accepted" />,
    note: "The visit and preferred date are confirmed.",
    dot: "bg-status-indigo",
  },
  {
    label: "Repair in progress",
    badge: <BookingStatusBadge status="in_progress" />,
    note: "Updates appear on the booking as the work moves.",
    dot: "bg-status-amber",
  },
  {
    label: "Repair completed",
    badge: <BookingStatusBadge status="completed" />,
    note: "The final amount is confirmed at completion.",
    dot: "bg-status-green",
  },
  {
    label: "Payment",
    badge: <PaymentStatusBadge status="paid" />,
    note: "A receipt and transaction ID are recorded.",
    dot: "bg-ember",
  },
]

export function AboutPayment() {
  return (
    <section
      className="section scroll-mt-24 border-y border-line bg-card"
      id="payment"
    >
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
        <div>
          <h2 className="type-h1 max-w-[13ch]">
            The final amount comes before the payment.
          </h2>
          <p className="type-lead mt-4 max-w-[50ch]">
            A starting price is an estimate, not a demand for money. The
            technician inspects the device, confirms the final amount, and
            records completion. Only then does payment open.
          </p>

          <ul className="mt-7 space-y-3">
            {points.map((point) => (
              <li
                className="flex gap-3 text-sm leading-6 text-muted-ink"
                key={point}
              >
                <span
                  aria-hidden
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-fern"
                />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-sage/40 p-4">
            <ShieldCheck
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-spruce"
            />
            <p className="text-sm leading-6 text-ink">
              <span className="font-semibold">No card at request time.</span>{" "}
              Payment is collected only after the repair is completed.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-line bg-paper p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-muted-ink uppercase">
              A booking from request to paid
            </p>
            <span className="text-xs text-muted-ink">Sample flow</span>
          </div>

          <ol className="mt-2">
            {rows.map((row, index) => (
              <li
                className="grid grid-cols-[0.75rem_1fr] gap-3 py-4"
                key={row.label}
              >
                <div className="relative flex justify-center">
                  <span
                    aria-hidden
                    className={cn("mt-1.5 size-2 rounded-full", row.dot)}
                  />
                  {index < rows.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute top-5 -bottom-4 w-px bg-line"
                    />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium text-ink">{row.label}</p>
                    {row.badge}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-muted-ink">
                    {row.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-2 flex items-start gap-2 border-t border-line pt-4 text-xs leading-5 text-muted-ink">
            <Wallet aria-hidden className="mt-0.5 size-3.5 shrink-0" />
            Payment unlocks at the completed step, never before.
          </div>
        </div>
      </div>
    </section>
  )
}
