import { CalendarX } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/state"

export default function CustomerBookingNotFound() {
  return (
    <>
      <h1 className="sr-only">Booking not found</h1>
      <Card className="mx-auto max-w-xl">
        <EmptyState
          action={
            <Link
              className={buttonVariants({ size: "sm" })}
              href="/dashboard/customer/bookings"
            >
              Back to my bookings
            </Link>
          }
          description="This booking doesn't exist or isn't part of your account."
          icon={CalendarX}
          title="Booking not found"
        />
      </Card>
    </>
  )
}
