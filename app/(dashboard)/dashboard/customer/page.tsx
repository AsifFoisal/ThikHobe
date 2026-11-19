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
import { RecentBookingsCard } from "@/components/customer/recent-bookings-card"
import { StatCard } from "@/components/dashboard/stat-card"
import { buttonVariants } from "@/components/ui/button"
import { BOOKING_STATUS_META } from "@/constants"
import {
  BOOKING_STATUS_COLORS,
  BOOKING_STATUS_ORDER,
} from "@/constants/booking-status-visuals"
import { formatPrice } from "@/lib/format"
import { requireSessionUser } from "@/lib/server-api"
import { getMyBookings, getMyPayments } from "@/lib/server-data"

export const metadata: Metadata = {
  title: "Customer overview",
  description:
    "Your repair statistics, recent bookings, and payment summary.",
}

export default async function CustomerOverviewPage() {
  const user = await requireSessionUser()
  const [bookings, payments] = await Promise.all([
    getMyBookings(),
    getMyPayments(),
  ])

  const totalRequests = bookings.length
  const requestedJobs = bookings.filter(
    (booking) => booking.status === "requested"
  ).length
  const activeJobs = bookings.filter(
    (booking) =>
      booking.status === "accepted" || booking.status === "in_progress"
  ).length
  const completedJobs = bookings.filter(
    (booking) => booking.status === "completed"
  ).length
  const paidTotal = payments.reduce(
    (total, payment) => total + payment.amount,
    0
  )

  const statusData = BOOKING_STATUS_ORDER.map((status) => ({
    label: BOOKING_STATUS_META[status].label,
    value: bookings.filter((booking) => booking.status === status).length,
    color: BOOKING_STATUS_COLORS[status],
  }))

  const recentBookings = bookings.slice(0, 5)
  const firstName = user.name.split(" ")[0]

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="type-h1">Customer overview</h1>
          <p className="type-lead mt-3">
            Welcome back, {firstName}. Track active repairs, review requests,
            and keep payments in one place.
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
          hint={`${payments.length} completed payments`}
          icon={Wallet}
          label="Paid to date"
          value={formatPrice(paidTotal)}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <RecentBookingsCard bookings={recentBookings} />
        <BookingStatusChart data={statusData} total={totalRequests} />
      </div>
    </div>
  )
}
