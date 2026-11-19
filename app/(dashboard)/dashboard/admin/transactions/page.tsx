import type { Metadata } from "next"
import { ReceiptText, TrendingUp, Wallet } from "lucide-react"
import Link from "next/link"

import { ChartCard } from "@/components/dashboard/chart-card"
import { DataTable } from "@/components/dashboard/data-table"
import { StatCard } from "@/components/dashboard/stat-card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/state"
import {
  SAMPLE_MONTHLY_REVENUE,
  SAMPLE_PLATFORM_PAYMENTS,
} from "@/data/sample-platform"
import { formatDate, formatPrice } from "@/lib/format"

export const metadata: Metadata = {
  title: "Transactions",
  description:
    "Sample platform payment transactions, total revenue, and monthly revenue overview.",
}

export default function AdminTransactionsPage() {
  const payments = SAMPLE_PLATFORM_PAYMENTS
  const totalRevenue = payments.reduce(
    (total, payment) => total + payment.amount,
    0
  )
  const averagePayment =
    payments.length > 0 ? Math.round(totalRevenue / payments.length) : 0

  const header = (
    <div className="max-w-2xl">
      <h1 className="type-h1">Transactions</h1>
      <p className="type-lead mt-3">
        Every sample payment on the platform, with the people, service, and
        transaction reference behind it.
      </p>
      <p className="type-meta mt-2">
        Preview workspace · sample receipts. No live payment provider is
        connected.
      </p>
    </div>
  )

  if (payments.length === 0) {
    return (
      <div className="space-y-6 lg:space-y-8">
        {header}
        <Card>
          <EmptyState
            action={
              <Link
                className={buttonVariants({ size: "sm" })}
                href="/dashboard/admin/bookings"
              >
                View bookings
              </Link>
            }
            description="Completed payments will appear here with their customer, technician, service, amount, transaction ID, and payment date."
            icon={ReceiptText}
            title="No transactions yet"
          />
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {header}

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          hint="All sample payments"
          icon={Wallet}
          label="Total revenue"
          value={formatPrice(totalRevenue)}
        />
        <StatCard
          hint="Paid transaction records"
          icon={ReceiptText}
          label="Transactions"
          value={String(payments.length)}
        />
        <StatCard
          hint="Mean completed payment"
          icon={TrendingUp}
          label="Average payment"
          value={formatPrice(averagePayment)}
        />
      </div>

      <ChartCard
        data={SAMPLE_MONTHLY_REVENUE}
        description="Sample completed payments grouped by month."
        footerLabel="Sample platform revenue"
        title="Revenue overview"
      />

      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="type-h3">All transactions</h2>
          <div className="flex items-center gap-2">
            <Badge tone="neutral">
              {payments.length} payments
            </Badge>
            <p className="text-sm font-semibold text-ink tabular">
              {formatPrice(totalRevenue)}
            </p>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="p-4">
            <DataTable
              caption="All platform payment transactions"
              columns={[
                {
                  key: "customer",
                  header: "Customer",
                  cell: (payment) => (
                    <span className="font-medium text-ink">
                      {payment.customerName}
                    </span>
                  ),
                },
                {
                  key: "technician",
                  header: "Technician",
                  cell: (payment) => (
                    <span className="text-muted-ink">
                      {payment.technicianName}
                    </span>
                  ),
                },
                {
                  key: "service",
                  header: "Service",
                  cell: (payment) => (
                    <div className="min-w-0">
                      <p className="text-ink">{payment.serviceTitle}</p>
                      <p className="mt-1 text-[11px] tracking-[0.06em] text-muted-ink uppercase tabular">
                        #{payment.bookingId}
                      </p>
                    </div>
                  ),
                },
                {
                  key: "amount",
                  header: "Amount",
                  cell: (payment) => (
                    <span className="font-semibold text-ink tabular">
                      {formatPrice(payment.amount)}
                    </span>
                  ),
                },
                {
                  key: "transaction",
                  header: "Transaction ID",
                  cell: (payment) => (
                    <span className="text-xs text-muted-ink tabular">
                      {payment.transactionId}
                    </span>
                  ),
                },
                {
                  key: "date",
                  header: "Payment date",
                  cell: (payment) => (
                    <span className="whitespace-nowrap text-muted-ink">
                      {formatDate(payment.paidAt)}
                    </span>
                  ),
                },
              ]}
              getRowKey={(payment) => payment.id}
              rows={payments}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
