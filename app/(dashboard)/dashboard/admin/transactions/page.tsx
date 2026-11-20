import type { Metadata } from "next"
import { ReceiptText, TrendingUp, Wallet } from "lucide-react"
import Link from "next/link"

import { ChartCard } from "@/components/dashboard/ChartCard"
import { DataTable } from "@/components/dashboard/DataTable"
import { StatCard } from "@/components/dashboard/StatCard"
import { Badge } from "@/components/ui/Badge"
import { buttonVariants } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { EmptyState } from "@/components/ui/State"
import { formatDate, formatPrice } from "@/lib/format"
import { getAdminPayments } from "@/lib/server-data"

export const metadata: Metadata = {
  title: "Transactions",
  description:
    "Platform payment transactions, total revenue, and monthly revenue overview.",
}

export default async function AdminTransactionsPage() {
  const { items: payments, totalRevenue } = await getAdminPayments()
  const averagePayment =
    payments.length > 0 ? totalRevenue / payments.length : 0

  const revenueData = Array.from({ length: 6 }, (_, index) => {
    const date = new Date()
    date.setDate(1)
    date.setMonth(date.getMonth() - (5 - index))
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    return {
      label: date.toLocaleDateString("en-US", { month: "short" }),
      value: payments
        .filter((payment) => payment.paidAt.slice(0, 7) === key)
        .reduce((total, payment) => total + payment.amount, 0),
    }
  })

  const header = (
    <div className="max-w-2xl">
      <h1 className="type-h1">Transactions</h1>
      <p className="type-lead mt-3">
        Every payment on the platform, with the people, service, and transaction
        reference behind it.
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
          hint="All successful payments"
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
        data={revenueData}
        description="Successful payments grouped by month."
        footerLabel="Platform revenue"
        title="Revenue overview"
      />

      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="type-h3">All transactions</h2>
          <div className="flex items-center gap-2">
            <Badge tone="neutral">{payments.length} payments</Badge>
            <p className="tabular text-sm font-semibold text-ink">
              {formatPrice(totalRevenue)}
            </p>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div>
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
                      <p className="tabular mt-1 text-[11px] tracking-[0.06em] text-muted-ink uppercase">
                        #{payment.bookingId}
                      </p>
                    </div>
                  ),
                },
                {
                  key: "amount",
                  header: "Amount",
                  align: "right",
                  cell: (payment) => (
                    <span className="tabular font-semibold text-ink">
                      {formatPrice(payment.amount)}
                    </span>
                  ),
                },
                {
                  key: "transaction",
                  header: "Transaction ID",
                  cell: (payment) => (
                    <span className="tabular text-xs text-muted-ink">
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
