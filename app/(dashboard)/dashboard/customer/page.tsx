import type { Metadata } from "next"
import {
  CalendarDays,
  CircleCheck,
  CreditCard,
  Wallet,
  Wrench,
} from "lucide-react"
import Link from "next/link"

import { BookingStatusChart } from "@/components/dashboard/booking-status-chart"
import { RecentActivityCard } from "@/components/customer/recent-activity-card"
import { RecentBookingsCard } from "@/components/customer/recent-bookings-card"
import { StatCard } from "@/components/dashboard/stat-card"
import { buttonVariants } from "@/components/ui/button"
import { BOOKING_STATUS_META } from "@/constants"
import {
  BOOKING_STATUS_COLORS,
  BOOKING_STATUS_ORDER,
} from "@/constants/booking-status-visuals"
import {
  SAMPLE_CUSTOMER_ACTIVITY,
  SAMPLE_CUSTOMER_BOOKINGS,
  SAMPLE_CUSTOMER_PAYMENTS,
} from "@/data/sample-customer-bookings"
import { formatPrice } from "@/lib/format"

export const metadata: Metadata = {
  title: "Customer overview",
  description:
    "Sample customer dashboard with repair statistics, recent bookings, activity, and booking status distribution.",
}

export default function CustomerOverviewPage() {
  const totalRequests = SAMPLE_CUSTOMER_BOOKINGS.length
  const requestedJobs = SAMPLE_CUSTOMER_BOOKINGS.filter(
    (booking) => booking.status === "requested"
  ).length
  const activeJobs = SAMPLE_CUSTOMER_BOOKINGS.filter(
    (booking) =>
      booking.status === "accepted" || booking.status === "in_progress"
  ).length
  const completedJobs = SAMPLE_CUSTOMER_BOOKINGS.filter(
    (booking) => booking.status === "completed"
  ).length
  const paidTotal = SAMPLE_CUSTOMER_PAYMENTS.reduce(
    (total, payment) => total + payment.amount,
    0
  )

  const statusData = BOOKING_STATUS_ORDER.map((status) => ({
    label: BOOKING_STATUS_META[status].label,
    value: SAMPLE_CUSTOMER_BOOKINGS.filter(
      (booking) => booking.status === status
    ).length,
    color: BOOKING_STATUS_COLORS[status],
  }))

  const recentBookings = SAMPLE_CUSTOMER_BOOKINGS.slice(0, 5)

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="type-h1">Customer overview</h1>
          <p className="type-lead mt-3">
            Welcome back, Arif. Track active repairs, review requests, and keep
            payments in one place.
          </p>
          <p className="type-meta mt-2">
            Preview workspace · sample bookings and payments.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:justify-end">
          <Link
            className={buttonVariants({ size: "sm", variant: "outline" })}
            href="/dashboard/customer/payments"
          >
            <CreditCard aria-hidden className="size-4" />
            Payment history
          </Link>
          <Link
            className={buttonVariants({ size: "sm" })}
            href="/dashboard/customer/bookings"
          >
            <CalendarDays aria-hidden className="size-4" />
            My bookings
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          hint={`${requestedJobs} awaiting technician`}
          icon={CalendarDays}
          label="Total requests"
          value={String(totalRequests)}
        />
        <StatCard
          hint="Accepted or in progress"
          icon={Wrench}
          label="Active jobs"
          value={String(activeJobs)}
        />
        <StatCard
          hint="Finished repairs"
          icon={CircleCheck}
          label="Completed jobs"
          value={String(completedJobs)}
        />
        <StatCard
          hint={`${SAMPLE_CUSTOMER_PAYMENTS.length} completed payments`}
          icon={Wallet}
          label="Paid to date"
          value={formatPrice(paidTotal)}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <RecentBookingsCard bookings={recentBookings} />
        <BookingStatusChart data={statusData} total={totalRequests} />
      </div>

      <RecentActivityCard activities={SAMPLE_CUSTOMER_ACTIVITY} />
    </div>
  )
}
