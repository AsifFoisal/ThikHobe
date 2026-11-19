import { ReceiptText } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { PaymentStatusBadge } from "@/components/ui/StatusBadge"
import { EmptyState } from "@/components/ui/State"
import { formatDate, formatPrice } from "@/lib/format"
import type { Payment } from "@/types"

export function PaymentHistory({ payments }: { payments: Payment[] }) {
  if (payments.length === 0) {
    return (
      <Card>
        <EmptyState
          action={
            <Link
              className={buttonVariants({ size: "sm" })}
              href="/dashboard/customer/bookings"
            >
              View my bookings
            </Link>
          }
          description="Completed repairs with a successful payment will appear here with their transaction details."
          icon={ReceiptText}
          title="No payments yet"
        />
      </Card>
    )
  }

  const totalPaid = payments.reduce(
    (total, payment) => total + payment.amount,
    0
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="type-h3">All payments</h2>
        <div className="text-right">
          <p className="text-[11px] font-medium tracking-[0.08em] text-muted-ink uppercase">
            Total paid
          </p>
          <p className="mt-0.5 text-lg font-semibold text-ink tabular">
            {formatPrice(totalPaid)}
          </p>
        </div>
      </div>

      <Card className="hidden overflow-hidden xl:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              Payment history for this account
            </caption>
            <thead>
              <tr>
                {[
                  "Service",
                  "Technician",
                  "Amount",
                  "Transaction ID",
                  "Payment date",
                ].map((heading) => (
                  <th
                    className="border-b border-line bg-sage/40 px-3 py-3 text-[0.6875rem] font-semibold tracking-[0.12em] text-muted-ink uppercase"
                    key={heading}
                    scope="col"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr
                  className="border-b border-line last:border-b-0 hover:bg-sage/15"
                  key={payment.id}
                >
                  <td className="px-3 py-3.5 align-top">
                    <p className="font-medium text-ink">
                      {payment.serviceTitle}
                    </p>
                    <p className="mt-1 text-[11px] tracking-[0.06em] text-muted-ink uppercase tabular">
                      #{payment.bookingId}
                    </p>
                  </td>
                  <td className="px-3 py-3.5 align-top text-muted-ink">
                    {payment.technicianName}
                  </td>
                  <td className="px-3 py-3.5 align-top font-semibold text-ink tabular">
                    {formatPrice(payment.amount)}
                  </td>
                  <td className="px-3 py-3.5 align-top">
                    <span className="text-xs text-muted-ink tabular">
                      {payment.transactionId}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 align-top whitespace-nowrap text-muted-ink">
                    {formatDate(payment.paidAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <ul className="grid gap-3 md:grid-cols-2 xl:hidden">
        {payments.map((payment) => (
          <li key={payment.id}>
            <Card className="h-full p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    {payment.serviceTitle}
                  </p>
                  <p className="mt-1 text-xs text-muted-ink">
                    {payment.technicianName}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-ink tabular">
                  {formatPrice(payment.amount)}
                </p>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3">
                <div>
                  <dt className="text-[11px] font-medium tracking-[0.06em] text-muted-ink uppercase">
                    Transaction ID
                  </dt>
                  <dd className="mt-1 text-xs text-ink tabular">
                    {payment.transactionId}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium tracking-[0.06em] text-muted-ink uppercase">
                    Payment date
                  </dt>
                  <dd className="mt-1 text-sm text-ink">
                    {formatDate(payment.paidAt)}
                  </dd>
                </div>
              </dl>

              <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3">
                <p className="text-[11px] text-muted-ink tabular">
                  #{payment.bookingId}
                </p>
                <PaymentStatusBadge status="paid" />
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
