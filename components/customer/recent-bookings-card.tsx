import { ArrowRight, CalendarX } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { BookingStatusBadge } from "@/components/ui/status-badge"
import { Card } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/state"
import { buttonVariants } from "@/components/ui/button"
import { formatDate, formatPrice } from "@/lib/format"
import type { Booking } from "@/types"

export function RecentBookingsCard({ bookings }: { bookings: Booking[] }) {
  return (
    <Card className="h-full overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-line p-5">
        <div>
          <h2 className="type-h3">Recent bookings</h2>
          <p className="mt-1 text-sm text-muted-ink">
            Your latest requests and active jobs.
          </p>
        </div>
        <Link
          className="inline-flex shrink-0 items-center gap-1 rounded-md text-sm font-semibold text-fern transition-colors hover:text-spruce focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none"
          href="/dashboard/customer/bookings"
        >
          View all
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>

      {bookings.length === 0 ? (
        <EmptyState
          action={
            <Link className={buttonVariants({ size: "sm" })} href="/services">
              Browse services
            </Link>
          }
          className="py-10"
          description="New requests will appear here after you book a repair."
          icon={CalendarX}
          title="No bookings yet"
        />
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <Link
                className="group flex items-center gap-3 border-b border-line px-4 py-3.5 transition-colors last:border-b-0 hover:bg-sage/20 focus-visible:bg-sage/20 focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-inset focus-visible:outline-none sm:px-5"
                href={`/dashboard/customer/bookings/${booking.id}`}
              >
                <span className="relative size-11 shrink-0 overflow-hidden rounded-[0.625rem] bg-sage">
                  <Image
                    alt=""
                    className="object-cover"
                    fill
                    sizes="44px"
                    src={booking.service.image}
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink transition-colors group-hover:text-spruce">
                    {booking.service.title}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted-ink">
                    {booking.technician.name} ·{" "}
                    {formatDate(booking.preferredDate)}
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1.5">
                  <BookingStatusBadge status={booking.status} />
                  <span className="text-xs font-medium text-ink tabular">
                    {booking.finalAmount != null
                      ? formatPrice(booking.finalAmount)
                      : `From ${formatPrice(booking.basePrice)}`}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
