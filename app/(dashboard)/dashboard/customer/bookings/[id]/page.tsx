import type { Metadata } from "next"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { ReactNode } from "react"

import {
  BookingAction,
  getBookingAction,
} from "@/components/customer/booking-actions"
import { BookingTimeline } from "@/components/customer/booking-timeline"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/components/ui/status-badge"
import { getCustomerBookingById } from "@/data/sample-customer-bookings"
import {
  formatBookingFinalAmount,
  formatDate,
  formatPrice,
} from "@/lib/format"
import { cn } from "@/lib/utils"

interface BookingDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: BookingDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const booking = getCustomerBookingById(id)

  return {
    title: booking?.service.title ?? "Booking not found",
    description: booking
      ? `Booking timeline, repair status, and payment summary for ${booking.service.title}.`
      : "This sample booking could not be found.",
  }
}

function SummaryRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-muted-ink">{label}</dt>
      <dd className="text-right font-medium text-ink">{children}</dd>
    </div>
  )
}

export default async function CustomerBookingDetailPage({
  params,
}: BookingDetailPageProps) {
  const { id } = await params
  const booking = getCustomerBookingById(id)

  if (!booking) {
    notFound()
  }

  const action = getBookingAction(booking)
  const closed =
    booking.status === "rejected" || booking.status === "cancelled"
  const noActionMessage =
    booking.paymentStatus === "paid"
      ? "Paid in full. This booking is closed."
      : closed
        ? "This booking is closed."
        : "No action is needed from you right now."

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <Link
          className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-muted-ink transition-colors hover:text-fern focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"
          href="/dashboard/customer/bookings"
        >
          <ChevronLeft aria-hidden className="size-4" />
          My bookings
        </Link>
        <div className="mt-4 max-w-3xl">
          <h1 className="type-h1">{booking.service.title}</h1>
          <p className="type-lead mt-3">
            Booking #{booking.id} · Preferred date{" "}
            {formatDate(booking.preferredDate)}
          </p>
          <p className="type-meta mt-2">
            Preview workspace · sample booking and status.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr] xl:items-start">
        <div className="order-first xl:order-none xl:col-start-2 xl:row-start-1 xl:self-stretch">
          <div className="xl:sticky xl:top-24">
            <Card className="p-5 sm:p-6">
              <h2 className="type-h3">Booking summary</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <BookingStatusBadge status={booking.status} />
                <PaymentStatusBadge status={booking.paymentStatus} />
              </div>

              <dl className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
                <SummaryRow label="Technician">
                  {booking.technician.name}
                </SummaryRow>
                <SummaryRow label="Preferred date">
                  {formatDate(booking.preferredDate)}
                </SummaryRow>
                <SummaryRow label="Service mode">
                  {booking.service.mode}
                </SummaryRow>
                <SummaryRow label="Base price">
                  <span className="tabular">
                    {formatPrice(booking.basePrice)}
                  </span>
                </SummaryRow>
                <SummaryRow label="Final amount">
                  <span
                    className={cn(
                      "tabular",
                      booking.finalAmount == null && "text-muted-ink"
                    )}
                  >
                    {formatBookingFinalAmount(booking)}
                  </span>
                </SummaryRow>
              </dl>

              <div className="mt-5 border-t border-line pt-4">
                {action ? (
                  <BookingAction booking={booking} size="default" />
                ) : (
                  <p className="text-sm leading-6 text-muted-ink">
                    {noActionMessage}
                  </p>
                )}
              </div>
              <p className="mt-3 text-xs leading-5 text-muted-ink">
                Preview only — actions do not change bookings or payments.
              </p>
            </Card>
          </div>
        </div>

        <div className="space-y-6 xl:col-start-1 xl:row-start-1">
          <Card className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="relative h-48 w-full shrink-0 bg-sage sm:h-auto sm:min-h-56 sm:w-56">
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="(min-width: 640px) 224px, 100vw"
                  src={booking.service.image}
                />
              </div>
              <div className="min-w-0 flex-1 p-5 sm:p-6">
                <div className="flex flex-wrap gap-2">
                  <Badge tone="neutral">{booking.service.category}</Badge>
                  <Badge tone="fern">{booking.service.mode}</Badge>
                </div>
                <h2 className="type-h3 mt-4">Repair details</h2>
                <p className="mt-2 text-sm leading-6 text-muted-ink">
                  {booking.problemDescription}
                </p>
                <dl className="mt-5 grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-[11px] font-medium tracking-[0.06em] text-muted-ink uppercase">
                      Service address
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-ink">
                      {booking.address}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-medium tracking-[0.06em] text-muted-ink uppercase">
                      Booking reference
                    </dt>
                    <dd className="mt-1 text-sm text-ink tabular">
                      #{booking.id}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Card>

          <BookingTimeline booking={booking} />
        </div>
      </div>
    </div>
  )
}
