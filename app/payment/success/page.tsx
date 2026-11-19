import type { Metadata } from "next"
import { CheckCircle2, CircleAlert, Link2Off } from "lucide-react"
import Link from "next/link"
import { headers } from "next/headers"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { formatDate } from "@/lib/format"

export const metadata: Metadata = {
  title: "Payment successful",
  description:
    "ThikHobe verified Stripe checkout confirmation with payment details and next steps.",
}

interface PaymentSuccessPageProps {
  searchParams: Promise<{ session_id?: string | string[] }>
}

interface PaymentReceipt {
  status: "paid"
  bookingId: string
  serviceTitle: string
  amount: number
  currency: string
  transactionId: string
  paidAt: string
}

function ResultActions() {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <Link
        className={buttonVariants({ size: "default" })}
        href="/dashboard/customer/bookings"
      >
        Return to My Bookings
      </Link>
      <Link
        className={buttonVariants({ size: "default", variant: "outline" })}
        href="/dashboard/customer/payments"
      >
        Payment history
      </Link>
    </div>
  )
}

function PaymentError({
  title,
  description,
  icon: Icon = CircleAlert,
}: {
  title: string
  description: string
  icon?: typeof CircleAlert
}) {
  return (
    <div className="w-full max-w-2xl">
      <Card className="p-6 sm:p-8">
        <span className="grid size-12 place-items-center rounded-full bg-status-amber-soft text-status-amber">
          <Icon aria-hidden className="size-6" strokeWidth={1.8} />
        </span>
        <h1 className="type-h1 mt-5">{title}</h1>
        <p className="type-lead mt-3">{description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            className={buttonVariants({ size: "default" })}
            href="/dashboard/customer/bookings"
          >
            Return to My Bookings
          </Link>
          <Link
            className={buttonVariants({ size: "default", variant: "outline" })}
            href="/dashboard/customer/payments"
          >
            Payment history
          </Link>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted-ink">
          No payment is treated as successful on this page.
        </p>
      </Card>
    </div>
  )
}

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const params = await searchParams
  const rawSessionId = Array.isArray(params.session_id)
    ? params.session_id[0]
    : params.session_id
  const sessionId = rawSessionId?.trim()

  if (!sessionId) {
    return (
      <PaymentError
        description="This URL is missing a session_id, so there is no checkout session to verify. No payment has been confirmed."
        icon={Link2Off}
        title="Invalid checkout session"
      />
    )
  }

  const requestHeaders = await headers()
  const session = await auth.api
    .getSession({ headers: requestHeaders })
    .catch(() => null)

  if (!session) {
    return (
      <PaymentError
        description="Sign in to the account that paid for this repair, then open the payment link again."
        title="Sign in to verify this payment"
      />
    )
  }

  const apiUrl = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "")
  if (!apiUrl) {
    return (
      <PaymentError
        description="The payment verification service is not configured."
        title="Verification unavailable"
      />
    )
  }

  let token: string
  try {
    ({ token } = await auth.api.getToken({ headers: requestHeaders }))
  } catch {
    return (
      <PaymentError
        description="Your session could not be used to verify this payment. Sign in again and retry."
        title="Session expired"
      />
    )
  }

  let response: Response
  try {
    response = await fetch(
      `${apiUrl}/api/payments/verify?session_id=${encodeURIComponent(sessionId)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    )
  } catch {
    return (
      <PaymentError
        description="The payment service could not be reached. No successful payment has been shown."
        title="We couldn't verify this payment"
      />
    )
  }

  const payload = (await response.json().catch(() => null)) as
    | (PaymentReceipt & { message?: string })
    | null

  if (!response.ok || !payload || payload.status !== "paid") {
    const messages: Record<number, string> = {
      400: "Stripe has not confirmed this payment yet. If you just paid, wait a moment and refresh this page.",
      401: "Your session expired. Sign in again and reopen the payment link.",
      403: "This payment does not belong to your signed-in account.",
      404: "We couldn't find this checkout session or its booking.",
      503: "Payment verification is not configured yet.",
    }

    return (
      <PaymentError
        description={
          messages[response.status] ??
          "The payment could not be verified. No successful payment has been shown."
        }
        title="We couldn't verify this payment"
      />
    )
  }

  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: payload.currency.toUpperCase(),
  }).format(payload.amount)
  const paymentDate = formatDate(new Date(payload.paidAt))

  const rows = [
    { label: "Service", value: payload.serviceTitle },
    { label: "Customer", value: session.user.email },
    { label: "Amount paid", value: amount },
    { label: "Transaction ID", value: payload.transactionId },
    { label: "Payment date", value: paymentDate },
  ]

  return (
    <div className="w-full max-w-2xl">
      <Card className="p-6 sm:p-8">
        <span className="grid size-12 place-items-center rounded-full bg-status-green-soft text-status-green">
          <CheckCircle2 aria-hidden className="size-6" strokeWidth={1.8} />
        </span>
        <h1 className="type-h1 mt-5">Payment successful</h1>
        <p className="type-lead mt-3">
          Stripe verified this checkout. Your repair payment is confirmed and
          the receipt below belongs to that verified session.
        </p>
        <div className="mt-4">
          <Badge dot tone="green">
            Payment confirmed
          </Badge>
        </div>

        <dl className="mt-6 divide-y divide-line border-y border-line">
          {rows.map((row) => (
            <div
              className="flex items-start justify-between gap-4 py-3 text-sm"
              key={row.label}
            >
              <dt className="text-muted-ink">{row.label}</dt>
              <dd className="text-right font-medium text-ink tabular">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <ResultActions />
        <p className="mt-3 text-xs leading-5 text-muted-ink">
          This receipt is rendered only after server-side Stripe verification.
          The payment amount is read from the booking in MongoDB.
        </p>
      </Card>
    </div>
  )
}
