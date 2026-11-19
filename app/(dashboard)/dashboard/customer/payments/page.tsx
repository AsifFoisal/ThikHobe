import type { Metadata } from "next"
import { CalendarDays } from "lucide-react"
import Link from "next/link"

import { PaymentHistory } from "@/components/customer/PaymentHistory"
import { buttonVariants } from "@/components/ui/Button"
import { getMyPayments } from "@/lib/server-data"

export const metadata: Metadata = {
  title: "Payment history",
  description:
    "Your completed payments, including service, technician, amount, transaction ID, and payment date.",
}

export default async function CustomerPaymentsPage() {
  const payments = await getMyPayments()

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="type-h1">Payment history</h1>
          <p className="type-lead mt-3">
            Receipts for completed repairs and the transactions behind them.
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

      <PaymentHistory payments={payments} />
    </div>
  )
}
