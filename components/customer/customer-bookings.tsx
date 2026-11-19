import { ArrowUpRight, CalendarX } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import {
  BookingAction,
  getBookingAction,
} from "@/components/customer/booking-actions"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/components/ui/status-badge"
import { EmptyState } from "@/components/ui/state"
import {
  formatBookingFinalAmount,
  formatDate,
  formatPrice,
} from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Booking } from "@/types"

function getBookingHref(booking: Booking) {
  return `/dashboard/customer/bookings/${booking.id}`
}

export function CustomerBookings({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) {
    return (
      <Card>
        <EmptyState
          action={
            <Link className={buttonVariants({ size: "sm" })} href="/services">
              Browse services
            </Link>
          }
          description="Your repair requests will appear here once you book a service."
          icon={CalendarX}
          title="No bookings yet"
        />
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="type-h3">All bookings</h2>
        <Badge tone="neutral">
          {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
        </Badge>
      </div>

      <Card className="hidden overflow-hidden xl:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              All sample bookings for the demo customer
            </caption>
            <thead>
              <tr>
                {[
                  "Service",
                  "Technician",
                  "Preferred date",
                  "Amount",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    className={cn(
                      "border-b border-line bg-sage/40 px-3 py-3 text-[0.6875rem] font-semibold tracking-[0.12em] text-muted-ink uppercase",
                      heading === "Actions" && "text-right"
                    )}
                    key={heading}
                    scope="col"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                const action = getBookingAction(booking)
                const hasFinal = booking.finalAmount != null

                return (
                  <tr
                    className="border-b border-line last:border-b-0 hover:bg-sage/15"
                    key={booking.id}
                  >
                    <td className="px-3 py-3.5 align-top">
                      <div className="flex items-start gap-3">
                        <span className="relative mt-0.5 size-11 shrink-0 overflow-hidden rounded-[0.625rem] bg-sage">
                          <Image
                            alt=""
                            className="object-cover"
                            fill
                            sizes="44px"
                            src={booking.service.image}
                          />
                        </span>
                        <div className="min-w-0">
                          <Link
                            className="font-medium text-ink transition-colors hover:text-fern focus-visible:underline"
                            href={getBookingHref(booking)}
                          >
                            {booking.service.title}
                          </Link>
                          <p className="mt-1 text-[11px] tracking-[0.06em] text-muted-ink uppercase tabular">
                            #{booking.id}
                          </p>
                          <Link
                            className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-fern transition-colors hover:text-spruce"
                            href={getBookingHref(booking)}
                          >
                            View timeline
                            <ArrowUpRight
                              aria-hidden
                              className="size-3.5"
                            />
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 align-top">
                      <p className="text-sm text-ink">{booking.technician.name}</p>
                    </td>
                    <td className="px-3 py-3.5 align-top">
                      <p className="whitespace-nowrap text-sm text-muted-ink">
                        {formatDate(booking.preferredDate)}
                      </p>
                    </td>
                    <td className="px-3 py-3.5 align-top">
                      <p
                        className={cn(
                          "text-sm tabular",
                          hasFinal
                            ? "font-semibold text-ink"
                            : "text-muted-ink"
                        )}
                      >
                        {formatBookingFinalAmount(booking)}
                      </p>
                      <p className="mt-1 text-[11px] text-muted-ink">
                        Base {formatPrice(booking.basePrice)}
                      </p>
                    </td>
                    <td className="px-3 py-3.5 align-top">
                      <div className="flex flex-col items-start gap-1.5">
                        <BookingStatusBadge status={booking.status} />
                        <PaymentStatusBadge status={booking.paymentStatus} />
                      </div>
                    </td>
                    <td className="px-3 py-3.5 align-top text-right">
                      {action ? (
                        <BookingAction booking={booking} />
                      ) : (
                        <span className="text-xs text-muted-ink">—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <ul className="grid gap-3 md:grid-cols-2 xl:hidden">
        {bookings.map((booking) => {
          const action = getBookingAction(booking)
          const hasFinal = booking.finalAmount != null
          const titleId = `booking-${booking.id}-title`

          return (
            <li key={booking.id}>
              <Card className="h-full p-4">
                <article aria-labelledby={titleId}>
                  <div className="flex items-start gap-3">
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-[0.625rem] bg-sage">
                      <Image
                        alt=""
                        className="object-cover"
                        fill
                        sizes="56px"
                        src={booking.service.image}
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3
                        className="text-sm leading-5 font-semibold text-ink"
                        id={titleId}
                      >
                        <Link
                          className="transition-colors hover:text-fern focus-visible:underline"
                          href={getBookingHref(booking)}
                        >
                          {booking.service.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-xs text-muted-ink tabular">
                        #{booking.id}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <BookingStatusBadge status={booking.status} />
                    <PaymentStatusBadge status={booking.paymentStatus} />
                  </div>

                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-3">
                    <div>
                      <dt className="text-[11px] font-medium tracking-[0.06em] text-muted-ink uppercase">
                        Technician
                      </dt>
                      <dd className="mt-1 text-sm text-ink">
                        {booking.technician.name}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-medium tracking-[0.06em] text-muted-ink uppercase">
                        Preferred date
                      </dt>
                      <dd className="mt-1 text-sm text-ink">
                        {formatDate(booking.preferredDate)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-medium tracking-[0.06em] text-muted-ink uppercase">
                        Base price
                      </dt>
                      <dd className="mt-1 text-sm text-muted-ink tabular">
                        {formatPrice(booking.basePrice)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-medium tracking-[0.06em] text-muted-ink uppercase">
                        Final amount
                      </dt>
                      <dd
                        className={cn(
                          "mt-1 text-sm tabular",
                          hasFinal
                            ? "font-semibold text-ink"
                            : "text-muted-ink"
                        )}
                      >
                        {formatBookingFinalAmount(booking)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
                    <Link
                      className="inline-flex items-center gap-1 text-xs font-semibold text-fern transition-colors hover:text-spruce"
                      href={getBookingHref(booking)}
                    >
                      View timeline
                      <ArrowUpRight aria-hidden className="size-3.5" />
                    </Link>
                    {action ? <BookingAction booking={booking} /> : null}
                  </div>
                </article>
              </Card>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
