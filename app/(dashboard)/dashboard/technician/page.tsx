import type { Metadata } from "next"
import {
  ArrowRight,
  CircleCheck,
  ClipboardList,
  Plus,
  Wrench,
} from "lucide-react"
import Link from "next/link"

import { ChartCard } from "@/components/dashboard/ChartCard"
import { StatCard } from "@/components/dashboard/StatCard"
import { Avatar } from "@/components/ui/Avatar"
import { BookingStatusBadge } from "@/components/ui/StatusBadge"
import { buttonVariants } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { formatDate } from "@/lib/format"
import { getTechnicianBookings, getTechnicianServices } from "@/lib/server-data"

export const metadata: Metadata = {
  title: "Technician overview",
  description:
    "Your services, approval status, availability, and repair requests.",
}

export default async function TechnicianOverviewPage() {
  const [services, bookings] = await Promise.all([
    getTechnicianServices(),
    getTechnicianBookings(),
  ])

  const approvedServices = services.filter(
    (service) => service.approvalStatus === "approved"
  )
  const pendingServices = services.filter(
    (service) => service.approvalStatus === "pending"
  )
  const rejectedServices = services.filter(
    (service) => service.approvalStatus === "rejected"
  )
  const availableApproved = approvedServices.filter(
    (service) => service.available
  )
  const pendingRequests = bookings.filter(
    (booking) => booking.status === "requested"
  )
  const recentRequests = bookings
    .filter((booking) =>
      ["requested", "accepted", "in_progress"].includes(booking.status)
    )
    .slice(0, 4)

  const approvalTotal = services.length
  const approvalBars = [
    { label: "Approved", value: approvedServices.length, tone: "bg-fern" },
    { label: "Pending", value: pendingServices.length, tone: "bg-status-amber" },
    { label: "Rejected", value: rejectedServices.length, tone: "bg-status-red" },
  ]

  const weeklyActivity = Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - index))
    return {
      key: date.toISOString().slice(0, 10),
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
    }
  }).map((day) => ({
    label: day.label,
    value: bookings.filter(
      (booking) => booking.createdAt.slice(0, 10) === day.key
    ).length,
  }))

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="type-h1">Technician overview</h1>
          <p className="type-lead mt-3">
            Keep your services ready, keep requests moving, and see what needs
            your attention today.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:justify-end">
          <Link
            className={buttonVariants({ size: "sm", variant: "outline" })}
            href="/dashboard/technician/my-services"
          >
            <Wrench aria-hidden className="size-4" />
            My services
          </Link>
          <Link
            className={buttonVariants({ size: "sm" })}
            href="/dashboard/technician/add-service"
          >
            <Plus aria-hidden className="size-4" />
            Add service
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          hint="Across approved, pending, and rejected"
          icon={Wrench}
          label="Total services"
          value={String(services.length)}
        />
        <StatCard
          hint={`${availableApproved.length} currently available`}
          icon={CircleCheck}
          label="Approved services"
          value={String(approvedServices.length)}
        />
        <StatCard
          hint="Waiting for your response"
          icon={ClipboardList}
          label="Pending requests"
          value={String(pendingRequests.length)}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-line p-5">
            <div>
              <h2 className="type-h3">Recent repair requests</h2>
              <p className="mt-1 text-sm text-muted-ink">
                New and active jobs assigned to you.
              </p>
            </div>
            <Link
              className="inline-flex shrink-0 items-center gap-1 rounded-md text-sm font-semibold text-fern transition-colors hover:text-spruce focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none"
              href="/dashboard/technician/requests"
            >
              View all
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          {recentRequests.length === 0 ? (
            <p className="px-5 py-8 text-sm text-muted-ink">
              No active repair requests right now.
            </p>
          ) : (
            <ul>
              {recentRequests.map((booking) => (
                <li key={booking.id}>
                  <div className="flex items-center gap-3 border-b border-line px-4 py-3.5 last:border-b-0 sm:px-5">
                    <Avatar name={booking.customer.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">
                        {booking.customer.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-ink">
                        {booking.service.title} ·{" "}
                        {formatDate(booking.preferredDate)}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <BookingStatusBadge status={booking.status} />
                      <span className="text-[11px] text-muted-ink tabular">
                        #{booking.id}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="flex h-full flex-col p-5 sm:p-6">
          <div>
            <h2 className="type-h3">Service approval</h2>
            <p className="mt-1 text-sm leading-6 text-muted-ink">
              Where your {approvalTotal} listings stand.
            </p>
          </div>

          <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-sage">
            {approvalBars.map((bar) => (
              <span
                className={bar.tone}
                key={bar.label}
                style={{
                  width: approvalTotal
                    ? `${(bar.value / approvalTotal) * 100}%`
                    : "0%",
                }}
              />
            ))}
          </div>

          <ul className="mt-5 space-y-3">
            {approvalBars.map((bar) => (
              <li
                className="flex items-center justify-between gap-3"
                key={bar.label}
              >
                <span className="flex items-center gap-2 text-sm text-muted-ink">
                  <span
                    aria-hidden
                    className={`size-2 rounded-full ${bar.tone}`}
                  />
                  {bar.label}
                </span>
                <span className="text-sm font-semibold text-ink tabular">
                  {bar.value}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-auto border-t border-line pt-4">
            <Link
              className="inline-flex items-center gap-1 text-sm font-semibold text-fern transition-colors hover:text-spruce"
              href="/dashboard/technician/my-services"
            >
              Manage services
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <ChartCard
          data={weeklyActivity}
          description="Repair requests assigned to you across the last seven days."
          fill
          footerLabel="Weekly activity"
          title="Booking activity"
        />

        <Card className="flex h-full flex-col p-5 sm:p-6">
          <div>
            <h2 className="type-h3">Service availability</h2>
            <p className="mt-1 text-sm leading-6 text-muted-ink">
              Availability for your approved listings.
            </p>
          </div>

          <div className="mt-5 rounded-lg bg-paper p-4">
            <p className="text-3xl font-bold tracking-[-0.03em] text-ink tabular">
              {availableApproved.length}
              <span className="text-base font-medium text-muted-ink">
                {" "}
                of {approvedServices.length}
              </span>
            </p>
            <p className="mt-1 text-sm text-muted-ink">
              approved services are currently available to book.
            </p>
          </div>

          <ul className="mt-4 space-y-2">
            {approvedServices.map((service) => (
              <li
                className="flex items-center justify-between gap-3 text-sm"
                key={service.id}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    aria-hidden
                    className={`size-2 shrink-0 rounded-full ${
                      service.available ? "bg-fern" : "bg-line-strong"
                    }`}
                  />
                  <span className="truncate text-muted-ink">
                    {service.title}
                  </span>
                </span>
                <span className="shrink-0 text-xs font-medium text-ink">
                  {service.available ? "Available" : "Off"}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
            <p className="text-xs text-muted-ink">
              {pendingServices.length} pending review
            </p>
            <Link
              className="inline-flex items-center gap-1 text-sm font-semibold text-fern transition-colors hover:text-spruce"
              href="/dashboard/technician/my-services"
            >
              Manage
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
