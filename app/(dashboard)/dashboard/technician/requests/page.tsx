import type { Metadata } from "next"
import { CalendarDays, ClipboardList, MapPin, Phone } from "lucide-react"
import Link from "next/link"

import { DataTable } from "@/components/dashboard/data-table"
import { TechnicianRequestActions } from "@/components/technician/technician-request-actions"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/components/ui/status-badge"
import { EmptyState } from "@/components/ui/state"
import {
  formatBookingFinalAmount,
  formatDate,
  formatPrice,
} from "@/lib/format"
import { getTechnicianBookings } from "@/lib/server-data"
import { cn } from "@/lib/utils"
import type { Booking, BookingStatus } from "@/types"

export const metadata: Metadata = {
  title: "Repair requests",
  description:
    "Repair requests assigned to you, with status-specific actions.",
}

const FILTERS = [
  { value: "all", label: "All" },
  { value: "requested", label: "Requested" },
  { value: "accepted", label: "Accepted" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
] as const

type RequestFilter = (typeof FILTERS)[number]["value"]

function isFilter(value: string | undefined): value is RequestFilter {
  return FILTERS.some((filter) => filter.value === value)
}

function paymentLine(booking: Booking) {
  if (booking.status === "completed") {
    return {
      label: "Final amount",
      value: formatBookingFinalAmount(booking),
      badge: <PaymentStatusBadge status={booking.paymentStatus} />,
    }
  }

  if (booking.status === "rejected" || booking.status === "cancelled") {
    return {
      label: "Payment",
      value: "No charge",
      badge: <Badge tone="gray">Closed</Badge>,
    }
  }

  return {
    label: "Estimated base",
    value: formatPrice(booking.basePrice),
    badge: null,
  }
}

export default async function TechnicianRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[] }>
}) {
  const params = await searchParams
  const rawStatus = Array.isArray(params.status)
    ? params.status[0]
    : params.status
  const activeFilter: RequestFilter = isFilter(rawStatus)
    ? rawStatus
    : "all"

  const allBookings = await getTechnicianBookings()

  const counts = allBookings.reduce(
    (result, booking) => {
      result.all += 1
      if (booking.status in result) {
        const key = booking.status as keyof typeof result
        result[key] += 1
      }
      return result
    },
    {
      all: 0,
      requested: 0,
      accepted: 0,
      in_progress: 0,
      completed: 0,
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
        <h1 className="type-h1">Repair requests</h1>
        <p className="type-lead mt-3">
          Review the jobs assigned to you, contact the customer, and move each
          repair through its next stage.
        </p>
      </div>

      <nav
        aria-label="Filter repair requests"
        className="flex flex-wrap gap-2"
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
                  ? "/dashboard/technician/requests"
                  : `/dashboard/technician/requests?status=${filter.value}`
              }
              key={filter.value}
            >
              {filter.label}
              <span
                className={cn(
                  "rounded-full px-1.5 text-[11px] tabular",
                  active
                    ? "bg-paper/15 text-paper"
                    : "bg-sage text-muted-ink"
                )}
              >
                {counts[filter.value]}
              </span>
            </Link>
          )
        })}
      </nav>

      {bookings.length === 0 ? (
        <Card>
          <EmptyState
            action={
              <Link
                className={buttonVariants({ size: "sm" })}
                href="/dashboard/technician/requests"
              >
                Clear filter
              </Link>
            }
            description="There are no requests in this status right now."
            icon={ClipboardList}
            title="No requests in this view"
          />
        </Card>
      ) : (
        <>
          <Card className="hidden overflow-hidden xl:block">
            <div className="overflow-x-auto p-4">
              <DataTable
                caption="Repair requests assigned to you"
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
                        <p className="mt-1 text-[11px] tracking-[0.06em] text-muted-ink uppercase tabular">
                          #{booking.id}
                        </p>
                      </div>
                    ),
                  },
                  {
                    key: "customer",
                    header: "Customer",
                    cell: (booking) => (
                      <div>
                        <p className="font-medium text-ink">
                          {booking.customer.name}
                        </p>
                        <p className="mt-1 text-xs text-muted-ink">
                          {booking.customer.phone ?? "No phone"}
                        </p>
                      </div>
                    ),
                  },
                  {
                    key: "address",
                    header: "Address",
                    cell: (booking) => (
                      <p className="max-w-[12rem] text-muted-ink">
                        {booking.address}
                      </p>
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
                    key: "problem",
                    header: "Problem",
                    cell: (booking) => (
                      <p className="max-w-[14rem] text-muted-ink">
                        {booking.problemDescription}
                      </p>
                    ),
                  },
                  {
                    key: "status",
                    header: "Status",
                    cell: (booking) => (
                      <BookingStatusBadge status={booking.status} />
                    ),
                  },
                  {
                    key: "actions",
                    header: "Actions",
                    className: "text-right",
                    cell: (booking) => (
                      <div className="flex justify-end">
                        <TechnicianRequestActions booking={booking} />
                      </div>
                    ),
                  },
                ]}
                getRowKey={(booking) => booking.id}
                rows={bookings}
              />
            </div>
          </Card>

          <div className="grid gap-4 xl:hidden">
            {bookings.map((booking) => {
            const payment = paymentLine(booking)

            return (
              <Card className="flex h-full flex-col p-5" key={booking.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold leading-6 text-ink">
                      {booking.service.title}
                    </h2>
                    <p className="mt-1 text-[11px] tracking-[0.06em] text-muted-ink uppercase tabular">
                      #{booking.id} · {booking.service.category}
                    </p>
                  </div>
                  <BookingStatusBadge status={booking.status} />
                </div>

                <div className="mt-4 flex items-center gap-2.5">
                  <Avatar name={booking.customer.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {booking.customer.name}
                    </p>
                    <p className="text-xs text-muted-ink">Customer</p>
                  </div>
                </div>

                <dl className="mt-4 grid gap-x-4 gap-y-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.06em] text-muted-ink uppercase">
                      <Phone aria-hidden className="size-3.5" />
                      Phone
                    </dt>
                    <dd className="mt-1 text-ink">
                      {booking.customer.phone ?? "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.06em] text-muted-ink uppercase">
                      <CalendarDays aria-hidden className="size-3.5" />
                      Preferred date
                    </dt>
                    <dd className="mt-1 text-ink">
                      {formatDate(booking.preferredDate)}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.06em] text-muted-ink uppercase">
                      <MapPin aria-hidden className="size-3.5" />
                      Address
                    </dt>
                    <dd className="mt-1 leading-6 text-ink">
                      {booking.address}
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 border-t border-line pt-3">
                  <p className="text-[11px] font-medium tracking-[0.06em] text-muted-ink uppercase">
                    Reported problem
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-ink">
                    {booking.problemDescription}
                  </p>
                </div>

                <div className="mt-auto pt-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-paper px-3 py-2">
                    <div>
                      <p className="text-[11px] font-medium tracking-[0.06em] text-muted-ink uppercase">
                        {payment.label}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-ink tabular">
                        {payment.value}
                      </p>
                    </div>
                    {payment.badge}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                    <p className="text-xs text-muted-ink">
                      {booking.status === "completed"
                        ? "Completed — no further status actions."
                        : booking.status === "rejected" ||
                            booking.status === "cancelled"
                          ? "Closed — no further status actions."
                          : "Assigned to you"}
                    </p>
                    <TechnicianRequestActions booking={booking} />
                  </div>
                </div>
                </Card>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
