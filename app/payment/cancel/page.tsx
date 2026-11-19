import type { Metadata } from "next"
import { CircleX } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Payment cancelled",
  description:
    "FixMate payment cancellation surface explaining that no payment was completed and no payment information was changed.",
}

export default function PaymentCancelPage() {
  return (
    <div className="w-full max-w-2xl">
      <Card className="p-6 sm:p-8">
        <span className="grid size-12 place-items-center rounded-full bg-ember-soft text-ember-ink">
          <CircleX aria-hidden className="size-6" strokeWidth={1.8} />
        </span>
        <h1 className="type-h1 mt-5">Payment cancelled</h1>
        <p className="type-lead mt-3">
          No payment was completed. Your booking remains unpaid and can be paid
          later from My Bookings.
        </p>

        <p className="mt-5 rounded-lg bg-paper px-3 py-2 text-xs leading-5 text-muted-ink">
          This frontend prototype does not contact Stripe. No payment
          information was modified on the client.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            className={buttonVariants({ size: "default" })}
            href="/dashboard/customer/bookings"
          >
            Try Again
          </Link>
          <Link
            className={buttonVariants({ size: "default", variant: "outline" })}
            href="/dashboard/customer/bookings"
          >
            Return to My Bookings
          </Link>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted-ink">
          Choose the completed, unpaid booking and select Pay now to start
          checkout again in a connected build.
        </p>
      </Card>
    </div>
  )
}
