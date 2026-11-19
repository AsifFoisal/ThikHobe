import { ConfirmDialog } from "@/components/dashboard/confirm-dialog"
import { PayNowDialog } from "@/components/customer/pay-now-dialog"
import type { Booking } from "@/types"

export type BookingActionKind = "cancel" | "pay" | null

export function getBookingAction(booking: Booking): BookingActionKind {
  if (booking.status === "requested") return "cancel"
  if (
    booking.status === "completed" &&
    booking.paymentStatus === "unpaid"
  ) {
    return "pay"
  }
  return null
}

export function BookingAction({
  booking,
  size = "sm",
}: {
  booking: Booking
  size?: "sm" | "default"
}) {
  const action = getBookingAction(booking)

  if (action === "cancel") {
    return (
      <ConfirmDialog
        cancelLabel="Keep booking"
        confirmLabel="Cancel request"
        description="This is a visual prototype: the booking will not change and no technician will be notified."
        title="Cancel this repair request?"
        triggerLabel="Cancel"
      />
    )
  }

  if (action === "pay") {
    return (
      <PayNowDialog
        amount={booking.finalAmount ?? booking.basePrice}
        size={size}
      />
    )
  }

  return null
}
