import type { Metadata } from "next"
import { CalendarX } from "lucide-react"
import Link from "next/link"

import { DataTable } from "@/components/dashboard/DataTable"
import { Badge } from "@/components/ui/Badge"
import { buttonVariants } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/components/ui/StatusBadge"
import { EmptyState } from "@/components/ui/State"
import { formatBookingFinalAmount, formatDate, formatPrice } from "@/lib/format"
import { getAdminBookings } from "@/lib/server-data"
import { cn } from "@/lib/utils"
import type { BookingStatus } from "@/types"

export const metadata: Metadata = {
  title: "All bookings",
  description:
    "Read-only platform booking history with status filtering for ThikHobe administrators.",
}

const FILTERS = [
  { value: "all", label: "All" },
  { value: "requested", label: "Requested" },
  { value: "accepted", label: "Accepted" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "rejected", label: "Rejected" },
  { value: "cancelled", label: "Cancelled" },
] as const

type BookingFilter = (typeof FILTERS)[number]["value"]

function isFilter(value: string | undefined): value is BookingFilter {
  return FILTERS.some((filter) => filter.value === value)
}

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[] }>
}) {
  const params = await searchParams
  const rawStatus = Array.isArray(params.status)
    ? params.status[0]
    : params.status
  const activeFilter: BookingFilter = isFilter(rawStatus) ? rawStatus : "all"

  const allBookings = await getAdminBookings()

  const counts = allBookings.reduce(
    (result, booking) => {
      result.all += 1
      result[booking.status] += 1
      return result
    },
    {
      all: 0,
      requested: 0,
      accepted: 0,
      in_progress: 0,
      completed: 0,
      rejected: 0,
      cancelled: 0,
    }
  )

  const bookings =
    activeFilter === "all"
      ? allBookings
      : allBookings.filter(
          (booking) => booking.status === (activeFilter as BookingStatus)
        )

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="max-w-2xl">
        <h1 className="type-h1">All bookings</h1>
        <p className="type-lead mt-3">
          Every repair booking on the platform, with its service, participants,
          status, and amount.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="type-h3">Platform bookings</h2>
            <p className="mt-1 text-sm text-muted-ink">
              {bookings.length} of {allBookings.length} bookings
            </p>
          </div>
          <Badge tone="neutral">Read only</Badge>
        </div>

        <nav
          aria-label="Filter bookings by status"
          className="flex flex-wrap gap-2 border-b border-line p-4"
        >
          {FILTERS.map((filter) => {
            const active = activeFilter === filter.value
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none",
                  active
                    ? "border-spruce bg-spruce text-paper"
                    : "border-line-strong bg-card text-muted-ink hover:border-spruce/35 hover:bg-sage/50 hover:text-spruce"
                )}
                href={
                  filter.value === "all"
                    ? "/dashboard/admin/bookings"
                    : `/dashboard/admin/bookings?status=${filter.value}`
                }
                key={filter.value}
              >
                {filter.label}
                <span
                  className={cn(
                    "tabular rounded-full px-1.5 text-[11px]",
                    active ? "bg-paper/15 text-paper" : "bg-sage text-muted-ink"
                  )}
                >
                  {counts[filter.value]}
                </span>
              </Link>
            )
          })}
        </nav>

        {bookings.length === 0 ? (
          <EmptyState
            action={
              <Link
                className={buttonVariants({ size: "sm" })}
                href="/dashboard/admin/bookings"
              >
                Clear filter
              </Link>
            }
            description="There are no bookings with this status."
            icon={CalendarX}
            title="No bookings found"
          />
        ) : (
          <div>
            <DataTable
              caption="All platform bookings"
              tableFrom="xl"
              columns={[
                {
                  key: "service",
                  header: "Service",
                  cell: (booking) => (
                    <div className="min-w-0">
                      <p className="font-medium text-ink">
                        {booking.service.title}
                      </p>
                      <p className="tabular mt-1 text-[11px] tracking-[0.06em] text-muted-ink uppercase">
                        #{booking.id}
                      </p>
                    </div>
                  ),
                },
                {
                  key: "customer",
                  header: "Customer",
                  cell: (booking) => (
                    <span className="text-muted-ink">
                      {booking.customer.name}
                    </span>
                  ),
                },
                {
                  key: "technician",
                  header: "Technician",
                  cell: (booking) => (
                    <span className="text-muted-ink">
                      {booking.technician.name}
                    </span>
                  ),
                },
                {
                  key: "date",
                  header: "Preferred date",
                  cell: (booking) => (
                    <span className="whitespace-nowrap text-muted-ink">
                      {formatDate(booking.preferredDate)}
                    </span>
                  ),
                },
                {
                  key: "status",
                  header: "Booking",
                  cell: (booking) => (
                    <BookingStatusBadge status={booking.status} />
                  ),
                },
                {
                  key: "payment",
                  header: "Payment",
                  cell: (booking) => (
                    <PaymentStatusBadge status={booking.paymentStatus} />
                  ),
                },
                {
                  key: "amount",
                  header: "Amount",
                  align: "right",
                  cell: (booking) => (
                    <div>
                      <p className="tabular font-medium text-ink">
                        {formatBookingFinalAmount(booking)}
                      </p>
                      <p className="mt-1 text-[11px] text-muted-ink">
                        Base {formatPrice(booking.basePrice)}
                      </p>
                    </div>
                  ),
                },
              ]}
              getRowKey={(booking) => booking.id}
              rows={bookings}
            />
          </div>
        )}
      </Card>
    </div>
  )
}
