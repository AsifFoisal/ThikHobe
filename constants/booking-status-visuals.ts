import type { BookingStatus } from "@/types"

export const BOOKING_STATUS_ORDER: BookingStatus[] = [
  "requested",
  "accepted",
  "in_progress",
  "completed",
  "rejected",
  "cancelled",
]

export const BOOKING_STATUS_COLORS: Record<BookingStatus, string> = {
  requested: "var(--status-blue)",
  accepted: "var(--status-indigo)",
  in_progress: "var(--status-amber)",
  completed: "var(--status-green)",
  rejected: "var(--status-red)",
  cancelled: "var(--status-gray)",
}
