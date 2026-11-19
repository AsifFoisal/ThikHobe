import type { Metadata } from "next"
import { CreditCard } from "lucide-react"
import Link from "next/link"

import { CustomerBookings } from "@/components/customer/CustomerBookings"
import { buttonVariants } from "@/components/ui/Button"
import { getMyBookings } from "@/lib/server-data"

export const metadata: Metadata = {
  title: "My bookings",
  description:
    "Your repair requests, including status, payments, and timeline access.",
}

export default async function CustomerBookingsPage() {
  const bookings = await getMyBookings()

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="type-h1">My bookings</h1>
          <p className="type-lead mt-3">
            Every repair request on this account, from the first request
            through final payment.
          </p>
        </div>
        <Link
          className={buttonVariants({ size: "sm", variant: "outline" })}
          href="/dashboard/customer/payments"
        >
          <CreditCard aria-hidden className="size-4" />
          Payment history
        </Link>
      </div>

      <CustomerBookings bookings={bookings} />
    </div>
  )
}
