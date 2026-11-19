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
import { formatDate, formatPrice } from "@/lib/format"
import {
  getAdminBookings,
  getAdminPayments,
  getAdminServices,
  getAdminUsers,
} from "@/lib/server-data"

export const metadata: Metadata = {
  title: "Admin overview",
  description:
    "Platform overview with users, technicians, pending services, revenue, roles, and booking activity.",
}

const ROLE_VISUALS = {
  customer: { bar: "bg-spruce", dot: "bg-spruce" },
  technician: { bar: "bg-fern", dot: "bg-fern" },
  admin: { bar: "bg-ember", dot: "bg-ember" },
} as const

type PlatformActivityKind = "user" | "service" | "booking" | "payment"

const ACTIVITY_ICONS: Record<PlatformActivityKind, LucideIcon> = {
  user: Users,
  service: ShieldCheck,
  booking: CalendarDays,
  payment: Wallet,
}

export default async function AdminOverviewPage() {
  const [users, services, bookings, paymentsData] = await Promise.all([
    getAdminUsers(),
    getAdminServices(),
    getAdminBookings(),
    getAdminPayments(),
  ])

  const pendingServices = services.filter(
    (service) => service.approvalStatus === "pending"
  )
  const technicianCount = users.filter(
    (user) => user.role === "technician"
  ).length
  const totalRevenue = paymentsData.totalRevenue

  const roleCounts = (["customer", "technician", "admin"] as const).map(
    (role) => ({
      role,
      count: users.filter((user) => user.role === role).length,
    })
  )

  const statusData = BOOKING_STATUS_ORDER.map((status) => ({
    label: BOOKING_STATUS_META[status].label,
    value: bookings.filter((booking) => booking.status === status).length,
    color: BOOKING_STATUS_COLORS[status],
  }))

  const revenueData = Array.from({ length: 6 }, (_, index) => {
    const date = new Date()
    date.setDate(1)
    date.setMonth(date.getMonth() - (5 - index))
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    return {
      label: date.toLocaleDateString("en-US", { month: "short" }),
      value: paymentsData.items
        .filter((payment) => payment.paidAt.slice(0, 7) === key)
        .reduce((total, payment) => total + payment.amount, 0),
    }
  })

  const activity = [
    ...users.slice(0, 2).map((user) => ({
      id: `user-${user.id}`,
      kind: "user" as const,
      title: user.name,
      detail: `Joined as ${ROLE_LABELS[user.role].toLowerCase()}.`,
      href: "/dashboard/admin/users",
      date: user.createdAt,
    })),
    ...services.slice(0, 1).map((service) => ({
      id: `service-${service.id}`,
      kind: "service" as const,
      title: service.title,
      detail: `Listed by ${service.technician.name}.`,
      href: "/dashboard/admin/services",
      date: service.createdAt,
    })),
    ...bookings.slice(0, 1).map((booking) => ({
      id: `booking-${booking.id}`,
      kind: "booking" as const,
      title: booking.service.title,
      detail: `Requested by ${booking.customer.name}.`,
      href: "/dashboard/admin/bookings",
      date: booking.createdAt,
    })),
    ...paymentsData.items.slice(0, 1).map((payment) => ({
      id: `payment-${payment.id}`,
      kind: "payment" as const,
      title: payment.serviceTitle,
      detail: `Paid by ${payment.customerName} · ${formatPrice(payment.amount)}.`,
      href: "/dashboard/admin/transactions",
      date: payment.paidAt,
    })),
  ]
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, 5)

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="type-h1">Admin overview</h1>
          <p className="type-lead mt-3">
            Monitor the marketplace, review new services, and keep an eye on the
            people and payments behind every repair.
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
          value={String(users.length)}
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
          hint="Successful platform payments"
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
              {users.length} accounts across the marketplace.
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {roleCounts.map(({ role, count }) => {
              const percentage = users.length
                ? Math.round((count / users.length) * 100)
                : 0
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
          description="All bookings across the platform."
          title="Booking status"
          total={bookings.length}
        />

        <ChartCard
          data={revenueData}
          description="Successful payments grouped by month."
          fill
          footerLabel="Platform revenue"
          title="Revenue overview"
        />
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-2 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="type-h3">Recent platform activity</h2>
            <p className="mt-1 text-sm text-muted-ink">
              Latest account, service, booking, and payment events.
            </p>
          </div>
          <Badge tone="neutral">Live records</Badge>
        </div>

        {activity.length === 0 ? (
          <p className="px-5 py-8 text-sm text-muted-ink">
            Platform activity will appear here as accounts, services, bookings,
            and payments are created.
          </p>
        ) : (
          <ol className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-5">
            {activity.map((item) => {
              const Icon = ACTIVITY_ICONS[item.kind]
              return (
                <li className="bg-card" key={item.id}>
                  <Link
                    className="group flex h-full flex-col p-5 transition-colors hover:bg-sage/20 focus-visible:bg-sage/20 focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-inset focus-visible:outline-none"
                    href={item.href}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid size-9 place-items-center rounded-[0.625rem] bg-sage text-spruce">
                        <Icon aria-hidden className="size-4" strokeWidth={1.9} />
                      </span>
                      <span className="text-xs text-muted-ink">
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <p className="mt-4 text-sm font-semibold text-ink">
                      {item.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-ink">
                      {item.detail}
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
        )}
      </Card>
    </div>
  )
}
