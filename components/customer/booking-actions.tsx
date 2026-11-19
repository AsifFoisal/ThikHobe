"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { PayNowDialog } from "@/components/customer/pay-now-dialog"
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog"
import { ApiError, bookingsApi } from "@/lib/api"
import { getBookingAction } from "@/lib/booking-actions"
import type { Booking } from "@/types"

// Cancel only while requested; Pay Now only after completion and before payment.
export function BookingAction({
  booking,
  size = "sm",
}: {
  booking: Booking
  size?: "sm" | "default"
}) {
  const router = useRouter()
  const action = getBookingAction(booking)

  const cancel = async () => {
    try {
      await bookingsApi.cancel(booking.id)
      toast.success("Booking cancelled")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "The booking could not be cancelled."
      )
    }
  }

  if (action === "cancel") {
    return (
      <ConfirmDialog
        cancelLabel="Keep booking"
        confirmLabel="Cancel request"
        description="This will cancel the repair request. You can submit a new request later if needed."
        onConfirm={cancel}
        title="Cancel this repair request?"
        triggerLabel="Cancel"
      />
    )
  }

  if (action === "pay") {
    return (
      <PayNowDialog
        amount={booking.finalAmount ?? booking.basePrice}
        bookingId={booking.id}
        size={size}
      />
    )
  }

  return null
}
