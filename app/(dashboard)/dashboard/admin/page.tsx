import type { Metadata } from "next"
import {
  ArrowRight,
  CalendarDays,
  ShieldCheck,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"

import { BookingStatusChart } from "@/components/dashboard/booking-status-chart"
import { ChartCard } from "@/components/dashboard/chart-card"
import { StatCard } from "@/components/dashboard/stat-card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BOOKING_STATUS_META, ROLE_LABELS } from "@/constants"
import {
  BOOKING_STATUS_COLORS,
  BOOKING_STATUS_ORDER,
} from "@/constants/booking-status-visuals"
import {
  SAMPLE_MONTHLY_REVENUE,
  SAMPLE_PLATFORM_ACTIVITY,
  SAMPLE_PLATFORM_BOOKINGS,
  SAMPLE_PLATFORM_PAYMENTS,
  SAMPLE_PLATFORM_SERVICES,
  SAMPLE_PLATFORM_USERS,
  type PlatformActivity,
} from "@/data/sample-platform"
import { formatDate, formatPrice } from "@/lib/format"

export const metadata: Metadata = {
  title: "Admin overview",
  description:
    "Sample platform overview with users, technicians, pending services, revenue, role, booking, and activity views.",
}

const ROLE_VISUALS = {
  customer: { bar: "bg-spruce", dot: "bg-spruce" },
  technician: { bar: "bg-fern", dot: "bg-fern" },
  admin: { bar: "bg-ember", dot: "bg-ember" },
} as const

const ACTIVITY_ICONS: Record<PlatformActivity["kind"], LucideIcon> = {
  user: Users,
  service: ShieldCheck,
  booking: CalendarDays,
  payment: Wallet,
}

export default function AdminOverviewPage() {
  const pendingServices = SAMPLE_PLATFORM_SERVICES.filter(
    (service) => service.approvalStatus === "pending"
  )
  const technicianCount = SAMPLE_PLATFORM_USERS.filter(
    (user) => user.role === "technician"
  ).length
  const totalRevenue = SAMPLE_PLATFORM_PAYMENTS.reduce(
    (total, payment) => total + payment.amount,
    0
  )

  const roleCounts = (
    ["customer", "technician", "admin"] as const
  ).map((role) => ({
    role,
    count: SAMPLE_PLATFORM_USERS.filter((user) => user.role === role).length,
  }))

  const statusData = BOOKING_STATUS_ORDER.map((status) => ({
    label: BOOKING_STATUS_META[status].label,
    value: SAMPLE_PLATFORM_BOOKINGS.filter(
      (booking) => booking.status === status
    ).length,
    color: BOOKING_STATUS_COLORS[status],
  }))

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="type-h1">Admin overview</h1>
          <p className="type-lead mt-3">
            Monitor the marketplace, review new services, and keep an eye on the
            people and payments behind every repair.
          </p>
          <p className="type-meta mt-2">
            Preview workspace · sample platform data. No live operations are
            connected.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:justify-end">
          <Link
            className={buttonVariants({ size: "sm", variant: "outline" })}
            href="/dashboard/admin/users"
          >
            <Users aria-hidden className="size-4" />
            Manage users
          </Link>
          <Link
            className={buttonVariants({ size: "sm" })}
            href="/dashboard/admin/services"
          >
            <ShieldCheck aria-hidden className="size-4" />
            Review services
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          hint="Across all platform roles"
          icon={Users}
          label="Total users"
          value={String(SAMPLE_PLATFORM_USERS.length)}
        />
        <StatCard
          hint="Approved and pending service providers"
          icon={Wrench}
          label="Total technicians"
          value={String(technicianCount)}
        />
        <StatCard
          hint="Waiting for administrator review"
          icon={ShieldCheck}
          label="Pending services"
          value={String(pendingServices.length)}
        />
        <StatCard
          hint="Sample paid transactions"
          icon={Wallet}
          label="Platform revenue"
          value={formatPrice(totalRevenue)}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="flex h-full flex-col p-5 sm:p-6">
          <div>
            <h2 className="type-h3">Users by role</h2>
            <p className="mt-1 text-sm leading-6 text-muted-ink">
              {SAMPLE_PLATFORM_USERS.length} sample accounts across the
              marketplace.
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {roleCounts.map(({ role, count }) => {
              const percentage = Math.round(
                (count / SAMPLE_PLATFORM_USERS.length) * 100
              )
              return (
                <div key={role}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm text-muted-ink">
                      <span
                        aria-hidden
                        className={`size-2 rounded-full ${ROLE_VISUALS[role].dot}`}
                      />
                      {ROLE_LABELS[role]}
                    </span>
                    <span className="text-sm font-semibold text-ink tabular">
                      {count}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-sage">
                    <div
                      className={`h-full rounded-full ${ROLE_VISUALS[role].bar}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-auto border-t border-line pt-4">
            <Link
              className="inline-flex items-center gap-1 text-sm font-semibold text-fern transition-colors hover:text-spruce"
              href="/dashboard/admin/users"
            >
              Manage users
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </Card>

        <BookingStatusChart
          data={statusData}
          description="All sample bookings across the platform."
          title="Booking status"
          total={SAMPLE_PLATFORM_BOOKINGS.length}
        />

        <ChartCard
          data={SAMPLE_MONTHLY_REVENUE}
          description="Sample completed payments by month."
          fill
          footerLabel="Sample platform revenue"
          title="Revenue overview"
        />
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-2 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="type-h3">Recent platform activity</h2>
            <p className="mt-1 text-sm text-muted-ink">
              Sample account, service, booking, and payment events.
            </p>
          </div>
          <Badge tone="neutral">Sample activity</Badge>
        </div>

        <ol className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-5">
          {SAMPLE_PLATFORM_ACTIVITY.map((activity) => {
            const Icon = ACTIVITY_ICONS[activity.kind]
            return (
              <li className="bg-card" key={activity.id}>
                <Link
                  className="group flex h-full flex-col p-5 transition-colors hover:bg-sage/20 focus-visible:bg-sage/20 focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-inset focus-visible:outline-none"
                  href={activity.href}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid size-9 place-items-center rounded-[0.625rem] bg-sage text-spruce">
                      <Icon aria-hidden className="size-4" strokeWidth={1.9} />
                    </span>
                    <span className="text-xs text-muted-ink">
                      {formatDate(activity.date)}
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-ink">
                    {activity.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-ink">
                    {activity.detail}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-fern">
                    View
                    <ArrowRight aria-hidden className="size-3.5" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </Card>
    </div>
  )
}
