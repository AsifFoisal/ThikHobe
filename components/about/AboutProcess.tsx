import { ArrowRight } from "lucide-react"
import Link from "next/link"

import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/components/ui/StatusBadge"

const stages = [
  {
    title: "Choose a service",
    description:
      "Compare the category, repair mode, area, starting price, and the technician behind the listing. The estimate is visible before you ask for anything.",
    detail: (
      <p className="text-xs text-muted-ink">
        Category · Service mode · Service area · Starting price
      </p>
    ),
  },
  {
    title: "Send a repair request",
    description:
      "Share the contact and access details, a preferred date, and a description of the problem. The request goes to a named technician with the context already attached.",
    detail: (
      <div className="flex flex-wrap items-center gap-2">
        <BookingStatusBadge status="requested" />
        <span className="text-xs text-muted-ink">
          The technician reviews the request.
        </span>
      </div>
    ),
  },
  {
    title: "Follow the repair",
    description:
      "Accepted, in progress, completed: the booking moves through a shared status language that the customer and technician both see.",
    detail: (
      <div className="flex flex-wrap items-center gap-2">
        <BookingStatusBadge status="accepted" />
        <span aria-hidden className="text-xs text-muted-ink">
          →
        </span>
        <BookingStatusBadge status="in_progress" />
        <span aria-hidden className="text-xs text-muted-ink">
          →
        </span>
        <BookingStatusBadge status="completed" />
      </div>
    ),
  },
  {
    title: "Confirm the amount and pay",
    description:
      "When the work is complete, the technician records the final amount. Payment opens only then, so the customer sees the result before the charge.",
    detail: (
      <div className="flex flex-wrap items-center gap-2">
        <PaymentStatusBadge status="unpaid" />
        <span aria-hidden className="text-xs text-muted-ink">
          →
        </span>
        <PaymentStatusBadge status="paid" />
        <span className="text-xs text-muted-ink">
          Final amount confirmed at completion.
        </span>
      </div>
    ),
  },
]

export function AboutProcess() {
  return (
    <section
      className="section scroll-mt-24 border-y border-line bg-card"
      id="how-it-works"
    >
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
        <div className="lg:self-stretch">
          <div className="lg:sticky lg:top-24">
            <h2 className="type-h1 max-w-[12ch]">
              From a request to a receipt, in the open.
            </h2>
            <p className="type-lead mt-4 max-w-[45ch]">
              Every stage has a name, a status, and a place to look. Here is
              what happens after the customer finds the right service.
            </p>
            <Link
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-spruce transition-colors hover:text-fern"
              href="/services"
            >
              Find a repair
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        <ol className="divide-y divide-line border-y border-line">
          {stages.map((stage, index) => (
            <li
              className="grid gap-4 py-7 sm:grid-cols-[2.5rem_1fr] sm:gap-6"
              key={stage.title}
            >
              <span className="tabular text-sm font-semibold text-muted-ink">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="type-h3">{stage.title}</h3>
                <p className="mt-2 max-w-[55ch] text-sm leading-6 text-muted-ink">
                  {stage.description}
                </p>
                <div className="mt-4">{stage.detail}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
