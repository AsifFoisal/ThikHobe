import type { Metadata } from "next"
import { CalendarDays } from "lucide-react"
import Link from "next/link"

import { PaymentHistory } from "@/components/customer/payment-history"
import { buttonVariants } from "@/components/ui/button"
import { SAMPLE_CUSTOMER_PAYMENTS } from "@/data/sample-customer-bookings"

export const metadata: Metadata = {
  title: "Payment history",
  description:
    "Sample payment history for the FixMate demo customer, including service, technician, amount, transaction ID, and payment date.",
}

export default function CustomerPaymentsPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="type-h1">Payment history</h1>
          <p className="type-lead mt-3">
            Receipts for completed repairs and the transactions behind them.
          </p>
          <p className="type-meta mt-2">
            Preview workspace · sample receipts. No live payment provider is
            connected.
          </p>
        </div>
        <Link
          className={buttonVariants({ size: "sm", variant: "outline" })}
          href="/dashboard/customer/bookings"
        >
          <CalendarDays aria-hidden className="size-4" />
          My bookings
        </Link>
      </div>

      <PaymentHistory payments={SAMPLE_CUSTOMER_PAYMENTS} />
    </div>
  )
}
