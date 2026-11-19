import type { Metadata } from "next"
import { CheckCircle2, CircleAlert, Link2Off } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { stripe } from "@/lib/stripe"
import { formatDate } from "@/lib/format"

export const metadata: Metadata = {
  title: "Payment successful",
  description:
    "FixMate verified Stripe checkout confirmation with payment details and next steps.",
}

interface PaymentSuccessPageProps {
  searchParams: Promise<{ session_id?: string | string[] }>
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

  let session: Awaited<
    ReturnType<typeof stripe.checkout.sessions.retrieve>
  >

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "payment_intent"],
    })
  } catch {
    return (
      <PaymentError
        description="Stripe could not verify this checkout session. No successful payment has been shown. Return to My Bookings and try again if needed."
        title="We couldn't verify this payment"
      />
    )
  }

  if (session.status === "open") {
    redirect("/")
  }

  if (session.status !== "complete") {
    return (
      <PaymentError
        description="This checkout did not complete, so no successful payment is shown. Your booking's payment status remains unchanged."
        title="Payment not completed"
      />
    )
  }

  const customerEmail = session.customer_details?.email ?? "your email"
  const serviceTitle =
    session.line_items?.data[0]?.description ?? "FixMate repair payment"
  const amount =
    session.amount_total != null && session.currency
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: session.currency.toUpperCase(),
        }).format(session.amount_total / 100)
      : "Confirmed"
  const transactionId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent?.id ?? session.id)
  const paymentDate = formatDate(new Date(session.created * 1000))

  const rows = [
    { label: "Service", value: serviceTitle },
    { label: "Customer", value: customerEmail },
    { label: "Amount paid", value: amount },
    { label: "Transaction ID", value: transactionId },
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
          The client never calculates or trusts the amount.
        </p>
      </Card>
    </div>
  )
}
