import {
  Ban,
  CalendarCheck,
  CircleCheck,
  ClipboardList,
  CreditCard,
  Wrench,
  XCircle,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"

import { Card } from "@/components/ui/card"
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/ui/status-badge"
import type {
  CustomerActivity,
  CustomerActivityStatus,
} from "@/data/sample-customer-bookings"

const activityIcons: Record<CustomerActivityStatus, LucideIcon> = {
  requested: ClipboardList,
  accepted: CalendarCheck,
  in_progress: Wrench,
  completed: CircleCheck,
  rejected: XCircle,
  cancelled: Ban,
  paid: CreditCard,
}

export function RecentActivityCard({
  activities,
}: {
  activities: CustomerActivity[]
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-2 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="type-h3">Recent activity</h2>
          <p className="mt-1 text-sm text-muted-ink">
            Sample milestones from your latest bookings.
          </p>
        </div>
        <p className="text-xs text-muted-ink">
          Timestamps omitted until live history is connected.
        </p>
      </div>

      <ol className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.status]

          return (
            <li className="bg-card" key={activity.id}>
              <Link
                className="flex h-full flex-col p-5 transition-colors hover:bg-sage/20 focus-visible:bg-sage/20 focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-inset focus-visible:outline-none"
                href={`/dashboard/customer/bookings/${activity.bookingId}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-9 place-items-center rounded-[0.625rem] bg-sage text-spruce">
                    <Icon aria-hidden className="size-4" strokeWidth={1.9} />
                  </span>
                  {activity.status === "paid" ? (
                    <PaymentStatusBadge status="paid" />
                  ) : (
                    <BookingStatusBadge status={activity.status} />
                  )}
                </div>
                <p className="mt-4 text-sm font-semibold text-ink">
                  {activity.title}
                </p>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-ink">
                  {activity.detail}
                </p>
                <p className="mt-auto pt-4 text-xs tracking-[0.06em] text-muted-ink uppercase tabular">
                  #{activity.bookingId}
                </p>
              </Link>
            </li>
          )
        })}
      </ol>
    </Card>
  )
}
