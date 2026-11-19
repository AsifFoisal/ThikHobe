import type { Booking } from "@/types"

export type BookingActionKind = "cancel" | "pay" | null

export function getBookingAction(booking: Booking): BookingActionKind {
  if (booking.status === "requested") return "cancel"
  if (booking.status === "completed" && booking.paymentStatus === "unpaid") {
    return "pay"
  }
  return null
}
