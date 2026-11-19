import type { Metadata } from "next"
import {
  CalendarDays,
  CircleCheck,
  Inbox,
  Wallet,
  Wrench,
} from "lucide-react"
import Link from "next/link"

import { ConfirmDialog } from "@/components/dashboard/confirm-dialog"
import { DataTable } from "@/components/dashboard/data-table"
import { DashboardPagination } from "@/components/dashboard/pagination"
import { FilterSelect } from "@/components/dashboard/filter-select"
import { SearchInput } from "@/components/dashboard/search-input"
import { StatCard } from "@/components/dashboard/stat-card"
import { TableSkeleton } from "@/components/dashboard/table-skeleton"
import { ChartCard } from "@/components/dashboard/chart-card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Field, fieldControlClass, fieldTextareaClass } from "@/components/forms/field"
import { EmptyState } from "@/components/ui/state"
import { BookingStatusBadge } from "@/components/ui/status-badge"
import { formatPrice } from "@/lib/format"
import type { BookingStatus } from "@/types"

export const metadata: Metadata = {
  title: "Dashboard foundation",
  description:
    "Shared dashboard layout and component foundation for FixMate customer, technician, and admin workspaces.",
}

interface FoundationBooking {
  id: string
  service: string
  customer: string
  date: string
  status: BookingStatus
  amount: number
}

const bookings: FoundationBooking[] = [
  {
    id: "fm-2481",
    service: "iPhone screen replacement",
    customer: "Arif Rahman",
    date: "20 Nov",
    status: "in_progress",
    amount: 2500,
  },
  {
    id: "fm-2480",
    service: "AC service & gas refill",
    customer: "Nusrat A.",
    date: "21 Nov",
    status: "accepted",
    amount: 2200,
  },
  {
    id: "fm-2479",
    service: "Laptop board repair",
    customer: "Rifat H.",
    date: "18 Nov",
    status: "completed",
    amount: 1800,
  },
  {
    id: "fm-2478",
    service: "Washing machine repair",
    customer: "Sadia K.",
    date: "17 Nov",
    status: "requested",
    amount: 1900,
  },
]

const chartData = [
  { label: "Mon", value: 4 },
  { label: "Tue", value: 6 },
  { label: "Wed", value: 5 },
  { label: "Thu", value: 8 },
  { label: "Fri", value: 7 },
  { label: "Sat", value: 10 },
  { label: "Sun", value: 6 },
]

const statusOptions = [
  { value: "", label: "All statuses" },
  { value: "requested", label: "Requested" },
  { value: "accepted", label: "Accepted" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
]

export default async function DashboardFoundationPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>
}) {
  const params = await searchParams
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page
  const requestedPage = Number.parseInt(rawPage ?? "1", 10)
  const page =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, 3)
      : 1

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="type-h1">Dashboard foundation</h1>
          <p className="type-lead mt-3">
            One shell for three role-specific workspaces, with the shared cards,
            tables, filters, charts, dialogs, and states used across FixMate.
          </p>
        </div>
        <Badge className="self-start sm:self-end" tone="neutral">
          Component preview
        </Badge>
      </div>
      <p className="type-meta">
        Preview only — search, filters, pagination, and row actions are not wired
        to live data.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          hint="Across all services"
          icon={CalendarDays}
          label="Total requests"
          value="12"
        />
        <StatCard
          hint="2 currently in progress"
          icon={Wrench}
          label="Active jobs"
          value="3"
        />
        <StatCard
          hint="This month"
          icon={CircleCheck}
          label="Completed jobs"
          value="9"
        />
        <StatCard
          hint="Paid after completion"
          icon={Wallet}
          label="Paid to date"
          value={formatPrice(24500)}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="type-h3">Recent bookings</h2>
              <p className="mt-1 text-sm text-muted-ink">
                A sample of activity from the workspace.
              </p>
            </div>
            <Badge className="self-start sm:self-auto" tone="neutral">
              Sample data
            </Badge>
          </div>

          <div className="flex flex-col gap-2 border-b border-line p-4 sm:flex-row sm:items-center">
            <SearchInput
              className="flex-1"
              id="foundation-booking-search"
              placeholder="Search bookings…"
            />
            <FilterSelect
              className="sm:w-44"
              id="foundation-booking-status"
              label="Filter by status"
              options={statusOptions}
            />
          </div>

          <div className="p-4 sm:p-5">
            <DataTable
              caption="Sample recent bookings"
              columns={[
                {
                  key: "service",
                  header: "Service",
                  cell: (row) => (
                    <span className="font-medium">{row.service}</span>
                  ),
                },
                {
                  key: "customer",
                  header: "Customer",
                  cell: (row) => (
                    <span className="text-muted-ink">{row.customer}</span>
                  ),
                },
                {
                  key: "date",
                  header: "Date",
                  cell: (row) => (
                    <span className="tabular text-muted-ink">{row.date}</span>
                  ),
                },
                {
                  key: "status",
                  header: "Status",
                  cell: (row) => <BookingStatusBadge status={row.status} />,
                },
                {
                  key: "amount",
                  header: "Amount",
                  className: "text-right",
                  cell: (row) => (
                    <span className="tabular font-medium">
                      {formatPrice(row.amount)}
                    </span>
                  ),
                },
              ]}
              getRowKey={(row) => row.id}
              rows={bookings}
            />
          </div>

          <div className="border-t border-line p-4">
            <DashboardPagination
              basePath="/dashboard"
              page={page}
              totalPages={3}
            />
          </div>
        </Card>

        <ChartCard
          data={chartData}
          description="A sample view of incoming repair requests."
          fill
          title="Requests this week"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2 wide:grid-cols-4">
        <Card className="p-5 sm:p-6">
          <h2 className="type-h3">Form controls</h2>
          <p className="mt-1 text-sm leading-6 text-muted-ink">
            Shared field primitives for service and profile forms.
          </p>
          <div className="mt-5 space-y-4">
            <Field hint="Used to match the service area." htmlFor="foundation-area" label="Service area">
              <input
                className={fieldControlClass}
                defaultValue="Dhanmondi"
                id="foundation-area"
                type="text"
              />
            </Field>
            <Field htmlFor="foundation-notes" label="Internal note">
              <textarea
                className={fieldTextareaClass}
                id="foundation-notes"
                placeholder="Add context for the technician…"
                rows={3}
              />
            </Field>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="type-h3">Confirmation</h2>
          <p className="mt-1 text-sm leading-6 text-muted-ink">
            A dialog pattern for deleting services, cancelling bookings, and
            rejecting requests.
          </p>
          <div className="mt-4 border-y border-line py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium text-ink">
                Washing machine repair
              </p>
              <BookingStatusBadge status="requested" />
            </div>
            <p className="mt-1 text-xs text-muted-ink">
              Sadia K. · 17 Nov · {formatPrice(1900)}
            </p>
          </div>
          <div className="mt-4">
            <ConfirmDialog
              cancelLabel="Keep request"
              confirmLabel="Cancel request"
              description="This will remove the request from the technician's queue. It cannot be undone."
              title="Cancel this repair request?"
              triggerLabel="Cancel this request"
            />
          </div>
          <p className="mt-3 text-xs text-muted-ink">
            Dialog preview — no booking is changed.
          </p>
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="type-h3">Empty state</h2>
          <p className="mt-1 text-sm leading-6 text-muted-ink">
            The fallback when a workspace has no records yet.
          </p>
          <EmptyState
            action={
              <Link className={buttonVariants({ size: "sm" })} href="/services">
                Browse services
              </Link>
            }
            className="py-8"
            description="New customer requests will appear here once a service is booked."
            icon={Inbox}
            title="No repair requests yet"
          />
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="type-h3">Loading state</h2>
          <p className="mt-1 text-sm leading-6 text-muted-ink">
            Table skeletons keep the workspace stable while records load.
          </p>
          <TableSkeleton className="mt-5" rows={4} />
        </Card>
      </div>
    </div>
  )
}
